"use strict";

const { readDocuments, updateDocument } = require( "../helpers/crud" );
const { Stripe } = require( "stripe" );
const stripe = new Stripe( "sk_test_mJtKUWOdqnLkz74A5J98hToT" );


class StripePayment {
	// eslint-disable-next-line class-methods-use-this
	async getUserData ( userId ) {
		const user = await readDocuments({
			collection: "users",
			_id: userId
		});
		if ( !user || user.length === 0 ) throw { internalCode: 40502 };
		return user;
	}
	// eslint-disable-next-line class-methods-use-this
	async getPlan ( planId ) {
		const plan = await readDocuments({
			collection: "plans",
			_id: planId
		});
		if ( !plan || plan.length === 0 ) throw { internalCode: 10500 };

		return plan;
	}
	async createCustomer ( userId ) {
		const user = await this.getUserData( userId );
		const customer = await stripe.customers.create({
			description: `${user.firstName} ${user.lastName}`,
			email: user.email
		});
		await updateDocument({
			collection: "users",
			_id: userId,
			documents: { stripe_customer: customer.id }
		});
		return customer;
	}
	async getCustomerById ( userId ) {
		const { stripe_customer } = await this.getUserData( userId );
		const customer = await stripe.customers.retrieve( stripe_customer );
		return customer;
	}
	async updateCustomerDetail ( userId, document ) {
		const { stripe_customer } = await this.getUserData( userId );
		return await stripe.customers.update( stripe_customer, document );
	}
	async addPaymentMethod ( userId, stripeToken ) {
		const { stripe_customer } = await this.getUserData( userId );
		const card = await stripe.customers.createSource( stripe_customer, { source: stripeToken });
		return card;
	}
	async getPaymentMethods ( userId, paymentId ) {
		const { stripe_customer } = await this.getUserData( userId );
		if ( paymentId ) return await stripe.customers.retrieveSource( stripe_customer, paymentId	);
		return await stripe.customers.listSources( stripe_customer );
	}
	// eslint-disable-next-line class-methods-use-this
	async removePaymentMethod ( paymentId ) {
		return await stripe.paymentMethods.detach( paymentId );
	}
	async subscribePayment ( userId, planId, cardId ) {
		const user = await this.getUserData( userId );
		const newProductPlan = await this.getPlan( planId );

		if ( user.currentPlan?.planId ) {
			const oldProductPlan = await this.getPlan( user.currentPlan.planId );
			if ( user.schedulePlan?.subId ) await stripe.subscriptionSchedules.cancel( user.schedulePlan.subId );
			if ( oldProductPlan.amount > newProductPlan.amount ) {
				const subscription = await stripe.subscriptionSchedules.create({
					customer: user.stripe_customer,
					start_date: user.currentPlan.subscriptionEndAt,
					phases: [{ items: [{ price: newProductPlan.plan }] }],
					default_settings: { default_payment: cardId }
				});
				await updateDocument({
					collection: "users",
					_id: userId,
					documents: {
						schedulePlan: {
							subscriptionStartAt: subscription.current_phase.start_date,
							subscriptionEndAt: subscription.current_phase.end_date,
							subId: subscription.id,
							planId
						}
					}
				});
			} else {
				if ( user.schedulePlan?.subId ) await stripe.subscriptionSchedules.cancel( user.schedulePlan.subId );
				await stripe.subscriptionSchedules.create({
					customer: user.stripe_customer,
					start_date: user.currentPlan.subscriptionEndAt,
					phases: [{ items: [{ price: newProductPlan.plan }] }],
					default_settings: { default_payment: cardId }
				});
				await this.makeCharge({
					userId,
					amount: newProductPlan.amount - oldProductPlan.amount,
					description: "This is charge for plan upgrade"
				});
				await updateDocument({
					collection: "users",
					_id: userId,
					documents: { currentPlan: { planId } }
				});
			}
		} else {
			const subscription = await stripe.subscriptions.create({
				customer: user.stripe_customer,
				items: [{ price: newProductPlan.plan }],
				default_payment: cardId
			});
			await updateDocument({
				collection: "users",
				_id: userId,
				documents: {
					currentPlan: {
						subscriptionStartAt: subscription.current_period_start,
						subscriptionEndAt: subscription.current_period_end,
						subId: subscription.id,
						planId
					}
				}
			});
		}
	}
	// eslint-disable-next-line class-methods-use-this
	async updateSubscription ( subId, document ) {
		await stripe.subscriptions.update( subId, document );
	}
	// eslint-disable-next-line class-methods-use-this
	async cancelSubscribe ( subId ) {
		await stripe.subscription.del( subId );
	}
	async getSubscriptions ( userId ) {
		const { stripe_customer } = await this.getUserData( userId );
		await stripe.subscriptions.list({ customer: stripe_customer });
	}
	async makeCharge ({ userId, amount, description }) {
		const { customer } = await this.getUserData( userId );
		const charge = await stripe.charges.create({
			amount,
			customer,
			description,
			currency: "usd"
		});
		return charge;
	}
	async makePayment ({ userId, amount, description, paymentMethod }) {
		const { customer } = await this.getUserData( userId );
		const charge = await stripe.charges.create({
			amount,
			customer,
			description,
			currency: "usd",
			paymentMethod
		});
		return charge;
	}
}

module.exports = { StripePayment };

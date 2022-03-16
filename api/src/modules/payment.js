"use strict";

const { readDocuments, updateDocument, createDocuments } = require( "../helpers/crud" );
const { Stripe } = require( "stripe" );
const stripe = new Stripe( "sk_test_mJtKUWOdqnLkz74A5J98hToT" );


class StripePayment {
	// eslint-disable-next-line class-methods-use-this
	async getUserLinkData ( businessId ) {
		let business;
		business = await readDocuments({
			collection: "business",
			_id: businessId
		});
		if ( !business || business.length === 0 ) {
			business = await readDocuments({
				collection: "specialist",
				_id: businessId
			});
			if ( !business || business.length === 0 ) throw { internalCode: 40502 };
			business.collection = "specialist";
		} else business.collection = "business";
		return business;
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
	async createCustomer ( businessId ) {
		const user = await this.getUserLinkData( businessId );
		const customer = await stripe.customers.create({
			name: user.company,
			email: user.email
		});
		await updateDocument({
			collection: user.collection,
			_id: businessId,
			documents: { stripe_customer: customer.id }
		});
		return customer;
	}
	async getCustomerById ( businessId ) {
		const { stripe_customer } = await this.getUserLinkData( businessId );
		const customer = await stripe.customers.retrieve( stripe_customer );
		return customer;
	}
	async updateCustomerDetail ( businessId, document ) {
		const { stripe_customer } = await this.getUserLinkData( businessId );
		return await stripe.customers.update( stripe_customer, document );
	}
	async addPaymentMethod ( businessId, stripeToken ) {
		const { stripe_customer } = await this.getUserLinkData( businessId );
		const card = await stripe.customers.createSource( stripe_customer, { source: stripeToken });
		return card;
	}
	async getPaymentMethods ( businessId, paymentId ) {
		const { stripe_customer } = await this.getUserLinkData( businessId );
		if ( paymentId ) return await stripe.customers.retrieveSource( stripe_customer, paymentId	);
		return await stripe.customers.listSources( stripe_customer );
	}
	// eslint-disable-next-line class-methods-use-this
	async removePaymentMethod ( paymentId ) {
		return await stripe.paymentMethods.detach( paymentId );
	}
	async subscribePayment ({ businessId, planId, cardId, promocode }) {
		const user = await this.getUserLinkData( businessId );
		const newProductPlan = await this.getPlan( planId );

		if ( user.currentPlan?.planId ) {
			const oldProductPlan = await this.getPlan( user.currentPlan.planId );
			if ( user.schedulePlan?.subId ) await stripe.subscriptionSchedules.cancel( user.schedulePlan.subId );
			if ( oldProductPlan.amount > newProductPlan.amount ) {
				let subscription;
				if ( cardId ) subscription = await stripe.subscriptionSchedules.create({
					customer: user.stripe_customer,
					start_date: user.currentPlan.subscriptionEndAt,
					phases: [{ items: [{ price: newProductPlan.plan }] }],
					default_settings: { default_payment_method: cardId }
				});
				else subscription = await stripe.subscriptionSchedules.create({
					customer: user.stripe_customer,
					start_date: user.currentPlan.subscriptionEndAt,
					phases: [{ items: [{ price: newProductPlan.plan }] }]
				});
				await updateDocument({
					collection: user.collection,
					_id: businessId,
					documents: {
						schedulePlan: {
							subscriptionStartAt: subscription.phases[0].start_date,
							subscriptionEndAt: subscription.phases[0].end_date,
							subId: subscription.id,
							planId
						}
					}
				});
			} else {
				if ( user.schedulePlan?.subId ) await stripe.subscriptionSchedules.cancel( user.schedulePlan.subId );
				if ( cardId ) await stripe.subscriptionSchedules.create({
					customer: user.stripe_customer,
					start_date: user.currentPlan.subscriptionEndAt,
					phases: [{ items: [{ price: newProductPlan.plan }] }],
					default_settings: { default_payment_method: cardId }
				});
				else await stripe.subscriptionSchedules.create({
					customer: user.stripe_customer,
					start_date: user.currentPlan.subscriptionEndAt,
					phases: [{ items: [{ price: newProductPlan.plan }] }]
				});
				await this.makeCharge({
					businessId,
					amount: ( newProductPlan.perPrice - oldProductPlan.perPrice ) * 100,
					description: "This is charge for plan upgrade"
				});
				await updateDocument({
					collection: user.collection,
					_id: businessId,
					documents: {
						currentPlan: {
							subscriptionStartAt: user.currentPlan.subscriptionStartAt,
							subscriptionEndAt: user.currentPlan.subscriptionEndAt,
							subId: user.currentPlan.subId,
							planId
						}
					}
				});
			}
		} else {
			let subscription;
			if ( cardId ) subscription = await stripe.subscriptions.create({
				customer: user.stripe_customer,
				items: [{ price: newProductPlan.plan }],
				coupon: promocode,
				default_payment_method: cardId
			});
			else subscription = await stripe.subscriptions.create({
				customer: user.stripe_customer,
				coupon: promocode,
				items: [{ price: newProductPlan.plan }]
			});
			await updateDocument({
				collection: user.collection,
				_id: businessId,
				documents: {
					currentPlan: {
						subscriptionStartAt: subscription.current_period_start,
						subscriptionEndAt: subscription.current_period_end,
						subId: subscription.id,
						coupon: promocode,
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
	async cancelSubscribe ( businessId, subId ) {
		const user = await this.getUserLinkData( businessId );
		await stripe.subscription.del( subId );
		await updateDocument({
			collection: user.collection,
			_id: businessId,
			documents: {
				schedulePlan: {
					subscriptionStartAt: "",
					subscriptionEndAt: "",
					subId: "",
					planId: ""
				}
			}
		});
	}
	async getSubscriptions ( businessId ) {
		const { stripe_customer } = await this.getUserLinkData( businessId );
		return await stripe.subscriptions.list({ customer: stripe_customer });
	}
	async createSeats ( businessId, planId, cardId, quantity ) {
		const { _id, seatQty, stripe_customer } = await this.getUserLinkData( businessId );
		const newProductPlan = await this.getPlan( planId );
		let seatSubscription;
		if ( cardId ) seatSubscription = await stripe.subscriptions.create({
			customer: stripe_customer,
			items: [{
				price: newProductPlan.plan,
				quantity
			}],
			default_payment_method: cardId
		});
		else seatSubscription = await stripe.subscriptions.create({
			customer: stripe_customer,
			items: [{
				price: newProductPlan.plan,
				quantity
			}]
		});
		await updateDocument({
			collection: "business",
			_id,
			documents: { seatQty: seatQty ? seatQty : 0 + parseInt( quantity, 10 ) }
		});
		const seats = [];
		for ( let i = 0; i < quantity; i++ ) seats[i] = {
			subId: seatSubscription.id,
			businessId: _id
		};
		await createDocuments({
			collection: "seats",
			documents: seats
		});
	}
	async getSeats ( businessId ) {
		const user = await this.getUserLinkData( businessId );
		let freeSeatCounts;
		if ( user.currentPlan?.planId ) {
			const currentPlan = await this.getPlan( user.currentPlan.planId );
			freeSeatCounts = currentPlan.seatCount;
		} else freeSeatCounts = 1;
		const users = await readDocuments({
			collection: "users",
			query: { businessId }
		});
		let count;
		count = 0;
		for ( let i = 0; i < users.length; i++ ) {
			if ( !users[i].seatId && users[i].isDisabled !== true ) count += 1;
			if ( count > freeSeatCounts ) users[i].isDisabled = true;
		}
		return users;
	}
	// eslint-disable-next-line class-methods-use-this
	async deleteSeat ( userId ) {
		const user = await readDocuments({
			collection: "user",
			_id: userId
		});
		// if ( !user || user.length === 0 ) throw { internalCode: 40502 };
		// const subscription = await stripe.subscriptions.retrieve( user.subId );
		// const quantity = subscription.items.data[0].quantity;
		// if ( quantity === 1 )	await stripe.subscriptions.del( user.subId );
		// else if ( quantity > 1 ) await stripe.subscriptionItems.update( subscription.items.data[0].id, { items: { quantity: quantity - 1 } });
		await updateDocument({
			collection: "users",
			_id: user._id,
			documents: { isDisabled: true }
		});
	}
	async makeCharge ({ businessId, amount, description }) {
		const { stripe_customer } = await this.getUserLinkData( businessId );
		const charge = await stripe.charges.create({
			amount,
			customer: stripe_customer,
			description,
			currency: "usd"
		});
		return charge;
	}
	// eslint-disable-next-line class-methods-use-this
	async makePayment ({ amount, description, accountId }) {
		// const { stripe_customer } = await this.getUserLinkData( businessId );
		const charge = await stripe.transfers.create({
			amount,
			description,
			currency: "usd",
			destination: accountId
		});
		return charge;
	}
	// eslint-disable-next-line class-methods-use-this
	async createAccount ( request ) {
		const account = await stripe.account.create( request );
		return account;
	}
	// eslint-disable-next-line class-methods-use-this
	async createBank ( request ) {
		const token = await stripe.tokens.create({
			bank_account: {
				country: "US",
				currency: "usd",
				account_holder_name: request.name,
				account_holder_type: request.type,
				routing_number: request.routingNumber,
				account_number: request.accountNumber
			}
		});
		return token;
	}
	// eslint-disable-next-line class-methods-use-this
	async promocodeInfo ( request ) {
		const coupon = await stripe.coupons.retrieve( request.promocode );
		return coupon;
	}
	async createInvoice ( businessId, request ) {
		const { stripe_customer } = await this.getUserLinkData( businessId );
		const invoice = await stripe.invoices.create({
			customer: stripe_customer,
			description: request.description
		});
		return invoice;
	}
}

module.exports = { StripePayment };

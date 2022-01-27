"use strict";

const { createDocuments, readDocuments, updateDocument } = require( "../helpers/crud" );
const { Stripe } = require( "stripe" );
const stripe = new Stripe( "sk_test_mJtKUWOdqnLkz74A5J98hToT" );

const getUserData = async userId => {
	const user = await readDocuments({
		collection: "users",
		_id: userId
	});

	if ( !user || user.length === 0 ) throw { internalCode: 40502 };

	return user;
};

exports.createCustomer = async ({ userId }) => {
	const user = await getUserData( userId );
	const customer = await stripe.customers.create({
		description: `${user.firstName} ${user.lastName}`,
		email: user.email
	});
	await updateDocument({
		collection: "users",
		_id: userId,
		documents: { stripe_customer: customer.id }
	});
};

exports.getCustomerById = async ({ userId }) => {
	const { stripe_customer } = await getUserData( userId );
	const customer = await stripe.customer.retrieve( stripe_customer );
	return customer;
};

exports.addPaymentMethod = async ({ stripeToken, userId }) => {
	const { stripe_customer } = await getUserData( userId );
	const card = await stripe.customers.createSource( stripe_customer, { source: stripeToken });

	return card;
};

exports.getPaymentDetails = async ({ paymentId, paymentType, userId }) => {
	const { stripe_customer } = await getUserData( userId );
	if ( paymentId ) return stripe.customers.retrieveSource( stripe_customer, paymentId	);
	else if ( paymentType ) return stripe.customers.listSource( stripe_customer, { object: paymentType });
	return stripe.customers.listSource( stripe_customer );
};

exports.subscribePayment = async ({ productPlan, userId }) => {
	const { stripe_customer } = await getUserData( userId );
	const subscription = await stripe.subscriptions.create({
		customer: stripe_customer,
		items: [{ price: productPlan }]
	});

	await updateDocument({
		collection: 'users',
		subscriptionStartAt: subscription.current_period_start,
		subscriptionEndAt: subscription.current_period_end,
	});

	return subscription;
};

exports.updateSubscription = async ({ productPlan, subId }) => await stripe.subscriptions.update( subId, { items: [{ price: productPlan }] });

exports.cancelSubscribe = async subId => await stripe.subscription.del( subId );

exports.getSubscriptions = async ({ subId, userId }) => {
	if ( userId ) {
		const { stripe_customer } = await getUserData( userId );
		await stripe.subscriptions.list({ customer: stripe_customer });
	} else if ( subId ) await stripe.subscriptions.retrieve( subId );
	else await stripe.subscriptions.list();
};

exports.makeCharge = async ({ userId, amount, description }) => {
	const { customer } = await getUserData( userId );
	const charge = await stripe.charges.create({
		amount,
		customer,
		description,
		currency: 'usd',
	});
	return charge;
}

exports.makePayment = async ({ userId, amount, description, paymentMethod }) => {
	const { customer } = await getUserData( userId );
	const charge = await stripe.charges.create({
		amount,
		customer,
		description,
		currency: 'usd',
		paymentMethod
	});
	return charge;
}
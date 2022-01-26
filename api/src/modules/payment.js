"use strict";

const { createDocuments, readDocuments } = require( "../helpers/crud" );
const { Stripe } = require( "stripe" );
const stripe = new Stripe( "sk_test_mJtKUWOdqnLkz74A5J98hToT" );

exports.createCustomer = async userData => {
	const { _id } = userData;
	const user = await readDocuments({
		collection: "users",
		_id
	});

	if ( !user || user.length === 0 ) throw { internalCode: 40502 };
	const customer = await stripe.customers.create({
		description: `${user.firstName} ${user.lastName}`,
		source: stripeToken
	});
};


exports.checkPayment = async paymentData => {
	const { stripeToken, userid } = paymentData;
	const user = await readDocuments({
		collection: "users",
		_id: userid
	});

	if ( !user || user.length === 0 ) throw { internalCode: 40502 };

	
	await createDocuments({
		collection: "stripes",
		user_id: userid,
		stripe_id: customer.id
	});
	return customer;
};

exports.subscribePayment = async paymentData => {
	const { stripe_id, productPlan } = paymentData;
	const stripeInfo = await readDocuments({
		collection: "stripes",
		query: { stripe_id }
	});

	if ( !stripeInfo || stripeInfo.length === 0 ) throw { internalCode: 40502 };

	const subscription = await stripe.subscriptions.create({
		customer: stripeInfo[0],
		items: [{ price: productPlan }]
	});

	

	return subscription;
};


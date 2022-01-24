"use strict";

const { createDocuments, readDocuments } = require( "../helpers/crud" );
const { Stripe } = require( "stripe" );
const stripe = new Stripe( "********" );


exports.subscribePayment = async paymentData => {
	const { stripeToken, userid, productPlan } = paymentData;

	const user = await readDocuments({
		collection: "users",
		_id: userid
	});

	if ( !user || user.length === 0 ) throw { internalCode: 40502 };

	const stripe_user = await readDocuments({
		collection: "stripes",
		query: { user_id: userid }
	});
	let stripeid;
	if ( !stripe_user || stripe_user.length === 0 ) {
		const customer = await stripe.customers.create({
			email: user.email,
			source: stripeToken
		});
		await createDocuments({
			collection: "stripes",
			user_id: userid,
			stripe_id: customer.id
		});

		stripeid = customer.id;
	} else stripeid = stripe_user[0].stripe_id;

	const subscription = await stripe.subscriptions.create({
		customer: stripeid,
		items: [{ plan: productPlan }]
	});

	return subscription;
};

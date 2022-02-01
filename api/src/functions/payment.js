"use strict";

const { response } = require( "../helpers/utils" );
const { readDocuments } = require( "../helpers/crud" );

const { StripePayment } = require( "../modules/payment" );

exports.method = async event => {
	try {
		const request = await JSON.parse( event.body );
		const { userId, paymentId } = event.pathParameters;
		const stripePayment = new StripePayment();
		let paymentData;
		const methods = {
			POST: () => stripePayment.addPaymentMethod(	userId, request.stripeToken ),
			GET: () => stripePayment.getPaymentMethods( userId, paymentId ),
			DELETE: () => stripePayment.removePaymentMethod( paymentId )
		};

		paymentData = await methods[event.httpMethod]();
		if ( !paymentData ) paymentData = "Success";

		return response({
			httpCode: 200,
			data: paymentData
		});
	} catch ( error ) {
		return response({
			httpCode: 400,
			message: error.message
		});
	}
};

exports.customer = async event => {
	try {
		const request = await JSON.parse( event.body );
		const { userIdCustomer } = event.pathParameters;
		const stripePayment = new StripePayment();
		let paymentData;
		const methods = {
			POST: () => stripePayment.updateCustomerDetail(	userIdCustomer, request ),
			GET: () => stripePayment.getCustomerById( userIdCustomer )
		};

		paymentData = await methods[event.httpMethod]();
		if ( !paymentData ) paymentData = "Success";

		return response({
			httpCode: 200,
			data: paymentData
		});
	} catch ( error ) {
		return response({
			httpCode: 400,
			message: error.message
		});
	}
};

exports.subscription = async event => {
	try {
		const request = await JSON.parse( event.body );
		const { userIdSub, subId } = event.pathParameters;
		const stripePayment = new StripePayment();
		let paymentData;
		const methods = {
			PUT: () => stripePayment.updateSubscription( subId, request ),
			POST: () => stripePayment.subscribePayment( userIdSub, request.planId, request.cardId ),
			GET: () => stripePayment.getSubscriptions( userIdSub ),
			DELETE: () => stripePayment.cancelSubscribe( subId )
		};

		paymentData = await methods[event.httpMethod]();
		if ( !paymentData ) paymentData = "Success";

		return response({
			httpCode: 200,
			data: paymentData
		});
	} catch ( error ) {
		return response({
			httpCode: 400,
			message: error.message
		});
	}
};

exports.pay = async event => {
	try {
		const { senderId, receiverId, projectId, description } = await JSON.parse( event.body );
		const project = readDocuments({
			collection: "projects",
			_id: projectId
		});
		const stripePayment = new StripePayment();
		await stripePayment.makeCharge({
			userId: senderId,
			amount: project.budget + 1.5,
			description
		});
		await stripePayment.makePayment({
			userId: receiverId,
			amount: project.budget,
			description
		});
		return response({
			httpCode: 200,
			message: "Success"
		});
	} catch ( error ) {
		return response({
			httpCode: 400,
			message: error.message
		});
	}
};

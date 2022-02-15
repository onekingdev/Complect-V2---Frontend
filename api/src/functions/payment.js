"use strict";

const { response } = require( "../helpers/utils" );
const { readDocuments } = require( "../helpers/crud" );

const { StripePayment } = require( "../modules/payment" );

exports.method = async event => {
	try {
		const request = await JSON.parse( event.body );
		const { linkAccountId, paymentId } = event.pathParameters;
		const stripePayment = new StripePayment();
		let paymentData;
		const methods = {
			POST: () => stripePayment.addPaymentMethod(	linkAccountId, request.stripeToken ),
			GET: () => stripePayment.getPaymentMethods( linkAccountId, paymentId ),
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
		const { businessIdCustomer } = event.pathParameters;
		const stripePayment = new StripePayment();
		let paymentData;
		const methods = {
			PUT: () => stripePayment.updateCustomerDetail( businessIdCustomer, request ),
			POST: () => stripePayment.createCustomer( businessIdCustomer ),
			GET: () => stripePayment.getCustomerById( businessIdCustomer )
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

exports.account = async event => {
	try {
		const request = await JSON.parse( event.body );
		const stripePayment = new StripePayment();
		let paymentData;
		const methods = { POST: () => stripePayment.createAccount( request ) };

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
exports.bank = async event => {
	try {
		const request = await JSON.parse( event.body );
		const stripePayment = new StripePayment();
		let paymentData;
		const methods = { POST: () => stripePayment.createBank( request ) };

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
		const { businessIdSub, subId } = event.pathParameters;
		const stripePayment = new StripePayment();
		let paymentData;
		const methods = {
			POST: () => stripePayment.subscribePayment( businessIdSub, request.planId, request.cardId ),
			GET: () => stripePayment.getSubscriptions( businessIdSub ),
			DELETE: () => stripePayment.cancelSubscribe( businessIdSub, subId )
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

exports.seat = async event => {
	try {
		const request = await JSON.parse( event.body );
		const { businessIdSub, subId } = event.pathParameters;
		const stripePayment = new StripePayment();
		let paymentData;
		const methods = {
			POST: () => stripePayment.createSeats( businessIdSub, request.planId, request.cardId, request.quantity ),
			GET: () => stripePayment.getSeats( businessIdSub ),
			DELETE: () => stripePayment.deleteSeat( subId )
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
			businessId: senderId,
			amount: project.budget + 1.5,
			description
		});
		await stripePayment.makePayment({
			businessId: receiverId,
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

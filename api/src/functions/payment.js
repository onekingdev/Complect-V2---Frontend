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
		const { linkAccountIdCustomer } = event.pathParameters;
		const stripePayment = new StripePayment();
		let paymentData;
		const methods = {
			PUT: () => stripePayment.updateCustomerDetail( linkAccountIdCustomer, request ),
			POST: () => stripePayment.createCustomer( linkAccountIdCustomer ),
			GET: () => stripePayment.getCustomerById( linkAccountIdCustomer )
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
		const { linkAccountIdSub, subId } = event.pathParameters;
		const stripePayment = new StripePayment();
		let paymentData;
		const methods = {
			POST: () => stripePayment.subscribePayment( linkAccountIdSub, request.planId, request.cardId ),
			GET: () => stripePayment.getSubscriptions( linkAccountIdSub ),
			DELETE: () => stripePayment.cancelSubscribe( linkAccountIdSub, subId )
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
		const { linkAccountIdSeat, seatSubId } = event.pathParameters;
		const stripePayment = new StripePayment();
		let paymentData;
		const methods = {
			POST: () => stripePayment.createSeats( linkAccountIdSeat, request.planId, request.cardId, request.quantity ),
			GET: () => stripePayment.getSeats( linkAccountIdSeat ),
			DELETE: () => stripePayment.deleteSeat( seatSubId )
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

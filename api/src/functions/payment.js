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
exports.promocode = async event => {
	try {
		const request = await JSON.parse( event.body );
		const stripePayment = new StripePayment();
		let paymentData;
		const methods = { POST: () => stripePayment.promocodeInfo( request ) };

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

exports.invoice = async event => {
	try {
		const { linkAccountIdInvoice } = event.pathParameters;
		const request = await JSON.parse( event.body );
		const stripePayment = new StripePayment();
		let paymentData;
		const methods = { POST: () => stripePayment.createInvoice( linkAccountIdInvoice, request ) };

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
			POST: () => stripePayment.subscribePayment({
				businessId: linkAccountIdSub,
				planId: request.planId,
				cardId: request.cardId,
				promocode: request.promocode
			}),
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

// eslint-disable-next-line max-statements
exports.pay = async event => {
	try {
		const { senderId, receiverId, jobId, description, type, contract } = await JSON.parse( event.body );
		const project = readDocuments({
			collection: "jobs",
			_id: jobId
		});
		let paymentBudget;
		if ( project.payment.type === "fixed" ) paymentBudget = project.payment.budget;
		else if ( project.payment.type === "hourly" ) paymentBudget = project.payment.rate * contract.hours;
		if ( project.payment_schedule === "upfront" ) {
			if ( type === "start" ) {
				const stripePayment = new StripePayment();
				await stripePayment.makeCharge({
					businessId: senderId,
					amount: paymentBudget + 1.5,
					description
				});
				await stripePayment.makePayment({
					businessId: receiverId,
					amount: paymentBudget,
					description
				});
				return response({
					httpCode: 200,
					message: "Success"
				});
			}
			return response({
				httpCode: 400,
				message: "Failed"
			});
		} else if ( project.payment_schedule === "fifty_fifty" ) {
			const stripePayment = new StripePayment();
			await stripePayment.makeCharge({
				businessId: senderId,
				amount: paymentBudget / 2 + 1.5,
				description
			});
			await stripePayment.makePayment({
				businessId: receiverId,
				amount: paymentBudget / 2,
				description
			});
			return response({
				httpCode: 200,
				message: "Success"
			});
		} else if ( project.payment_schedule === "upon_complete" ) {
			if ( type === "complete" ) {
				const stripePayment = new StripePayment();
				await stripePayment.makeCharge({
					businessId: senderId,
					amount: paymentBudget + 1.5,
					description
				});
				await stripePayment.makePayment({
					businessId: receiverId,
					amount: paymentBudget,
					description
				});
				return response({
					httpCode: 200,
					message: "Success"
				});
			}
			return response({
				httpCode: 400,
				message: "Failed"
			});
		}
	} catch ( error ) {
		return response({
			httpCode: 400,
			message: error.message
		});
	}
};

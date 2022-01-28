"use strict";

const { response } = require( "../helpers/utils" );
const { readDocuments } = require( "../helpers/crud" );

const {
	subscribePayment, updateSubscription, cancelSubscribe,
	getSubscriptions, createCustomer, getCustomerById,
	makeCharge, makePayment, addPaymentMethod
} = require( "../modules/payment" );

exports.customer = async event => {
	try {
		const request = await JSON.parse( event.body ); // parse request data
		const methods = {
			POST: () => createCustomer( request ),
			GET: () => getCustomerById( request )
		};
		let customerData;
		customerData = await methods[event.httpMethod]();
		if ( !customerData ) customerData = "Success";
		return response({
			httpCode: 200,
			data: customerData
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
		const request = await JSON.parse( event.body ); // parse request data
		const methods = {
			POST: () => {
				if ( request.stripeToken ) addPaymentMethod( request );
				subscribePayment( request );
			},
			GET: () => getSubscriptions( request ),
			PUT: () => updateSubscription( request ),
			DELETE: () => cancelSubscribe( request )
		};

		let paymentData;
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

exports.payProject = async event => {
	try {
		const { senderId, receiverId, projectId, description } = await JSON.parse( event.body );
		const project = readDocuments({
			collection: "projects",
			_id: projectId
		});
		await makeCharge({
			userId: senderId,
			amount: project.budget + 1.5,
			description
		});
		await makePayment({
			userId: receiverId,
			amount: project.budget,
			description
		});
		return response({
			httpCode: 400,
			message: "Success"
		});
	} catch ( error ) {
		return response({
			httpCode: 400,
			message: error.message
		});
	}
};

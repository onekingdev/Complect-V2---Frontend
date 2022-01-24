"use strict";

const { response } = require( "../helpers/utils" );

const { subscribePayment } = require( "../modules/payment" );


exports.createSubscription = async event => {
	try {
		const request = await JSON.parse( event.body ); // parse request data
		const paymentData = await subscribePayment( request );

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

"use strict";

const { response } = require( "../helpers/utils" );
const { sendEmail } = require( "../modules/sendEmail" );


exports.email = async event => {
	try {
		const request = await JSON.parse( event.body ); // parse request data
		const { key, template, email, subject, data } = request;
		if ( key !== "complect-debug" ) throw new Error( "Access denied" );
		await sendEmail({
			template,
			email,
			subject,
			data
		});
		return response({
			httpCode: 200,
			data: request
		});
	} catch ( error ) {
		return response({
			httpCode: 400,
			message: error.message
		});
	}
};

"use strict";

// request guard
const requestGuard = async event => {
	try {
		const { collectionName, documentId } = event.pathParameters;
		const newDocuments = await JSON.parse( event.body );
		return [collectionName, documentId, newDocuments].filter( Boolean );
	} catch ( error ) {
		console.error( `requestGuard ${error}` );
		return false;
	}
};

// server response format
const response = ( code = 200, message = "", data = "" ) => {
	const body = {
		ok: code === 200,
		message,
		data
	};
	return {
		statusCode: code,
		headers: {
			"Content-Type": "application/json",
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Credentials": true
		},
		body: JSON.stringify( body )
	};
};


module.exports = {
	requestGuard,
	response
};

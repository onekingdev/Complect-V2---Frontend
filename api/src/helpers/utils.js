"use strict";

const bcrypt = require( "bcrypt" );


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
const response = ({ httpCode, internalCode, message, data }) => {
	const body = {
		ok: httpCode < 400,
		internalCode,
		message,
		data
	};
	return {
		statusCode: httpCode,
		headers: {
			"Content-Type": "application/json",
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Credentials": true
		},
		body: JSON.stringify( body )
	};
};

const randomNumber = ( minimum = 0, maximum = 100 ) => Math.round( Math.random() * ( maximum - minimum ) + minimum );

const checkFields = ( object, keys ) => {
	try {
		keys.forEach( key => {
			if ( key in object === false && !object[key].length ) ;
		});
		return true;
	} catch ( error ) {
		console.debug( false );
		return false;
	}
};


const devStageLog = data => {
	if ( process.env.STAGE === "dev" ) {
		console.debug( "------------------------" );
		console.debug( data );
		console.debug( "------------------------" );
	}
};


// functions
const generateHash = async plain => await bcrypt.hash( plain, 10 );
const compareHash = async ( plain, hashed ) => await bcrypt.compare( plain, hashed );


module.exports = {
	requestGuard,
	response,
	randomNumber,
	checkFields,
	devStageLog,
	generateHash,
	compareHash
};

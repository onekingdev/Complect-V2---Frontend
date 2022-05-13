"use strict";

const { readDocuments, updateDocument } = require( "../helpers/crud" );
const { response, checkFields } = require( "../helpers/utils" );
const codes = require( "../helpers/codes" );

const updateSharedEmail = async ( exam, email ) => {
	const emails = exam.sharedEmails ? exam.sharedEmails : [];

	emails.push( email );

	await updateDocument({
		collection: "exams",
		_id: exam._id,
		documents: { sharedEmails: emails }
	});
};

exports.addInviteEmail = async event => {
	try {
		const params = await JSON.parse( event.body ); // parse request data
		if ( !checkFields( params, ["id", "email"]) ) throw { internalCode: 10500 }; // check fields
		const exam = await readDocuments({
			collection: "exams",
			_id: params.id
		});
		if ( exam ) updateSharedEmail( exam, params.email );

		return response({
			httpCode: 200,
			data: exam
		});
	} catch ( error ) {
		return response({
			httpCode: 406,
			internalCode: error.internalCode,
			message: error.message || codes[error.internalCode]
		});
	}
};


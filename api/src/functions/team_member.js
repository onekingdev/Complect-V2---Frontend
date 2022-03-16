"use strict";

const { createDocuments, readDocuments, updateDocument } = require( "../helpers/crud" );
const { response, checkFields } = require( "../helpers/utils" );
const codes = require( "../helpers/codes" );
// const { sendEmail } = require( "../modules/sendEmail" );

const collectionName = "team_members";

const emailInUse = async ( email, businessId ) => {
	const users = await readDocuments({
		collection: collectionName,
		query: {
			email,
			businessId
		}
	});

	return Boolean( users.length );
};

const generateToken = () => "V1StGXR8_Z5jdHi6B-myT";

const invitationTokenExpireAt = () => {
	const date = new Date();
	date.setDate( date.getDate() + 1 );
	return date;
};

// const emailToMember = () => {}
// const subSeat = () => {}
// const revokeSeat = () => {}

exports.create = async event => {
	try {
		const teamMember = await JSON.parse( event.body ); // parse request data
		if ( !checkFields( teamMember, ["firstName", "lastName", "email", "role", "businessId"]) ) throw { internalCode: 10500 }; // check fields
		if ( await emailInUse( teamMember.email, teamMember.businessId ) ) throw { internalCode: 40504 };

		teamMember.invitationToken = generateToken();
		teamMember.invitationTokenExpireAt = invitationTokenExpireAt();


		await createDocuments({
			collection: collectionName,
			documents: [teamMember]
		}); // create document with data

		// emailToMember()
		// subSeat()

		return response({
			httpCode: 200,
			internalCode: 40000,
			message: codes[40001]
		});
	} catch ( error ) {
		return response({
			httpCode: 406,
			internalCode: error.internalCode,
			message: error.message || codes[error.internalCode]
		});
	}
};

exports.toggleDisable = async event => {
	try {
		const teamMember = await JSON.parse( event.body ); // parse request data
		if ( !checkFields( teamMember, ["_id", "disabled"]) ) throw { internalCode: 10500 }; // check fields

		// validate seat

		teamMember.disabled = !teamMember.disabled;

		await updateDocument({
			collection: collectionName,
			_id: teamMember._id,
			documents: teamMember
		});

		// emailToMember()
		// revokeSeat()

		return response({
			httpCode: 200,
			internalCode: 40000,
			message: codes[40001]
		});
	} catch ( error ) {
		return response({
			httpCode: 406,
			internalCode: error.internalCode,
			message: error.message || codes[error.internalCode]
		});
	}
};


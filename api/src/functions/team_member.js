"use strict";

const { createDocuments, readDocuments, updateDocument } = require( "../helpers/crud" );
const { response, checkFields } = require( "../helpers/utils" );
const codes = require( "../helpers/codes" );
const { sendEmail } = require( "../modules/sendEmail" );

const collectionName = "team_members";

const emailInUse = async ( email, businessId, checkAccess ) => {
	let users;
	if ( checkAccess ) users = await readDocuments({
		collection: collectionName,
		query: {
			email,
			businessId,
			accessPerson: true
		}
	});
	else users = await readDocuments({
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

const inviteEmailToMember = async ( email, invitationToken, business, firstName, lastName ) => {
	await sendEmail({
		template: "inviteTeamMemeber",
		email,
		subject: "You are invited",
		data: {
			firstName,
			lastName,
			business,
			invitationToken
		}
	});
};

const disableRevokeEmailToMemeber = async ( email, disabled, business, firstName, lastName ) => {
	let subject;
	if ( disabled ) {
		subject = `${business} has disabled your account`;
		await sendEmail({
			template: "disableTeamMemeber",
			email,
			subject,
			data: {
				firstName,
				lastName,
				business,
				disabled
			}
		});
	} else {
		subject = `${business} has re-invited you to their team`;
		await sendEmail({
			template: "userUpdatePassword",
			email,
			subject,
			data: {
				firstName,
				lastName,
				business,
				disabled
			}
		});
	}
};

const getAvailableSeatQty = async business => {
	let seatQty;
	seatQty = 0;
	if ( business.currentPlan?.planId ) {
		const plan = await readDocuments({
			collection: "plans",
			_id: business.currentPlan?.planId
		});
		seatQty += parseInt( plan.seatCount, 10 );
	}
	if ( business.seatQty ) seatQty += parseInt( business.seatQty, 10 );
	return seatQty;
};

const getCurrentSeatQty = async businessId => {
	const teamMemebers = await readDocuments({
		collection: collectionName,
		query: { businessId }
	});
	return teamMemebers.length;
};


exports.create = async event => {
	try {
		const teamMember = await JSON.parse( event.body ); // parse request data
		if ( !checkFields( teamMember, ["firstName", "lastName", "email", "role", "businessId"]) ) throw { internalCode: 10500 }; // check fields
		if ( await emailInUse( teamMember.email, teamMember.businessId, true ) ) throw { internalCode: 40504 };

		teamMember.invitationToken = generateToken();
		teamMember.invitationTokenExpireAt = invitationTokenExpireAt();

		const business = await readDocuments({
			collection: "business",
			_id: teamMember.businessId
		});

		if ( !business ) throw { internalCode: 10500 }; // wrong Business ID

		const availableSeatQty = getAvailableSeatQty( business );
		const currentSeatQty = getCurrentSeatQty( business._id );

		if ( availableSeatQty <= currentSeatQty ) throw { internalCode: 10500 }; // no more available seats

		if ( !await emailInUse( teamMember.email, teamMember.businessId, false ) ) await createDocuments({
			collection: collectionName,
			documents: [teamMember]
		}); // create document with data


		inviteEmailToMember( teamMember.email, teamMember.invitationToken, business.companyName, teamMember.firstName, teamMember.lastName );

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

		const business = await readDocuments({
			collection: "business",
			_id: teamMember.businessId
		});

		if ( !business ) throw { internalCode: 10500 }; // wrong Business ID

		const availableSeatQty = getAvailableSeatQty( business );
		const currentSeatQty = getCurrentSeatQty( business._id );

		if ( availableSeatQty <= currentSeatQty && teamMember.disabled ) throw { internalCode: 10500 }; // no more available seats

		// validate seat

		teamMember.disabled = !teamMember.disabled;

		await updateDocument({
			collection: collectionName,
			_id: teamMember._id,
			documents: teamMember
		});

		const teamDocument = await readDocuments({
			collection: collectionName,
			_id: teamMember._id
		});
		if ( teamDocument.userId ) await updateDocument({
			collection: "users",
			_id: teamDocument.userId,
			documents: { disabled: teamDocument.disabled }
		});

		disableRevokeEmailToMemeber( teamDocument.email, teamDocument.disabled, business.companyName, teamDocument.firstName, teamDocument.lastName );
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


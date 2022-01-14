"use strict";

const { createDocuments, updateDocument } = require( "./crud" );
const { response, randomNumber, checkFields, devStageLog, generateHash, compareHash } = require( "../helpers/utils" );
const { getCollection, findInCollections } = require( "../helpers/mongo" );
const codes = require( "../helpers/codes" );

// temp Test Data
const token = "123456789";
const sendResetLink = email => console.debug( `Send reset link to: ${email}` );
// ----------------- //


// todo:
// - change email to sessionID
const generateOtp = async email => {
	const otp = randomNumber( 100000, 999999 );
	const otpCollection = await getCollection( "otp" );
	otpCollection.updateOne({ email }, { $set: { otp } }, { upsert: true }); // update/create document with generated otp number
	devStageLog( `OTP is: ${otp}` ); // print otp number to console at dev stage
};

const checkEmail = async email => {
	const profiles = await findInCollections(["business", "specialist", "employee"], { email });
	if ( profiles.length ) throw { internalCode: 40504 };
};

const checkPassword = async ( plain, hash ) => {
	const match = await compareHash( plain, hash );
	if ( !match ) throw { internalCode: 40503 };
	return true;
};


exports.signUp = async event => {
	try {
		const profile = await JSON.parse( event.body ); // parse request data
		if ( !checkFields( profile, ["type", "firstName", "lastName", "email", "password"]) ) throw { internalCode: 10500 }; // check fields
		await checkEmail( profile.email );
		profile.password = await generateHash( profile.password );
		// if(profile.invite) {
		// 	const invitesCollection = await getCollection( "invites" ); // get invites Collection from DB
		// 	const invite = await invitesCollection.findOne({ "invite": profile.invite }); // find invite
		// 	profile = {...profile, ...invite}
		// }
		// else profile.new = true // mark profile as new (didn't start onboarding process)

		if ( !profile.invite ) profile.new = true; // mark profile as new (didn't start onboarding process)

		await createDocuments( profile.type, [profile]); // create document with user data in "profile.type" collection (business || specialist)
		await generateOtp( profile.email );
		return response({
			httpCode: 200,
			internalCode: 40000,
			message: codes[40000]
		});
	} catch ( error ) {
		return response({
			httpCode: 406,
			internalCode: error.internalCode,
			message: error.message || codes[error.internalCode]
		});
	}
};


exports.signIn = async event => {
	try {
		const request = await JSON.parse( event.body ); // parse request data
		const documents = await findInCollections(["business", "specialist", "employee"], { email: request.email });
		if ( !documents.length ) throw { internalCode: 40502 }; // check if user exist
		const profile = documents[0];
		await checkPassword( request.password, profile.password ); // compare passwords
		await generateOtp( request.email );
		return response({ httpCode: 200 });
	} catch ( error ) {
		return response({
			httpCode: 406,
			internalCode: error.internalCode,
			message: error.message || codes[error.internalCode]
		});
	}
};


exports.newOtp = async event => {
	try {
		const request = await JSON.parse( event.body ); // parse request data
		if ( !checkFields( request, ["email"]) ) throw { internalCode: 10500 }; // check fields
		await generateOtp( request.email );
		return response({ httpCode: 200 });
	} catch ( error ) {
		return response({
			httpCode: 400,
			message: error.message
		});
	}
};

exports.checkOtp = async event => {
	try {
		const request = await JSON.parse( event.body ); // parse request data
		if ( !checkFields( request, ["email", "otp"]) ) throw { internalCode: 10500 }; // check fields
		const otpCollection = await getCollection( "otp" ); // get OTP Collection from DB
		const otp = await otpCollection.findOne({ email: request.email }); // search OTP Document by profile email
		if ( !otp ) throw { internalCode: 40500 }; // if no OTP in DB

		// dev mode
		if ( process.env.STAGE !== "dev" ) {
			if ( otp.otp !== parseInt( request.otp, 10 ) ) throw { internalCode: 40501 }; // compare OTP
		} else
		if ( parseInt( request.otp, 10 ) !== 111111 ) throw { internalCode: 40501 }; // compare OTP


		await otpCollection.deleteOne({ email: request.email }); // delete OTP from Databse after success check
		const documents = await findInCollections(["business", "specialist", "employee"], { email: request.email }, { projection: { password: 0 } }); // get user profile from DB
		if ( !documents.length ) throw { internalCode: 40502 }; // check if user exist
		const profile = documents[0];
		return response({
			httpCode: 200,
			data: {
				token,
				profile
			}
		}); // return Profile
	} catch ( error ) {
		return response({
			httpCode: 406,
			internalCode: error.internalCode,
			message: error.message || codes[error.internalCode]
		});
	}
};


exports.sendResetLink = async event => {
	try {
		const request = await JSON.parse( event.body ); // parse request data
		if ( !checkFields( request, ["email"]) ) throw { internalCode: 10500 }; // check fields
		const documents = await findInCollections(["business", "specialist", "employee"], { email: request.email });
		if ( !documents.length ) throw { internalCode: 40502 }; // check if user exist
		const profile = documents[0];
		sendResetLink( profile.email );
		return response({ httpCode: 200 });
	} catch ( error ) {
		return response({
			httpCode: 406,
			internalCode: error.internalCode,
			message: error.message || codes[error.internalCode]
		});
	}
};

exports.onboarding = async event => {
	try {
		const request = await JSON.parse( event.body ); // parse request data
		if ( !checkFields( request, ["type", "_id", "form"]) ) throw { internalCode: 10500 }; // check fields
		await updateDocument( request.type, request._id, request.form );
		await updateDocument( request.type, request._id, { new: false });
		return response({ httpCode: 200 });
	} catch ( error ) {
		return response({
			httpCode: 406,
			internalCode: error.internalCode,
			message: error.message || codes[error.internalCode]
		});
	}
};

exports.profile = async event => {
	try {
		const request = await JSON.parse( event.body ); // parse request data
		const documents = await findInCollections(["business", "specialist", "employee"], { _id: request._id }, { projection: { password: 0 } });
		if ( !documents.length ) throw { internalCode: 40502 }; // check if user exist
		return response({
			httpCode: 200,
			data: documents[0]
		});
	} catch ( error ) {
		return response({
			httpCode: 406,
			internalCode: error.internalCode,
			message: error.message || codes[error.internalCode]
		});
	}
};

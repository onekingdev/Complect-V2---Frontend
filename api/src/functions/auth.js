"use strict";

const { createDocuments, readDocuments, updateDocument, deleteDocuments } = require( "../helpers/crud" );
const { response, randomNumber, checkFields, devStageLog, generateHash, compareHash } = require( "../helpers/utils" );
const codes = require( "../helpers/codes" );

// temp Test Data
const token = "123456789";
const sendResetLink = email => console.debug( `Send reset link to: ${email}` );
// ----------------- //


// todo:
// - change email to sessionID
const generateOtp = async email => {
	const otp = randomNumber( 100000, 999999 );
	await updateDocument({
		collection: "otp",
		query: { email },
		documents: { otp },
		options: { upsert: true }
	});
	devStageLog( `OTP is: ${otp}` ); // print otp number to console at dev stage
};


const emailInUse = async email => {
	const users = await readDocuments({
		collection: "users",
		query: { email }
	});
	return Boolean( users.length );
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
		if ( await emailInUse( profile.email ) ) throw { internalCode: 40504 };
		profile.password = await generateHash( profile.password );
		// if(profile.invite) {
		// 	const invitesCollection = await getCollection( "invites" ); // get invites Collection from DB
		// 	const invite = await invitesCollection.findOne({ "invite": profile.invite }); // find invite
		// 	profile = {...profile, ...invite}
		// }
		// else profile.new = true // mark profile as new (didn't start onboarding process)

		if ( !profile.invite ) profile.new = true; // mark profile as new (didn't start onboarding process)

		await createDocuments({
			collection: "users",
			documents: [profile]
		}); // create document with user data
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
		const document = await readDocuments({
			collection: "users",
			query: { email: request.email }
		});
		if ( !document.length ) throw { internalCode: 40502 }; // check if user exist
		const profile = document[0];
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
		const document = await readDocuments({
			collection: "otp",
			query: { email: request.email }
		});
		if ( !document.length ) throw { internalCode: 40500 }; // if no OTP in DB

		// dev mode
		if ( process.env.STAGE !== "dev" ) {
			if ( document.otp !== parseInt( request.otp, 10 ) ) throw { internalCode: 40501 }; // compare OTP
		} else
		if ( parseInt( request.otp, 10 ) !== 111111 ) throw { internalCode: 40501 }; // compare OTP

		await deleteDocuments({
			collection: "otp",
			query: { email: request.email }
		}); // delete OTP from Databse after success check
		const profile = await readDocuments({
			collection: "users",
			query: { email: request.email },
			exclude: ["password"]
		}); // get user profile from DB

		if ( !profile[0]) throw { internalCode: 40502 }; // check if user exist
		return response({
			httpCode: 200,
			data: {
				token,
				profile: profile[0]
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
		const documents = await readDocuments({
			collection: "users",
			query: { email: request.email }
		}); // get user profile from DB
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
		await updateDocument({
			collection: "users",
			_id: request._id,
			documents: request.form
		});
		await updateDocument({
			collection: "users",
			_id: request._id,
			documents: { new: false }
		});
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
		const userProfile = await readDocuments({
			collection: "users",
			_id: request._id,
			exclude: ["password"]
		}); // get user profile from DB
		if ( !userProfile ) throw { internalCode: 40502 }; // check if user exist
		return response({
			httpCode: 200,
			data: userProfile
		});
	} catch ( error ) {
		return response({
			httpCode: 406,
			internalCode: error.internalCode,
			message: error.message || codes[error.internalCode]
		});
	}
};

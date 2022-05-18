"use strict";

const MongoClient = require( "mongodb" ).MongoClient;
const DB_URI = process.env.DB_URI;
const DB_NAME = process.env.DB_NAME;


const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true
};
let cachedPromise;

const connectToDatabase = async () => {
	if ( !cachedPromise ) cachedPromise = MongoClient.connect( DB_URI, options );
	const client = await cachedPromise;
	return client;
};

const indexKeys = { users: [{ email: 1 }, { unique: true }] };

const calcProjection = ({ include, exclude }) => {
	let projection;
	try {
		if ( !include && !exclude ) return;
		projection = {};
		if ( include && include.length ) include.forEach( key => projection[key] = 1 );
		if ( exclude && exclude.length ) exclude.forEach( key => projection[key] = 0 );
		return projection;
	} catch ( error ) {
		console.error( error );
	} finally {
		projection = null;
	}
};

const getCollection = async collectionName => {
	try {
		const client = await connectToDatabase();
		const collection = await client.db( DB_NAME ).collection( collectionName );
		return collection;
	} catch ( error ) {
		console.error( error );
	}
};


const disconnectFromDatabase = async () => {
	const client = await connectToDatabase();
	client.close( error => {
		if ( !error ) cachedPromise = null;
	});
};

module.exports = {
	connectToDatabase,
	getCollection,
	calcProjection,
	indexKeys,
	disconnectFromDatabase
};

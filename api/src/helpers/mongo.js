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

const getCollection = async collectionName => {
	const client = await connectToDatabase();
	const collection = await client.db( DB_NAME ).collection( collectionName );
	return collection;
};


// temp!!! Will be replaced soon with agregation pipeline
const findInCollections = async ( collections, query, options ) => {
	try {
		let results;
		results = [];
		for ( const collection of collections ) {
			const col = await getCollection( collection );
			const find = await col.find( query, options ).toArray();
			if ( find ) results = [...results, ...find];
		}
		return results;
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
	findInCollections,
	disconnectFromDatabase
};

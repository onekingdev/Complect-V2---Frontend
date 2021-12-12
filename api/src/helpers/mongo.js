"use strict";

const MongoClient = require( "mongodb" ).MongoClient;
const mongoUri = "mongodb://user:password@mongo:27017";
const databaseName = "complect";
const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true
};

let cachedPromise;

const connectToDatabase = async () => {
	if ( !cachedPromise ) cachedPromise = MongoClient.connect( mongoUri, options );
	const client = await cachedPromise;
	return client;
};

const getCollection = async collectionName => {
	const client = await connectToDatabase();
	const collection = await client.db( databaseName ).collection( collectionName );
	return collection;
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
	disconnectFromDatabase
};

"use strict";

const MongoClient = require("mongodb").MongoClient;
const { uri } = require("../../db.config.js");

const databaseName = "complect";
const mongoUri = uri.atlas;
const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true
};

let cachedPromise;

const connectToDatabase = async () => {
	if ( !cachedPromise ) {
		cachedPromise = MongoClient.connect( mongoUri, options );
		console.info( "Connected to Database" );
	}
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
		if ( !error ) {
			cachedPromise = null;
			console.info( "Disconected from Database" );
		}
	});
};

module.exports = { connectToDatabase, getCollection, disconnectFromDatabase };

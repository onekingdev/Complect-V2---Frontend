import { MongoClient } from "mongodb";
import { logger } from "./utils.js";
import { uri } from "../../db.config.js";

const mongoUri = uri.local;
const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true
};

let cachedPromise;

const connectToDatabase = async () => {
	if ( !cachedPromise ) {
		cachedPromise = MongoClient.connect( mongoUri, options );
		logger.info( "Connected to Database" );
	}
	const client = await cachedPromise;
	return client;
};

const getCollection = async ( databaseName, collectionName ) => {
	const client = await connectToDatabase();
	const collection = await client.db( databaseName ).collection( collectionName );
	return collection;
};

const disconnectFromDatabase = async () => {
	const client = await connectToDatabase();
	client.close( error => {
		if ( !error ) {
			cachedPromise = null;
			logger.info( "Disconected from Database" );
		}
	});
};

export { connectToDatabase, getCollection, disconnectFromDatabase };

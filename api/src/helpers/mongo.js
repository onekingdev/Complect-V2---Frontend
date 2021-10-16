import mongodb from "mongodb";
import { logger } from "../helpers/utils.js";

const { "MongoClient": mongoClient } = mongodb;
const mongoUri = "mongodb://user:password@mongo:27017";
const options = {
	"useNewUrlParser": true,
	"useUnifiedTopology": true
};
let cachedPromise;


const connectToDatabase = async () => {
	if ( !cachedPromise ) {
		cachedPromise = mongoClient.connect( mongoUri, options );
		logger.info( "Connected to Database" );
	}
	const client = await cachedPromise;
	return client;
};

const getCollection = async ( databaseName, collectionName ) => {
	const client = await connectToDatabase();
	return client.db( databaseName ).collection( collectionName );
};

const disconnectFromDatabase = async () => {
	const client = await connectToDatabase();
	client.close( ( error ) => {
		if ( !error ) {
			cachedPromise = null;
			logger.info( "Disconected from Database" );
		}
	});
};

export { connectToDatabase, getCollection, disconnectFromDatabase };

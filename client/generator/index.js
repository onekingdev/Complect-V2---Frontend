import { connectToDatabase, getCollection } from "../src/helpers/mongo.js";
import { response, logger } from "../src/helpers/utils.js";
import fullData from "./components/templates/fullData.js";


const generateDatabase = async ( event, context ) => {
	logger.log( "generateDatabase" );
	context.callbackWaitsForEmptyEventLoop = false;
	try {
		const generatedData = fullData();
		const projects = generatedData.projects;
		const collection = await getCollection( "generator", "projects" );
		const result = await collection.insertMany( projects );
		if ( !result.insertedCount ) throw Error( "Error during Document Creation" );
		return response( 200, "Database Created", projects );
	} catch ( error ) {
		logger.error( error );
		return response( 400, error );
	}
};

const dropDatabase = async () => {
	logger.log( "dropDatabase" );
	try {
		const client = await connectToDatabase();
		const connect = client.db( "generator" );
		connect.dropDatabase();
		return "Database Dropped";
	} catch ( error ) {
		return error;
	}
};

const updateDatabase = async () => {
	logger.log( "updateDatabase" );
	try {
		await dropDatabase();
		await generateDatabase();
		return "Database Updated";
	} catch ( error ) {
		return error;
	}
};


export { generateDatabase, updateDatabase, dropDatabase };

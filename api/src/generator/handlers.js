// import mongodb from "mongodb";
import { connectToDatabase, getCollection } from "../helpers/mongo.js";
import fullData from "./src/templates/fullData.js";
import { logger,  } from "../helpers/utils.js";
import { asyncForEach } from './src/atoms/utils.js'


const generateDatabase = async () => {
	logger.log( "generateDatabase" );
	try {
		let generatedData = await fullData()
		// asyncForEach(Object.entries(generatedData), async dataset => {
		// 	const [key, value] = dataset;
		// 	const collection = await getCollection( 'demo', key );
		// 	const result = await collection.insertMany( value );
		// 	if ( !result.insertedCount ) throw Error( "Error during Document Creation" ); // catch error
		//   })
		// return `Database Created`;
		return generatedData
	} catch ( error ) {
		return error;
	}
};

const dropDatabase = async () => {
	logger.log( "dropDatabase" );
	let result;
	try {
		const client = await connectToDatabase();
		const connect = client.db( 'demo' );
		connect.dropDatabase();
		return "Database Dropped";
	} catch ( error ) {
		return error;
	} finally {
		result = null;
	}
};

const updateDatabase = async () => {
	logger.log( "updateDatabase" );
	try {
		await dropDatabase();
		await generateDatabase();
		return `Database Updated`;
	} catch ( error ) {
		return error;
	}
};


export { generateDatabase, updateDatabase, dropDatabase };

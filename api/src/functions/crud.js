import { ObjectId as objectId } from "mongodb";
import { getCollection } from "../helpers/mongo.js";
import { response, logger } from "../helpers/utils.js";


const createDocuments = async ( databaseName, collectionName, newDocuments ) => {
	try {
		const collection = await getCollection( databaseName, collectionName );
		const result = await collection.insertMany( newDocuments );
		if ( !result.insertedCount ) throw Error( "Error during Document Creation" );
		return response( 200, `Created ${result.insertedCount} Document(s)`, result.insertedIds );
	} catch ( error ) {
		logger.error( error );
		return response( 400, error );
	}
};

const readDocuments = async ( databaseName, collectionName, documentId ) => {
	let result;
	try {
		const collection = await getCollection( databaseName, collectionName );
		if ( documentId ) result = await collection.findOne({ _id: objectId( documentId ) });
		else result = await collection.find({}).toArray();
		return response( 200, "Found Document(s)", result );
	} catch ( error ) {
		logger.error( error );
		return response( 400, error );
	} finally {
		result = null;
	}
};

const updateDocument = async ( databaseName, collectionName, documentId, newDocuments ) => {
	try {
		const collection = await getCollection( databaseName, collectionName );
		await collection.findOneAndUpdate({ _id: documentId }, { $set: newDocuments });
		return response( 200, "Document Updated" );
	} catch ( error ) {
		logger.error( error );
		return response( 400, error );
	}
};

const deleteDocuments = async ( databaseName, collectionName, documentId ) => {
	let result;
	try {
		const collection = await getCollection( databaseName, collectionName );
		if ( documentId ) result = await collection.deleteOne({ _id: documentId });
		else result = await collection.deleteMany({});
		if ( !result.deletedCount ) throw Error( "Error during Document Removing" ); // catch error
		return response( 200, `Deleted ${result.deletedCount} Document(s)` );
	} catch ( error ) {
		logger.error( error );
		return response( 400, error );
	} finally {
		result = null;
	}
};

export { createDocuments, readDocuments, updateDocument, deleteDocuments };

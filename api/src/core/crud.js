import mongodb from "mongodb";
import { getCollection } from "../helpers/mongo.js";
import { logger } from "../helpers/utils.js";

const { "ObjectId": objectId } = mongodb;


const createDocuments = async ( databaseName, collectionName, documentId, newDocuments ) => {
	logger.log( "createDocuments" );
	try {
		const collection = await getCollection( databaseName, collectionName );
		const result = await collection.insertMany( newDocuments );
		if ( !result.insertedCount ) throw Error( "Error during Document Creation" ); // catch error
		return `Created ${result.insertedCount} Document(s)`;
	} catch ( error ) {
		return error;
	}
};

const readDocuments = async ( databaseName, collectionName, documentId ) => {
	logger.log( "readDocuments" );
	let result;
	try {
		const collection = await getCollection( databaseName, collectionName );
		if ( documentId ) result = await collection.findOne({ "_id": objectId( documentId ) });
		else result = await collection.find({}).toArray();
		return result;
	} catch ( error ) {
		return error;
	} finally {
		result = null;
	}
};

const updateDocuments = async ( databaseName, collectionName, documentId, documentsUpdate ) => {
	logger.log( "updateDocuments" );
	try {
		const collection = await getCollection( databaseName, collectionName );
		await collection.findOneAndUpdate({ "_id": objectId( documentId ) }, { "$set": documentsUpdate });
		return "Document Updated";
	} catch ( error ) {
		return error;
	}
};

const deleteDocuments = async ( databaseName, collectionName, documentId ) => {
	logger.log( "deleteDocuments" );
	let result;
	try {
		const collection = await getCollection( databaseName, collectionName );
		if ( documentId ) result = await collection.deleteOne({ "_id": objectId( documentId ) });
		else result = await collection.deleteMany({});
		if ( !result.deletedCount ) throw Error( "Error during Document Removing" ); // catch error
		return `Deleted ${result.deletedCount} Document(s)`;
	} catch ( error ) {
		return error;
	} finally {
		result = null;
	}
};

export { createDocuments, readDocuments, updateDocuments, deleteDocuments };

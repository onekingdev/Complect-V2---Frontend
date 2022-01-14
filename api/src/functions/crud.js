"use strict";

const { getCollection } = require( "../helpers/mongo" );
const { response } = require( "../helpers/utils" );

const createDocuments = async ( collectionName, newDocuments ) => {
	try {
		const collection = await getCollection( collectionName );
		const result = await collection.insertMany( newDocuments );
		if ( !result.insertedCount ) throw Error( "Error during Document Creation" );
		return response({
			httpCode: 200,
			message: `Created ${result.insertedCount} Document(s)`,
			data: result.insertedIds
		});
	} catch ( error ) {
		console.error( error );
		return response({
			httpCode: 400,
			message: error.message
		});
	}
};

const readDocuments = async ( collectionName, documentId ) => {
	let result;
	try {
		const collection = await getCollection( collectionName );
		if ( documentId ) result = await collection.findOne({ _id: documentId });
		else result = await collection.find({}).toArray();
		return response({
			httpCode: 200,
			data: result
		});
	} catch ( error ) {
		console.error( error );
		return response({
			httpCode: 400,
			message: error.message
		});
	} finally {
		result = null;
	}
};

const updateDocument = async ( collectionName, documentId, newDocuments ) => {
	try {
		const collection = await getCollection( collectionName );
		await collection.findOneAndUpdate({ _id: documentId }, { $set: newDocuments });
		return response({
			httpCode: 200,
			message: "Document Updated"
		});
	} catch ( error ) {
		console.error( error );
		return response({
			httpCode: 400,
			message: error.message
		});
	}
};

const deleteDocuments = async ( collectionName, documentId ) => {
	let result;
	try {
		const collection = await getCollection( collectionName );
		if ( documentId ) result = await collection.deleteOne({ _id: documentId });
		else result = await collection.deleteMany({});
		if ( !result.deletedCount ) throw Error( "Error during Document Removing" );
		return response({
			httpCode: 200,
			message: `Deleted ${result.deletedCount} Document(s)`
		});
	} catch ( error ) {
		console.error( error );
		return response({
			httpCode: 400,
			message: error.message
		});
	} finally {
		result = null;
	}
};


module.exports = {
	createDocuments,
	readDocuments,
	updateDocument,
	deleteDocuments
};

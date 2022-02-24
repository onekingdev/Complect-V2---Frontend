"use strict";

const { ObjectID } = require( "mongodb" );
const { getCollection, calcProjection } = require( "../helpers/mongo" );


const createDocuments = async ({ collection, documents }) => {
	try {
		const useCollection = await getCollection( collection );
		documents.forEach( document => document._id = ObjectID( document._id ) );
		const result = await useCollection.insertMany( documents );
		if ( !result.insertedCount ) throw Error( "Error during Document Creation" );
	} catch ( error ) {
		console.error( error );
		throw error;
	}
};

const readDocuments = async ({ collection, _id, query, include, exclude }) => {
	try {
		let result;
		const useCollection = await getCollection( collection );
		const projection = calcProjection({
			include,
			exclude
		});
		if ( _id ) result = await useCollection.findOne({ _id: ObjectID( _id ) }, { projection });
		else if ( query ) result = await useCollection.find( query ).project( projection ).toArray();
		else result = await useCollection.find({}).project( projection ).toArray();
		return result;
	} catch ( error ) {
		console.error( error );
		throw error;
	}
};

const updateDocument = async ({ collection, _id, query, documents, options }) => {
	try {
		delete documents._id; // prevent _id update
		const useCollection = await getCollection( collection );
		if ( _id ) await useCollection.findOneAndUpdate({ _id: ObjectID( _id ) }, { $set: documents });
		else await useCollection.findOneAndUpdate( query, { $set: documents }, options );
		// if(!result.lastErrorObject.updatedExisting) throw new Error ("Document not found")
	} catch ( error ) {
		console.error( error );
		throw error;
	}
};

const deleteDocuments = async ({ collection, _id, query }) => {
	try {
		const useCollection = await getCollection( collection );
		if ( _id ) await useCollection.deleteOne({ _id: ObjectID( _id ) });
		else if ( query ) await useCollection.deleteMany( query );
		else await useCollection.deleteMany({});
	} catch ( error ) {
		console.error( error );
		throw error;
	}
};


module.exports = {
	createDocuments,
	readDocuments,
	updateDocument,
	deleteDocuments
};

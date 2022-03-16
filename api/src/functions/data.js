"use strict";

const { createDocuments, readDocuments, updateDocument, deleteDocuments } = require( "../helpers/crud" );
const { requestGuard, response } = require( "../helpers/utils" );


const postMethod = async requestParams => {
	try {
		await createDocuments( requestParams );
		return response({ httpCode: 200 });
	} catch ( error ) {
		return response({
			httpCode: 400,
			message: error.message
		});
	}
};

const getMethod = async requestParams => {
	try {
		const data = await readDocuments( requestParams );
		return response({
			httpCode: 200,
			data
		});
	} catch ( error ) {
		return response({
			httpCode: 400,
			message: error.message
		});
	}
};

const putMethod = async requestParams => {
	try {
		await updateDocument( requestParams );

		return response({ httpCode: 200 });
	} catch ( error ) {
		return response({
			httpCode: 400,
			message: error.message
		});
	}
};

const deleteMethod = async requestParams => {
	try {
		await deleteDocuments( requestParams );
		return response({ httpCode: 200 });
	} catch ( error ) {
		return response({
			httpCode: 400,
			message: error.message
		});
	}
};


exports.router = async event => {
	try {
		const requestParams = await requestGuard( event );
		const methods = {
			POST: () => postMethod( requestParams ),
			GET: () => getMethod( requestParams ),
			PUT: () => putMethod( requestParams ),
			DELETE: () => deleteMethod( requestParams )
		};
		return await methods[event.httpMethod]();
	} catch ( error ) {
		return response({
			httpCode: 400,
			message: error.message
		});
	}
};

exports.updatePosition = async event => {
	try {
		const data = await readDocuments({ collection: "policies" });
		const documents = await JSON.parse( event.body );
		data.sort( ( pol1, pol2 ) => pol1.order - pol2.order );
		let oldIndex, newIndex;
		for ( let i = 0; i < data.length; i++ ) {
			if ( data[i]._id === documents.oldId ) oldIndex = i;
			if ( data[i]._id === documents.newId ) oldIndex = i;
		}

		if ( oldIndex > newIndex ) {
			for ( let i = newIndex; i < oldIndex; i++ ) {
				const currentOrder = data[i + 1].order;
				updateDocument({
					collection: "policies",
					_id: data[i]._id,
					documents: { order: currentOrder }
				});
			}
			updateDocument({
				collection: "policies",
				_id: data[oldIndex]._id,
				documents: { order: data[newIndex].order }
			});
		} else {
			updateDocument({
				collection: "policies",
				_id: data[oldIndex]._id,
				documents: { order: data[newIndex].order }
			});
			for ( let i = oldIndex + 1; i <= newIndex; i++ ) {
				const currentOrder = data[i - 1].order;
				updateDocument({
					collection: "policies",
					_id: data[i]._id,
					documents: { order: currentOrder }
				});
			}
		}
	} catch ( error ) {
		return response({
			httpCode: 400,
			message: error.message
		});
	}
};

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

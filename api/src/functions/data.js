"use strict";

const { createDocuments, readDocuments, updateDocument, deleteDocuments } = require("./crud");
const { requestGuard, response } = require("../helpers/utils");


exports.router = async event => {
	try {
		const requestParams = await requestGuard( event );
		const methods = {
			POST: () => createDocuments( ...requestParams ),
			GET: () => readDocuments( ...requestParams ),
			PUT: () => updateDocument( ...requestParams ),
			DELETE: () => deleteDocuments( ...requestParams )
		};

		return await methods[event.httpMethod]();
	} catch ( error ) {
		console.error( error )
		return response( 400, error );
	}
};

"use strict";

const CRDImport = require( "../module/CRDImport" );
const { response } = require( "../helpers/utils" );

exports.crdScrapy = async () => {
	try {
		const crdImport = new CRDImport();
		await crdImport.initialize();
		await crdImport.call();
	} catch ( error ) {
		return response({
			httpCode: 400,
			message: error.message
		});
	}
};

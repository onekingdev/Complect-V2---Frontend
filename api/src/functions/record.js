"use strict";

const { uploadFile } = require( "../helpers/s3" );
const { response, randomName } = require( "../helpers/utils" );
const { readDocuments } = require( "../helpers/crud" );
const parser = require('lambda-multipart-parser');

exports.upload = async event => {
	try {
		const result = await parser.parse(event);
		console.log(result);
		const fileName = `records/${result.folderId}/${randomName( 8 )}.pdf`;
		const data = await uploadFile( result.files[0], fileName );
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

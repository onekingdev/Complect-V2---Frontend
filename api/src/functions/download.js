/* eslint-disable no-undef */
"use strict";

const PDFDoc = require( "../modules/PDFDoc" );
const { response, randomName } = require( "../helpers/utils" );
const { readDocuments } = require( "../helpers/crud" );
const { uploadFile } = require( "../helpers/aws" );
const parser = require( "lambda-multipart-parser" );

exports.pdfprint = async event => {
	try {
		const { collection, template, _id, version, business_id } = JSON.parse( event.body );
		const pdfDoc = new PDFDoc();
		const data = readDocuments({
			collection,
			_id
		});
		let printdata;
		if ( template === "policyReport" ) printdata = data.history.find( history => history.version === version );
		else if ( template === "manualReport" ) {
			const business = readDocuments({
				collection: "business",
				_id: business_id
			});
			printdata.policies = data;
			printdata.business = business;
		} else if ( template === "internalReport" ) printdata = data;

		await pdfDoc.createPDF( template, printdata );

		const fileName = `${randomName( 8 )}.pdf`;
		const res = await pdfDoc.uploadToS3( fileName );

		response({
			httpCode: 200,
			data: res
		});
	} catch ( error ) {
		return response({
			httpCode: 400,
			message: error.message
		});
	}
};

exports.upload = async event => {
	try {
		const result = await parser.parse( event );
		const collection = result.collection;
		const extension = result.files[0].contentType.split( "/" ).pop();
		const fileName = collection === "records" ? `records/${result.folderId}/${randomName( 8 )}.${extension}` : `${collection}/${randomName( 8 )}.${extension}`;
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

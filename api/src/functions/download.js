/* eslint-disable no-undef */
"use strict";

const PDFDoc = require( "../modules/PDFDoc" );
const { response, randomName } = require( "../helpers/utils" );
const { readDocuments } = require( "../helpers/crud" );

exports.pdfprint = async event => {
	try {
		const { collection, template, _id } = JSON.parse( event.body );


		const pdfDoc = new PDFDoc();
		const data = readDocuments({
			collection,
			_id
		});
		await pdfDoc.createPDF( template, data );

		const fileName = `${randomName( 8 )}.pdf`;
		const res = await pdfDoc.uploadToS3( fileName );

		response({
			httpCode: 200,
			message: res
		});
	} catch ( error ) {
		return response({
			httpCode: 400,
			message: error.message
		});
	}
};

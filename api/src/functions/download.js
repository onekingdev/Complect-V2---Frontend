/* eslint-disable no-undef */
"use strict";

const PDFDoc = require( "../modules/PDFDoc" );
const { response, randomName, formatDate } = require( "../helpers/utils" );
const { readDocuments } = require( "../helpers/crud" );
const { uploadFile } = require( "../helpers/aws" );
const parser = require( "lambda-multipart-parser" );
const fastcsv = require( "fast-csv" );
const filesystem = require( "fs" );
const util = require( "util" );
const readFile = util.promisify( filesystem.readFile );

exports.pdfprint = async event => {
	try {
		const { collection, template, _id, version, business_id } = JSON.parse( event.body );
		const pdfDoc = new PDFDoc();
		const data = await readDocuments({
			collection,
			_id
		});
		let printdata;
		if ( template === "policyReport" ) printdata = data.history.find( history => history.version === version );
		else if ( template === "manualReport" ) {
			const business = await readDocuments({
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

exports.csvdownload = async event => {
	try {
		const { collection, business_id, startDate, endDate } = JSON.parse( event.body );
		let data;
		if ( !startDate && !endDate ) data = await readDocuments({ collection });
		else data = await readDocuments({
			collection,
			query: {
				startsAt: {
					$lt: startDate,
					$gt: endDate
				}
			}
		});
		const business = await readDocuments({
			collection: "business",
			_id: business_id
		});
		const csvdata = [];
		for ( let i = 0; i < data.length; i++ ) {
			const creator = await readDocuments({
				collection,
				_id: data[i].creator
			});
			// const assigned = await readDocuments({
			// 	collection,
			// 	_id: data[i].assigned
			// });

			const csvline = {
				Name: `${business.companyName} - ${data[i].name}`,
				"Linked To": data[i].linkedTo ? data[i].linkedTo.join( "," ) : "",
				Creator: `${creator.firstName} ${creator.lastName}`,
				// assignee: `${assigned.firstName} ${assigned.lastName}`,
				Assignee: data[i].assigned,
				"Start Date": formatDate( data[i].startsAt ),
				"Due Date": formatDate( data[i].endsAt ),
				"Complete Date": formatDate( data[i].completeAt ),
				// eslint-disable-next-line no-extra-parens
				OverDue: ( data[i].endsAt < new Date() && data[i].completeAt ) ? "Yes" : "No",
				Description: data[i].description,
				Comments: "Test",
				Attachments: 0
			};
			csvdata.push( csvline );
		}

		const fileName = `${randomName( 8 )}.csv`;
		const writesystem = filesystem.createWriteStream( "./src/templates/csv/csvfile.csv" );
		fastcsv.write( csvdata, { headers: true }).pipe( writesystem );
		const content = await readFile( "./src/templates/csv/csvfile.csv", "utf8" );

		const res = await uploadFile({
			content,
			contentType: "text/csv"
		}, fileName );
		return response({
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

"use strict";

const axios = require( "axios" );
const cheerio = require( "cheerio" );
const { createDocuments, deleteDocuments } = require( "../functions/crud" );
const { devStageLog } = require( "../helpers/utils" );
const AdmZip = require( "adm-zip" );
const { parseString } = require( "fast-csv" );

class CRDImport {
	constructor () {
		this.url = "https://www.sec.gov/help/foiadocsinvafoiahtm.html";
	}
	async getZipLinks () {
		const link = "/files/investment/data/information-about-registered-investment-advisers-and-exempt-reporting-advisers/";
		const response = await axios( this.url );
		const html = response.data;
		const cheerioLoad = cheerio.load( html );
		const link_elements = cheerioLoad( `a[href^='${link}']` );
		const links = link_elements.map( ( ___, ele ) => `https://www.sec.gov${cheerioLoad( ele ).attr( "href" )}` ).toArray().slice( 0, 2 );
		return links;
	}
	async initialize () {
		try {
			await deleteDocuments( "potential_businesses" );
		} catch ( error ) {
			devStageLog( error );
		}
		this.zip_links = await this.getZipLinks();
	}
	// eslint-disable-next-line class-methods-use-this
	build_potential_business_attrs ( row ) {
		return {
			crd_number: row["Organization CRD#"],
			business_name: row["Legal Name"],
			website: row["Website Address"],
			contact_phone: row["Main Office Telephone Number"],
			address_1: row["Main Office Street Address 1"],
			apartment: row["Main Office Street Address 2"],
			city: row["Main Office City"],
			state: row["Main Office State"],
			zipcode: row["Main Office Postal Code"],
			client_account_cnt: row["5F(2)(f)"],
			aum: row["5F(2)(c)"]
		};
	}
	async download_and_parse ( zip_link ) {
		const response = await axios( zip_link, { responseType: "arraybuffer" });

		const zip = new AdmZip( response.data );
		const zipEntries = zip.getEntries();
		zipEntries.forEach( entry => {
			const rows = [];
			const csvData = zip.readAsText( entry );
			parseString( csvData, { headers: true })
				.on( "error", error => devStageLog( error ) )
				.on( "data", row => {
					rows.push( this.build_potential_business_attrs( row ) );
					// const new_row = [this.build_potential_business_attrs( row )];
					// createDocuments( "potential_businesses", new_row );
				})
				.on( "end", () => {
					createDocuments( "potential_businesses", rows );
				});
		});
	}
	async call () {
		const zip_links = this.zip_links;
		for ( let i = 0; i < zip_links.length; i++ ) await this.download_and_parse( zip_links[i]);
	}
}

module.exports = CRDImport;

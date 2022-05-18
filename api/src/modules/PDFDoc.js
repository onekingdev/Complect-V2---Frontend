"use strict";
const chromium = require( "chrome-aws-lambda" );
const AWS = require( "aws-sdk" );
const filesystem = require( "fs" );
// const puppeteer = require( "puppeteer" );
const handlebars = require( "handlebars" );
const util = require( "util" );
const readFile = util.promisify( filesystem.readFile );

handlebars.registerHelper( "inc", value => parseInt( value, 10 ) + 1 );

class PDFDoc {
	constructor () {
		this.pdf = null;
	}
	// eslint-disable-next-line class-methods-use-this
	async createPDF ( templatename, data ) {
		const content = await readFile( `./src/templates/pdf/${templatename}.html`, "utf8" );
		const template = handlebars.compile( content );
		const html = template( data );

		const browser = await chromium.puppeteer.launch({
			args: ["--disable-gpu",	"--disable-dev-shm-usage", "--disable-setuid-sandbox", "--no-sandbox"],
			defaultViewport: chromium.defaultViewport,
			executablePath: await chromium.executablePath,
			headless: chromium.headless,
			ignoreHTTPSErrors: true
		});

		const page = await browser.newPage();
		await page.setContent( html );

		await page.pdf({
			path: "./src/templates/pdf/print.pdf",
			format: "A4"
		});
	}
	// eslint-disable-next-line class-methods-use-this
	async uploadToS3 ( fileName ) {
		const awss3 = new AWS.S3();

		const filestream = filesystem.createReadStream( "./src/templates/pdf/print.pdf" );

		const params = {
			Bucket: process.env.AWS_S3_BUCKET_NAME,
			Key: fileName,
			Body: filestream,
			ContentType: "application/pdf"
		};
		await awss3.putObject( params ).promise();
		return `https://${process.env.AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${fileName}`;
	}
}

module.exports = PDFDoc;

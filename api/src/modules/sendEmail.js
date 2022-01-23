"use strict";

const aws = require( "aws-sdk" );
const ses = new aws.SES();
const handlebars = require( "handlebars" );
const filesystem = require( "fs" );
const util = require( "util" );
const readFile = util.promisify( filesystem.readFile );


exports.sendEmail = async emailData => {
	const { template, email, subject, data } = emailData;

	const content = await readFile( `./src/templates/email/${template}.html`, "utf8" );
	const basicHeader = await readFile( "./src/templates/email/_partials/basicHeader.html", "utf8" );
	const basicFooter = await readFile( "./src/templates/email/_partials/basicFooter.html", "utf8" );
	const emailTemplate = handlebars.compile( content );
	handlebars.registerPartial( "basicHeader", basicHeader );
	handlebars.registerPartial( "basicFooter", basicFooter );

	const html = emailTemplate( data );
	const params = {
		Source: "noreply@complect.dev",
		Destination: { ToAddresses: [email] },
		Message: {
			Body: {
				Html: {
					Charset: "UTF-8",
					Data: html
				}
			},
			Subject: {
				Charset: "UTF-8",
				Data: subject
			}
		}
	};

	await ses.sendEmail( params ).promise();
};


"use strict";

const AWS = require( "aws-sdk" );


const connectSES = ses_config => {
	const sesConnection = new AWS.SES( ses_config );
	return sesConnection;
};

const connectS3 = s3_config => {
	const awss3 = new AWS.S3( s3_config );
	return awss3;
};

module.exports = {
	connectSES,
	connectS3
};

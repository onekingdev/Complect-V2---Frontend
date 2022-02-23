
"use strict";

const AWS = require( "aws-sdk" );
const archiver = require( "archiver" );
const stream = require( "stream" );

const AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;
const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME;
const AWS_BUCKET_REGION = process.env.AWS_BUCKET_REGION;

const connectSES = ses_config => {
	const sesConnection = new AWS.SES( ses_config );
	return sesConnection;
};

const awsS3 = new AWS.S3({
	region: AWS_BUCKET_REGION,
	accessKeyId: AWS_ACCESS_KEY,
	secretAccessKey: AWS_SECRET_KEY
});

const uploadFile = ( file, fileName ) => {
	const uploadParams = {
		Bucket: AWS_BUCKET_NAME,
		Body: file.content,
		Key: fileName,
		ContentType: file.contentType
	};
	return awsS3.upload( uploadParams ).promise();
};

const getFileStream = async fileKey => {
	const downloadParams = {
		Key: fileKey,
		Bucket: AWS_BUCKET_NAME
	};

	return await awsS3.getObject( downloadParams ).promise();
};

const streamTo = ( _bucket, _key, callback ) => {
	const pass = new stream.PassThrough();
	awsS3.upload({
		Bucket: _bucket,
		Key: `records/zip/${_key}`,
		Body: pass
	})
		.promise()
		.then( data => callback( data.Location ) );
	return pass;
};

const awsZipDownload = async ( files, zipName ) => {
	// let list = await Promise.all(files.map(file => new Promise((resolve, _reject) => {
	// 		awsS3.getObject({Bucket:AWS_BUCKET_NAME, Key:file.key}).then(_data => resolve( { content: _data.Body, name: file.name } ));
	// 	}
	// ))).catch(_err => { throw new Error(_err) } );

	let list;
	list = [];

	for ( const i in files ) {
		let filestream, item;
		if ( files[i].key === "" ) item = {
			content: "",
			name: files[i].name
		};
		else {
			filestream = await getFileStream( files[i].key );
			item = { content: filestream.Body, name: files[i].name };
		}
		list.push( item );
	}

	return await new Promise( ( resolve, reject ) => {
		let myStream;
		myStream = streamTo( AWS_BUCKET_NAME, zipName, data => {
			resolve( data );
		});
		let archive;
		archive = archiver( "zip" );
		archive.on( "error", err => {
			throw new Error( err );
		});
		myStream.on( "error", reject );
		archive.pipe( myStream );
		list.forEach( itm => {
			archive.append( itm.content, { name: itm.name });
		});
		archive.finalize();
	})
		.catch( _err => {
			throw new Error( _err );
		});
};

module.exports = {
	connectSES,
	uploadFile,
	awsZipDownload,
	getFileStream
};

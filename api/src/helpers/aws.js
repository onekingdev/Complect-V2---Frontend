
"use strict";

const AWS = require( "aws-sdk" );
const _archiver = require('archiver');
const stream = require('stream');

const AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;
const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME;
const AWS_BUCKET_REGION = process.env.AWS_BUCKET_REGION;

const connectSES = ses_config => {
	const sesConnection = new AWS.SES( ses_config );
	return sesConnection;
};

const s3 = new AWS.S3({
	"region": AWS_BUCKET_REGION,
	"accessKeyId": AWS_ACCESS_KEY,
	"secretAccessKey": AWS_SECRET_KEY
});

const uploadFile = ( file, fileName ) => {
	const uploadParams = {
    Bucket: AWS_BUCKET_NAME,
    Body: file.content,
    Key: fileName,
		ContentType: file.contentType
  };
  return s3.upload( uploadParams ).promise();
};

const getFileStream = async ( fileKey ) => {
	const downloadParams = {
    Key: fileKey,
    Bucket: AWS_BUCKET_NAME,
  };

  return await s3.getObject(downloadParams).promise();
}

const streamTo = ( _bucket, _key, callback ) => {
	var _pass = new stream.PassThrough();
	s3.upload( { Bucket: _bucket, Key: `records/zip/${_key}`, Body: _pass }, ( _err, _data ) => {  } )
	.promise()
	.then( data => callback( data.Location ) );
	return _pass;
};

const awsZipDownload = async ( files, zipName ) => {
    // var _list = await Promise.all(files.map(file => new Promise((_resolve, _reject) => {
		// 		s3.getObject({Bucket:AWS_BUCKET_NAME, Key:file.key}).then(_data => _resolve( { content: _data.Body, name: file.name } ));
		// 	}
    // ))).catch(_err => { throw new Error(_err) } );

		var _list = [];

		for ( let i in files ) {
			let filestream, item;
			if ( files[i].key != "" ) {
				filestream = await getFileStream( files[i].key );
				item = { content: filestream.Body, name: files[i].name };
			} else {
				item = { content: '', name: files[i].name }
			}
			_list.push( item );
		}

    return await new Promise(( _resolve, _reject ) => {
        var _myStream = streamTo( AWS_BUCKET_NAME, zipName, data => {
					_resolve( data )
				});
        var _archive = _archiver( 'zip' );
        _archive.on( 'error', err => { throw new Error(err); });
        _myStream.on( 'error', _reject );
        _archive.pipe( _myStream );
        _list.forEach( _itm => {
					_archive.append( _itm.content, { name: _itm.name });
				});
        _archive.finalize();
    }).catch( _err => { throw new Error(_err) });
};

module.exports = {
	connectSES,
	uploadFile,
	awsZipDownload,
	getFileStream
};

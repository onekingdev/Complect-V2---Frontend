"use strict";

const { readDocuments } = require( "../helpers/crud" );
const { awsZipDownload } = require( "../helpers/aws" );
const { response } = require( "../helpers/utils" );

const collection = "records";

let files;
files = [];

const getDir = async ( current_id, current_status, current_title, current_folderId, origin_id ) => {
	if ( current_id === origin_id ) return "";
	let dir;
	dir = current_title;
	const record = await readDocuments({
		collection,
		_id: current_folderId
	});
	const cr_title = await getDir( record._id.toString(), record.status, record.title, record.folderId, origin_id );
	dir = current_status === "file" ? cr_title : `${cr_title}${dir}/`;
	return dir;
};

const getChildren = async ( _id, origin_id, fStatus ) => {
	const query = fStatus ? {
		folderId: _id,
		status: fStatus
	} : { folderId: _id };
	const records = await readDocuments({
		collection,
		query
	});
	if ( records.length )	for ( let i = 0; i < records.length; i++ ) {
		const recordDir = await getDir( records[i]._id.toString(), records[i].status, records[i].title, records[i].folderId, origin_id );
		const name = records[i].status === "file" ? `${recordDir}${records[i].title}` : recordDir;
		const key = records[i].status === "file" ? records[i].key : "";
		const status = records[i].status;
		const title = records[i].title;
		const value = records[i]._id;
		files.push({
			key,
			name,
			status,
			title,
			value
		});
		await getChildren( records[i]._id.toString(), origin_id, fStatus );
	}
};

exports.zipDownload = async event => {
	try {
		const { _id } = event.pathParameters;
		const record = await readDocuments({
			collection,
			_id
		});
		let location;
		files = [];
		if ( record.status === "file" ) {
			const file = [{
				key: record.key,
				name: record.title
			}];
			const zipName = `${record.title.split( "." )[0]}.zip`;
			location = await awsZipDownload( file, zipName );
		} else {
			const zipName = `${record.title}.zip`;
			await getChildren( _id, _id );
			location = await awsZipDownload( files, zipName );
		}
		return response({
			httpCode: 200,
			data: { location }
		});
	} catch ( error ) {
		return response({
			httpCode: 400,
			message: error.message
		});
	}
};

exports.moveToDirs = async () => {
	try {
		files = [];
		const query = {
			folderId: "root",
			status: "folder"
		};
		const records = await readDocuments({
			collection,
			query
		});

		if ( records.length ) {
			if ( records.length === 1 ) files = [];
			else for ( let i = 0; i < records.length; i++ ) {
				const name = "";
				const status = records[i].status;
				const title = records[i].title;
				const value = records[i]._id;
				const key = "";
				files.push({
					key,
					name,
					status,
					title,
					value
				});
				const id = records[i]._id.toString();
				await getChildren( id, id, "folder" );
			}
		} else files = [];

		return response({
			httpCode: 200,
			data: { dirs: files }
		});
	} catch ( error ) {
		return response({
			httpCode: 400,
			message: error.message
		});
	}
};

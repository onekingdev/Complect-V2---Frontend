import { ref, inject } from "vue";
import _clonedeep from "lodash.clonedeep";
import { randomMongoId } from "~/core/utils.js";
import { createDocumentsInCloudDb, readDocumentsFromCloudDb, updateDocumentInCloudDb, deleteDocumentsFromCloudDb } from "~/core/api.js";

const notification = inject( "notification" );
export default class UseData {
	constructor ( collectionName ) {
		this.collectionName = collectionName;
		this.document = ref({});
		this.documents = ref([]);
	}
	getDocument () {
		return this.document;
	}
	getDocuments () {
		return this.documents;
	}
	async createDocuments ( newDocuments ) {
		let copy;
		try {
			const ids = [];
			copy = _clonedeep( newDocuments );
			copy.forEach( newDocument => {
				const _id = randomMongoId(); // generate Document _id in MongoDB format
				ids.push( _id );
				newDocument._id = _id; // set _id to new Document
				newDocument.created = Date.now(); // set created time
				this.documents.value.push( newDocument );
			});
			await createDocumentsInCloudDb( this.collectionName, copy ); // save to MongoDB
			return ids;
		} catch ( error ) {
			console.error( error );
			notification( error );
			return null;
		} finally {
			copy = null;
		}
	}
	async readDocuments ( documentsId, query ) {
		try {
			if ( documentsId ) {
				const doc = await readDocumentsFromCloudDb( this.collectionName, documentsId, query );
				this.document.value = doc.data;
			} else {
				const docs = await readDocumentsFromCloudDb( this.collectionName, "", query );
				this.documents.value = docs.data;
			}
		} catch ( error ) {
			notification( error );
		}
	}
	async updateDocument ( documentId, patch ) {
		let backup;
		let index;
		try {
			index = this.documents.value.findIndex( doc => doc._id === documentId );
			backup = _clonedeep( this.documents.value[index]);
			this.documents.value[index] = { ...backup, ...patch };
			this.documents.value[index].updated = Date.now(); // set updated timestamp
			const apiAnswer = await updateDocumentInCloudDb( this.collectionName, patch, documentId );
			if ( !apiAnswer.ok ) throw new Error( apiAnswer.message );
		} catch ( error ) {
			notification( error );
			// roll back store changes, if api error
			this.documents.value[index] = { ...backup }; // eslint-disable-line require-atomic-updates
		} finally {
			backup = null;
		}
	}
	async deleteDocuments ( documentId ) {
		let backup;
		let index;
		try {
			if ( documentId ) {
				index = this.documents.value.findIndex( doc => doc._id === documentId );
				backup = _clonedeep( this.documents.value[index]);
				this.documents.value.splice( index, 1 );
			} else {
				backup = _clonedeep( this.documents.value );
				this.documents.value = [];
			}
			const apiAnswer = await deleteDocumentsFromCloudDb( this.collectionName, documentId );
			if ( !apiAnswer.ok ) throw new Error( apiAnswer.message );
		} catch ( error ) {
			notification( error );
			// roll back store changes, if api error
			if ( documentId ) this.documents.value.splice( index, 0, backup );
			else this.documents.value = backup; // eslint-disable-line require-atomic-updates
		} finally {
			backup = null;
		}
	}
	clearStore () {
		this.documents.value = [];
		this.document.value = {};
	}
	// _devmode
	devModePushToStore ( data ) {
		this.documents.value = data;
	}
}

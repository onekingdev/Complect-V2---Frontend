import { ref } from "vue";
import _clonedeep from "lodash.clonedeep";
import { randomMongoId } from "~/core/utils.js";
import { createDocumentsInCloudDb, readDocumentsFromCloudDb, updateDocumentInCloudDb, deleteDocumentsFromCloudDb } from "~/core/api.js";

const document = ref({});
const documents = ref([]);


export default function useData ( collectionName ) {
	const createDocuments = async newDocuments => {
		let copy;
		try {
			const ids = [];
			copy = _clonedeep( newDocuments );
			copy.forEach( newDocument => {
				const _id = randomMongoId(); // generate Document _id in MongoDB format
				ids.push( _id );
				newDocument._id = _id; // set _id to new Document
				newDocument.created = Date.now(); // set created time
				documents.value.push( newDocument );
			});
			await createDocumentsInCloudDb( collectionName, copy ); // save to MongoDB
			return ids;
		} catch ( error ) {
			console.error( error );
			return null;
		} finally {
			copy = null;
		}
	};


	const readDocuments = async documentsId => {
		try {
			if ( documentsId ) {
				const doc = await readDocumentsFromCloudDb( collectionName, documentsId );
				document.value = doc.data;
			} else {
				const docs = await readDocumentsFromCloudDb( collectionName );
				documents.value = docs.data;
			}
		} catch ( error ) {
			console.error( error );
		}
	};


	const updateDocument = async ( documentId, patch ) => {
		let backup;
		let index;
		try {
			index = documents.value.findIndex( doc => doc._id === documentId );
			backup = _clonedeep( documents.value[index]);
			documents.value[index] = { ...backup, ...patch };
			documents.value[index].updated = Date.now(); // set updated timestamp
			const apiAnswer = await updateDocumentInCloudDb( collectionName, patch, documentId );
			if ( !apiAnswer.ok ) throw new Error( apiAnswer.message );
		} catch ( error ) {
			console.error( error.message );
			// roll back store changes, if api error
			documents.value[index] = { ...backup }; // eslint-disable-line require-atomic-updates
		} finally {
			backup = null;
		}
	};


	const deleteDocuments = async documentId => {
		let backup;
		let index;
		try {
			if ( documentId ) {
				index = documents.value.findIndex( doc => doc._id === documentId );
				backup = _clonedeep( documents.value[index]);
				documents.value.splice( index, 1 );
			} else {
				backup = _clonedeep( documents.value );
				documents.value = [];
			}
			const apiAnswer = await deleteDocumentsFromCloudDb( collectionName, documentId );
			if ( !apiAnswer.ok ) throw new Error( apiAnswer.message );
		} catch ( error ) {
			console.error( error );
			// roll back store changes, if api error
			if ( documentId ) documents.value.splice( index, 0, backup );
			else documents.value = backup; // eslint-disable-line require-atomic-updates
		} finally {
			backup = null;
		}
	};


	const clearStore = () => {
		documents.value = [];
		document.value = {};
	};

	// _devmode
	const devModePushToStore = data => {
		documents.value = data;
	};
	// -------------------- //


	return {
		document,
		documents,
		createDocuments,
		readDocuments,
		updateDocument,
		deleteDocuments,
		clearStore,
		devModePushToStore
	};
}

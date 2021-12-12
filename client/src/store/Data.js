import { ref } from "vue";
import _clonedeep from "lodash.clonedeep";
import { randomMongoId } from "~/core/utils.js";
import { saveDocumentsToCloudDb, readDocumentsFromCloudDb, updateDocumentInCloudDb, removeDocumentsFromCloudDb } from "~/core/api.js";

const document = ref({});
const documents = ref([]);


export default function useData ( collectionName ) {
	const createDocuments = async ( newDocuments ) => {
		let copy;
		try {
			const ids = [];
			copy = _clonedeep( newDocuments );
			copy.forEach( ( newDocument ) => {
				const _id = randomMongoId(); // generate Document _id in MongoDB format
				newDocument._id = _id; // set _id to new Document
				newDocument.created = Date.now(); // set created time
				documents.value.push( newDocument );
				ids.push( _id );
			});
			await saveDocumentsToCloudDb( collectionName, copy ); // save to MongoDB
			return ids;
		} catch ( error ) {
			console.error( error );
		} finally {
			copy = null;
		}
	};


	const readDocument = async ( documentsId ) => {
		try {
			const doc = await await readDocumentsFromCloudDb( collectionName, documentsId );
			document.value = doc.data;
		} catch ( error ) {
			console.error( error );
		}
	};


	const readDocuments = async () => {
		try {
			const docs = await readDocumentsFromCloudDb( collectionName );
			documents.value = docs.data;
		} catch ( error ) {
			console.error( error );
		}
	};


	const updateDocument = async ( documentId, newDocument ) => {
		let copy;
		try {
			copy = _clonedeep( newDocument );
			copy.updated = Date.now(); // set updated time
			const index = documents.value.findIndex( doc => doc._id === documentId );
			documents.value[index] = copy;
			await updateDocumentInCloudDb( collectionName, copy, documentId );
		} catch ( error ) {
			console.error( error );
		} finally {
			copy = null;
		}
	};


	const deleteDocuments = async ( documentId ) => {
		try {
			if ( documentId ) {
				const index = documents.value.findIndex( doc => doc._id === documentId );
				documents.value.splice( index, 1 );
			} else documents.value = [];
			await removeDocumentsFromCloudDb( collectionName, documentId );
		} catch ( error ) {
			console.error( error );
		}
	};


	const clearStore = () => {
		documents.value = [];
		document.value = {};
	};


	return {
		documents,
		document,
		createDocuments,
		readDocument,
		readDocuments,
		updateDocument,
		deleteDocuments,
		clearStore
	};
}

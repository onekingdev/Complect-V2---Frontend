import { ref } from "vue";
import _clonedeep from "lodash.clonedeep";
import { randomMongoId } from "~/core/utils.js";
// import { saveDocumentsToCloudDb, updateDocumentInCloudDb, removeDocumentsFromCloudDb } from "~/core/api.js";
import { getDocumentFromLocalDb, getDocumentsFromLocalDb, saveDocumentsToLocalDb, updateDocumentInLocalDb, removeDocumentsFromLocalDb } from "~/core/indexedDb.js";

const document = ref({});
const documents = ref([
]);


export default function useData ( collectionName ) {
	// crud
	const createDocuments = async ( newDocuments ) => {
		console.info( "Create Document(s)" );
		let copy;
		try {
			const ids = [
			];
			copy = _clonedeep( newDocuments );
			copy.forEach( ( newDocument ) => {
				const _id = randomMongoId(); // generate Document _id in MongoDB format
				newDocument._id = _id; // set _id to new Document
				newDocument.created = Date.now(); // set created time
				documents.value[_id] = newDocument; // clone Document to Documents Array
				ids.push( _id );
			});
			// await saveDocumentsToCloudDb(collectionName, copy) // save to MongoDB
			await saveDocumentsToLocalDb( collectionName, copy ); // save to IndexedDB
			return ids;
		} catch ( error ) {
			console.error( error );
		} finally {
			copy = null;
		}
	};

	// const readDocuments = async documentsId => {
	// 	console.info("Read Documents")
	// 	try {

	// 	} catch(error) {
	// 		console.error(error)
	// 	}
	// }


	const updateDocument = async ( documentId, newDocument ) => {
		console.info( "Update Document" );
		let copy;
		try {
			copy = _clonedeep( newDocument );
			copy.updated = Date.now(); // set updated time
			documents.value[documentId] = copy;
			await updateDocumentInLocalDb( collectionName, copy );
			// await updateDocumentInCloudDb(collectionName, copy, documentId)
		} catch ( error ) {
			console.error( error );
		} finally {
			copy = null;
		}
	};

	const deleteDocuments = async ( documentId ) => {
		try {
			if ( documentId ) delete documents.value[documentId];
			else documents.value = {};
			// await removeDocumentsFromCloudDb(collectionName, documentId)
			await removeDocumentsFromLocalDb( collectionName, documentId );
		} catch ( error ) {
			console.error( error );
		}
	};


	const documentToStore = async ( documentsId ) => {
		console.info( "Get Document" );
		try {
			document.value = await getDocumentFromLocalDb( collectionName, documentsId );
		} catch ( error ) {
			console.error( error );
		}
	};

	const documentsToStore = async () => {
		const docs = await getDocumentsFromLocalDb( collectionName );
		docs.forEach( doc => documents.value.push( doc ) );
	};
	const clearStore = () => {
		documents.value = [
		];
		document.value = {};
	};
	const readDocuments = () => console.log( "readDocuments" );


	return {
		documents,
		document,
		documentToStore,
		documentsToStore,
		clearStore,
		createDocuments,
		readDocuments,
		updateDocument,
		deleteDocuments
	};
}

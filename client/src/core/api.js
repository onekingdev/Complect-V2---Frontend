const endpoint = ( collectionName, documentId ) => {
	let base;
	const API_URI = import.meta.env.VITE_API_URI;
	base = `${API_URI}/data/${collectionName}`;
	if ( documentId ) base += `/${documentId}`;
	return base;
};

const api = async ({ method, collectionName, newDocuments, documentId }) => {
	try {
		const apiUrl = endpoint( collectionName, documentId );
		const options = {
			method,
			"mode": "cors",
			"cache": "no-cache",
			"headers": { "Content-Type": "application/json;charset=utf-8" },
			"body": JSON.stringify( newDocuments )
		};
		const serverAnswer = await fetch( apiUrl, options );
		if ( !serverAnswer.ok ) throw new Error( serverAnswer.message );
		const paredServerAnswer = await serverAnswer.json();
		return paredServerAnswer;
	} catch ( error ) {
		console.error( error );
		return { "error": error.message };
	}
};


const createDocumentsInCloudDb = async ( collectionName, newDocuments ) => {
	const result = await api({ "method": "POST", collectionName, newDocuments });
	return result;
};

const readDocumentsFromCloudDb = async ( collectionName, documentId ) => {
	const result = await api({ "method": "GET", collectionName, documentId });
	return result;
};

const updateDocumentInCloudDb = async ( collectionName, newDocuments, documentId ) => {
	const result = await api({ "method": "PUT", collectionName, newDocuments, documentId });
	return result;
};

const deleteDocumentsFromCloudDb = async ( collectionName, documentId ) => {
	const result = await api({ "method": "DELETE", collectionName, documentId });
	return result;
};


export { createDocumentsInCloudDb, readDocumentsFromCloudDb, updateDocumentInCloudDb, deleteDocumentsFromCloudDb };

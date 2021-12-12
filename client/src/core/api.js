/* eslint max-lines-per-function: ["error", 50] */
/* eslint max-statements: ["error", 50] */

const endpoint = ( collectionName, documentId ) => {
	let base;
	base = `http://localhost:82/v1/data/${collectionName}`;
	// base = `https://5can282p12.execute-api.us-east-1.amazonaws.com/dev/data/${collectionName}`;
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
			"headers": {
				"Content-Type": "application/json;charset=utf-8"
				// "Access-Control-Allow-Origin": "*"
			},
			"body": JSON.stringify( newDocuments )
		};
		const response = await fetch( apiUrl, options );
		if ( !response.ok ) throw new Error( response.message );
		const answer = await response.json();
		return answer;
	} catch ( error ) {
		console.error( error );
		return { "error": error.message };
	}
};


const readDocumentsFromCloudDb = async ( collectionName, documentId ) => await api({
	"method": "GET",
	collectionName,
	documentId
});

const saveDocumentsToCloudDb = async ( collectionName, newDocuments ) => {
	await api({
		"method": "POST",
		collectionName,
		newDocuments
	});
};

const updateDocumentInCloudDb = async ( collectionName, newDocuments, documentId ) => {
	await api({
		"method": "PUT",
		collectionName,
		newDocuments,
		documentId
	});
};

const removeDocumentsFromCloudDb = async ( collectionName, documentId ) => {
	await api({
		"method": "DELETE",
		collectionName,
		documentId
	});
};


export { readDocumentsFromCloudDb, saveDocumentsToCloudDb, updateDocumentInCloudDb, removeDocumentsFromCloudDb };

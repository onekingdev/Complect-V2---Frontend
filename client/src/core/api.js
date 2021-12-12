/* eslint max-lines-per-function: ["error", 50] */
/* eslint max-statements: ["error", 50] */

const databaseName = "dev";

const endpoint = ( collectionName, documentId ) => {
	let base;
	base = `http://localhost:82/v1/data/${databaseName}/${collectionName}`;
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
				"Content-Type": "application/json;charset=utf-8",
				"Access-Control-Max-Age": "86400"
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


// const socketAPI = async ({ method, collectionName, newDocuments, documentId }) => {
// 	try {
// 		const message = {
// 			"userId": "6188ea900a0fe7797ff81e69",
// 			"action": "rest",
// 			method,
// 			collectionName,
// 			newDocuments,
// 			documentId
// 		};
// 		// socket.send( JSON.stringify( message ) );
// 	} catch ( error ) {
// 		console.error( error );
// 		return { "error": error.message };
// 	}
// };


const readDocumentsFromCloudDb = async collectionName => await api({
	"method": "GET",
	collectionName
});
	// return await socketAPI({ method: "GET", collectionName })


const saveDocumentsToCloudDb = async ( collectionName, newDocuments ) => {
	await api({
		"method": "POST",
		collectionName,
		newDocuments
	});
	// await socketAPI({
	// 	"method": "POST",
	// 	collectionName,
	// 	newDocuments
	// });
};

const updateDocumentInCloudDb = async ( collectionName, newDocuments, documentId ) => {
	await api({
		"method": "PUT",
		collectionName,
		newDocuments,
		documentId
	});
	// await socketAPI({
	// 	"method": "PUT",
	// 	collectionName,
	// 	newDocuments,
	// 	documentId
	// });
};

const removeDocumentsFromCloudDb = async ( collectionName, documentId ) => {
	await api({
		"method": "DELETE",
		collectionName,
		documentId
	});
	// await socketAPI({
	// 	"method": "DELETE",
	// 	collectionName,
	// 	documentId
	// });
};


export { readDocumentsFromCloudDb, saveDocumentsToCloudDb, updateDocumentInCloudDb, removeDocumentsFromCloudDb };

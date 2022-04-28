const generateQuery = query => query ? `?${Object.keys( query ).map( key => `${key}=${query[key]}` ).join( "&" )}` : "";

const endpoint = ( collectionName, documentId, query ) => {
	let base;
	const API_URI = import.meta.env.VITE_API_URI;
	base = `${API_URI}/data/${collectionName}`;
	if ( documentId ) base += `/${documentId}`;
	if ( query ) {
		const queryString = Object.keys( query ).map( key => `${key}=${query[key]}` ).join( "&" );
		base += `?${queryString}`;
	}
	return base;
};

const api = async ({ method, collectionName, newDocuments, documentId, query }) => {
	try {
		const apiUrl = endpoint( collectionName, documentId, query );
		const options = {
			method,
			"mode": "cors",
			"cache": "no-cache",
			"headers": { "Content-Type": "application/json;charset=utf-8" },
			"body": JSON.stringify( newDocuments )
		};
		const serverAnswer = await fetch( apiUrl, options );
		const parsedServerAnswer = await serverAnswer.json();
		if ( !parsedServerAnswer.ok ) throw new Error( serverAnswer.message );
		return parsedServerAnswer;
	} catch ( error ) {
		console.error( error );
		return { "error": error.message };
	}
};


const createDocumentsInCloudDb = async ( collectionName, newDocuments ) => {
	const result = await api({ "method": "POST", collectionName, newDocuments });
	return result;
};

const readDocumentsFromCloudDb = async ( collectionName, documentId, query ) => {
	const result = await api({ "method": "GET", collectionName, documentId, query });
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

const manualApi = async ({ method, url, data }) => {
	const API_URI = import.meta.env.VITE_API_URI;
	const apiUrl = `${API_URI}/api/${url}`;
	const options = {
		method,
		"mode": "cors",
		"cache": "no-cache",
		"headers": {
			"Content-Type": "application/json;charset=utf-8",
			"Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyIiwic2NwIjoidXNlciIsImF1ZCI6bnVsbCwiaWF0IjoxNjQ5OTU2OTYyLCJleHAiOjE2NTEyNTI5NjIsImp0aSI6IjRiZjIzNGU3LTliMDMtNDE5Yi1hNzEzLTNlZjIyODBlNGRmYiJ9.yc6cdI8NX2JBIMCnsNVsDxv1CCXdJzXPN6K604DnRnI"
		},
		"body": JSON.stringify( data )
	};
	const serverAnswer = await fetch( apiUrl, options );
	const parsedServerAnswer = await serverAnswer.json();
	if ( !parsedServerAnswer.ok ) throw new Error( serverAnswer.message );
	return parsedServerAnswer.data;
};

export { createDocumentsInCloudDb, readDocumentsFromCloudDb, updateDocumentInCloudDb, deleteDocumentsFromCloudDb, manualApi, generateQuery };

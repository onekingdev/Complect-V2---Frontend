/* eslint max-lines-per-function: ["error", 50] */
/* eslint max-statements: ["error", 50] */

const endpoint = ( databaseName, collectionName ) => `http://localhost:82/v1/data/${databaseName}/${collectionName}`;

export default async function useRest ({ method, databaseName, collectionName }) {
	try {
		const apiUrl = endpoint( databaseName, collectionName );
		const options = {
			method,
			mode: "cors",
			cache: "no-cache",
			headers: {
				"Content-Type": "application/json;charset=utf-8",
				"Access-Control-Max-Age": "86400"
			}
		};
		const response = await fetch( apiUrl, options );
		if ( !response.ok ) throw new Error( response.message );
		const answer = await response.json();
		return answer;
	} catch ( error ) {
		console.error( error );
		return { error: error.message };
	}
}

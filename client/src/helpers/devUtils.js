import useApi from "./Api.js";

// `POST` collections to API in sequence
const postCollections = async ( databaseName, collections ) => {
	try {
		const collectionsNames = Object.keys( collections );
		for ( const collectionName of collectionsNames ) {
			const result = await useApi({
				method: "post",
				databaseName,
				collectionName,
				newDocuments: collections[collectionName]
			});
			if ( !result.ok ) throw new Error( `Data not saved: ${collectionName}` );
		}
		return "Saved";
	} catch ( error ) {
		console.error( error );
	}
};


export { postCollections };

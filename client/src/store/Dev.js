/* eslint max-lines-per-function: ["error", 500] */
/* eslint max-statements: ["error", 500] */

import { reactive } from "vue";
import useApi from "~/utils/Api.js";


// const databases = ref([]);
const records = reactive({});
export default function useDev ( collection ) {
	const getDatabases = async () => {
		// try {
		// 	const result = await useApi({
		// 		method: "get",
		// 		collection
		// 	});
		// 	result.forEach( record => records[record._id] = record );
		// } catch ( error ) {
		// 	console.error( error );
		// }
	};

	const createDatabse = async databaseName => await useApi({
		method: "post",
		databaseName
	});
	const updateDatabse = async databaseName => await useApi({
		method: "put",
		databaseName
	});
	const dropDatabse = async databaseName => await useApi({
		method: "delete",
		databaseName
	});


	const getRecords = async () => {
		try {
			const result = await useApi({
				method: "get",
				collection
			});
			result.forEach( record => records[record._id] = record );
		} catch ( error ) {
			console.error( error );
		}
	};
	return {
		createDatabse,
		updateDatabse,
		dropDatabse,
		getDatabases,
		getRecords,
		records
	};
}

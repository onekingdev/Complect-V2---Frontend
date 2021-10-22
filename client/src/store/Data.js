import { ref } from "vue";
import useApi from "~/helpers/Api.js";

/* ------------------ //
-- Data Architecture --
- get data:
	- API -> IndexedDB
	- IndexedDB -> Store
	- Store -> View
- post data:
	- View -> Store
	- Store -> IndexedDB
	- Store -> API
- get new data:
	- API -> WS -> IndexedDB
	- IndexedDB -> Store
	- Store -> View
// ------------------*/


const records = ref([]);

export default function useData ( collectionName ) {
	// get all user data from API, and clone it to IndexedDB
	const dataToIndexedDb = () => {
		// console.info( "Save data to IndexedDB" );
		// const userId = "";
		// const dataList = ["tasks", "projects"];
		try {
			// const data = await useApi({
			// 	method: "get",
			// 	collectionName
			// });
		} catch ( error ) {
			// console.error( error );
		}
	};


	const recordsToStore = async () => {
		// console.info( "Add Records to Store" );
		try {
			const result = await useApi({
				method: "get",
				collectionName
			});
			records.value = result.data;
		} catch ( error ) {
			// console.error( error );
		}
	};

	const cleanStore = () => {
		// console.info( "Remove Records from Store" );
		try {
			records.value = [];
		} catch ( error ) {
			console.error( error );
		}
	};

	return {
		dataToIndexedDb,
		records,
		recordsToStore,
		cleanStore
	};
}

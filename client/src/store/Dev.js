import { reactive } from "vue";
import useRest from "~/utils/Rest.js";


const records = reactive({});
export default function useDev ( collection ) {
	const getRecords = async () => {
		try {
			const result = await useRest({
				method: "get",
				collection
			});
			result.forEach( record => records[record._id] = record );
		} catch ( error ) {
			console.error( error );
		}
	};
	return {
		records,
		getRecords
	};
}

import { manualApi } from "~/core/api";
import { ref } from "vue";

export default class BusinessService {
	constructor ( ) {
		this.document = ref({});
	}
	getDocument () {
		return this.document;
	}
	async readDocuments ( ) {
		const doc = await manualApi({ "method": "GET", "url": "business" });
		this.document.value = doc;
	}
	async updateDocument ( data ) {
		const doc = await manualApi({ "method": "PATCH", "url": "business", data });
		this.document.value = doc;
	}
	clearStore () {
		this.document.value = {};
	}
}

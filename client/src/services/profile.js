import { manualApi } from "~/core/api";
import { ref } from "vue";

export default class ProfileService {
	constructor ( ) {
		this.document = ref({});
	}
	getDocument () {
		return this.document;
	}
	async readDocuments ( ) {
		const doc = await manualApi({ "method": "GET", "url": "profile" });
		this.documents.value = doc;
	}
	async updateDocument ( data ) {
		const doc = await manualApi({ "method": "PATCH", "url": "profile", data });
		this.document.value = doc;
	}
	clearStore () {
		this.document.value = {};
	}
}

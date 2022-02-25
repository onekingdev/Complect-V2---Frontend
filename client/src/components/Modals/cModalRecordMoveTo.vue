<template lang="pug">
card-container.c-modal-review(title="Move To" ref="modalWindow")
	template(#controls)
		c-button(type="icon" iconL="close" size="small" @click="closeModal()")
	template(#content)
		.grid-6
			c-select(label="Destination" v-model="selectedId" :data="items")
	template(#footer)
		c-button(title="Cancel" type="link" @click="closeModal()")
		c-button(title="Confirm" type="primary" @click="MoveToRecord()")
</template>

<script>
import { ref, inject, onMounted } from "vue";
import cSelect from "~/components/Inputs/cSelect.vue";
import useModals from "~/store/Modals.js";
import { onClickOutside } from "@vueuse/core";
import { manualApi } from "~/core/api.js";
import useData from "~/store/Data.js";

export default {
	"components": { cSelect },
	"props": {
		"modalId": {
			"type": String,
			"required": true
		},
		"id": {
			"type": String,
			"default": "",
			"required": false
		},
		"folderId": {
			"type": String,
			"default": "",
			"required": false
		}
	},
	setup ( props ) {
		const { document, readDocuments, updateDocument } = useData( "records" );
		const notification = inject( "notification" );
		const modalWindow = ref( null );
		const { deleteModal } = useModals();
		const selectedId = ref( null );
		const items = ref([]);
		const selectedStatus = ref( null );

		const closeModal = () => deleteModal( props.modalId );

		onClickOutside( modalWindow, () => {
			closeModal();
		});

		const MoveToRecord = async () => {
			try {
				await updateDocument( props.id, { "folderId": selectedId.value });
				readDocuments( "", { "folderId": props.folderId });
				notification({
					"type": "success",
					"title": "Success",
					"message": `${selectedStatus.value} has been moved`
				});
			} catch ( error ) {
				console.error( error );
				notification({
					"type": "error",
					"title": "Error",
					"message": `${selectedStatus.value} has not been moved. Please try again.`
				});
			} finally {
				closeModal();
			}
		};

		const getDirectories = async () => {
			const res = await manualApi({ "method": "GET", "url": "records/movetoDirs" });
			if ( res.dirs.length ) items.value = [{ "value": "root", "title": ".root", "name": "" }];
			items.value = [
				...items.value, ...res.dirs
			];
			items.value.forEach( item => {
				for ( let i = 0; i < item.name.split( "/" ).length - 1; i++ ) item.title = `-- ${item.title}`;
			});
		};

		onMounted( async () => {
			await readDocuments( props.id );
			selectedStatus.value = document.value.status === "folder" ? "Folder" : "File";
			await getDirectories();
		});

		return { modalWindow, closeModal, selectedId, items, MoveToRecord };
	}
};
</script>

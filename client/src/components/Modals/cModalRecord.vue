<template lang="pug">
card-container.c-modal-review(:title="modalTitle" ref="modalWindow")
	template(#controls)
		c-button(type="icon" iconL="close" size="small" @click="closeModal()")
	template(#content)
		.grid-6
			c-field(label="Name" v-model="form.title" required)
	template(#footer)
		c-button(title="Cancel" type="link" @click="closeModal()")
		c-button(:title="btnTitle" type="primary" @click="saveRecord()")
</template>


<script>
import { ref, inject, computed, onMounted } from "vue";
import useData from "~/store/Data.js";
import useModals from "~/store/Modals.js";
import { onClickOutside } from "@vueuse/core";

export default {
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
			"default": "root",
			"required": false
		},
		"key": {
			"type": String,
			"default": "root/",
			"required": false
		}
	},
	setup ( props ) {
		const notification = inject( "notification" );
		const modalWindow = ref( null );
		const { document, readDocuments, createDocuments, updateDocument, deleteDocuments } = useData( "records" );
		const { deleteModal } = useModals();
		const modalTitle = ref( "" );
		const btnTitle = computed( () => props.id ? "Save" : "Create" );
		const form = ref({
			"title": "",
			"status": "folder",
			"Owner": "",
			"size": 0,
			"dateCreated": Date.now(),
			"lastModified": Date.now(),
			"folderId": props.folderId,
			"key": ""
		});

		const closeModal = () => deleteModal( props.modalId );
		onClickOutside( modalWindow, () => { closeModal(); });

		const createRecord = async () => {
			try {
				if ( form.value.status === "folder" ) form.value.key = `${props.key}${form.value.title}`;
				await createDocuments([form.value]);
				readDocuments( "", { "folderId" : props.folderId });
				notification({
					"type": "success",
					"title": "Success",
					"message": "Folder has been created."
				});
			} catch ( error ) {
				console.error( error );
				notification({
					"type": "error",
					"title": "Error",
					"message": "Folder has not been created. Please try again."
				});
			}
		};

		const updateRecord = async () => {
			const title = form.value.status;
			try {
				form.value.key = `${props.key}${form.value.title}`;
				await updateDocument( form.value._id, form.value );
				notification({
					"type": "success",
					"title": "Success",
					"message": `${title} has been updated`
				});
			} catch ( error ) {
				console.error( error );
				notification({
					"type": "error",
					"title": "Error",
					"message": `${title} has not been updated. Please try again.`
				});
			}
		};

		const saveRecord = async () => {
			try {
				if ( !props.id ) await createRecord();
				else if ( props.id ) await updateRecord();
			} catch ( error ) {
				console.error( error );
			} finally {
				closeModal();
			}
		};

		onMounted( async () => {
			if ( props.id ) {
				await readDocuments( props.id );
				form.value = document.value;
				modalTitle.value = form.value.status === "folder" ? "Edit Folder Name" : "Edit File Name";
			} else modalTitle.value = "New Folder";
		});

		return { modalWindow, modalTitle, btnTitle, saveRecord, form, closeModal };
	}
};
</script>

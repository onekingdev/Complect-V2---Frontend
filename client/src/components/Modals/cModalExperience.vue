<template lang="pug">
card-container(:title="modalTitle" ref="modalWindow")
	template(#controls)
		c-button(type="icon" iconL="close" size="small" @click="closeModal()")
	template(#content)
		.grid-6
			c-field(label="Title" v-model="form.title" required)
			c-field(label="Employer" v-model="form.employer")
			c-field.col-3(label="Start Date" type="date" v-model="form.startsAt" required)
			c-field.col-3(label="Due Date" type="date" v-model="form.endsAt")
			div.col-3
			c-checkbox.col-3(label="Present" v-model="form.isPresent")
			c-textarea(label="Description" v-model="form.description")
	template(#footer)
		c-button(title="Cancel" type="link" @click="closeModal()")
		c-button(:title="btnTitle" type="primary" @click="saveUserExperience")
</template>


<script>
import { ref, onMounted, onUnmounted, inject } from "vue";
import useModals from "~/store/Modals.js";
import useData from "~/store/Data.js";
import useProfile from "~/store/Profile.js";
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
		}
	},
	setup ( props ) {
		const notification = inject( "notification" );
		const { profile } = useProfile();
		const { deleteModal } = useModals();
		const { document, readDocuments, createDocuments, updateDocument } = useData( "user_experiences" );

		const modalTitle = props.id ? "Edit Experience" : "Add Experience";
		const btnTitle = props.id ? "Save" : "Add";
		const action = props.id ? "updated" : "added";
		const modalWindow = ref( null );
		const form = ref({ "isPresent": false, "userId": profile.value._id });

		const closeModal = () => deleteModal( props.modalId );

		const saveUserExperience = async () => {
			try {
				if ( props.id ) await updateDocument( form.value._id, form.value );
				else await createDocuments([form.value]);

				notification({
					"title": "Success",
					"message": `Experience has been ${action}.`
				});

				closeModal();
			} catch ( error ) {
				console.error( error );
				notification({
					"type": "error",
					"title": "Error",
					"message": `Experience has not been ${action}. Please try again.`
				});
			}
		};

		onClickOutside( modalWindow, () => {
			closeModal();
		});

		const getData = async () => {
			await readDocuments( props.id );
			form.value = document.value;
		};

		onMounted( () => {
			if ( props.id ) getData();
		});

		onUnmounted( () => form.value = {});

		return { modalWindow, modalTitle, btnTitle, form, closeModal, saveUserExperience };
	}
};
</script>


<style lang="stylus" scoped>
.c-modal-task
	.delete-button
		margin-right: auto
	.completed
		display: flex
		align-items: center
		line-height: 1.3
		.text
			margin-left: 0.5em
			font-weight: 700
			font-size: 0.9em
</style>

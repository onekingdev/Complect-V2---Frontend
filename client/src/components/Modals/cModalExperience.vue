<template lang="pug">
card-container(title="New Experience" ref="modalWindowx")
	template(#controls)
		c-button(type="icon" iconL="close" size="small" @click="closeModal()")
	template(#content)
		.grid-6
			c-field(label="Title" v-model="form.title" required)
			c-field(label="Employer" v-model="form.employer")
			c-field.col-3(label="Start Date" type="date" v-model="form.startsAt" required)
			c-field.col-3(label="Due Date" type="date" v-model="form.endsAt" required)
			c-textarea(label="Description" v-model="form.description")
	template(#footer)
		c-button(title="Cancel" @click="closeModal()")
		c-button(title="Save" type="primary" @click="createUserExperience")
</template>


<script>
import { ref, computed, onMounted, onUnmounted, inject } from "vue";
import useModals from "~/store/Modals.js";
import useData from "~/store/Data.js";
import cChat from "~/components/Misc/cChat.vue";
import useProfile from "~/store/Profile.js";
import { formatDate } from "~/core/utils.js";
import { onClickOutside } from "@vueuse/core";

export default {
	"components": { cChat },
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
		const { profile } = useProfile();
		const modalWindowx = ref( null );
		const { deleteModal } = useModals();
		const { document, readDocuments, createDocuments, updateDocument, deleteDocuments } = useData( "user_experiences" );
		const form = ref({ user_id: profile.value._id });
		const closeModal = () => deleteModal( props.modalId );
		const createUserExperience = async () => {
			try {
				console.log(form.value)
				const result = await createDocuments([form.value]);

				// console.log(result)
				// notification({
				// 	"title": "Success",
				// 	"message": "Task has been created."
				// });
			} catch ( error ) {
				console.error( error );
				// notification({
				// 	"type": "error",
				// 	"title": "Error",
				// 	"message": "Task has not been created. Please try again."
				// });
			}
		};
		onClickOutside( modalWindowx, () => closeModal() );

		const getData = async () => {
			await readDocuments( props.id );
			form.value = document.value;
		};


		onMounted( () => {
			if ( props.id ) getData();
		});
		
		onUnmounted( () => form.value = {});

		return { form, closeModal, createUserExperience };
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

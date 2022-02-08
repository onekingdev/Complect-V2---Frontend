<template lang="pug">
card-container.c-modal-task(:title="title" ref="modalWindow")
	template(#controls)
		c-button(type="icon" iconL="close" size="small" @click="closeModal()")
	template(#content)
		.grid-6
			c-select(v-if="isNewTask" label="Template" v-model="selectedId" :data="documents")
			c-field(label="Review Name" v-model="form.title" required)
			c-field.col-3(label="Review Period Start Date" type="date" v-model="form.startsAt" required)
			c-field.col-3(label="Review Period End Date" type="date" v-model="form.endsAt" required)
	template(#footer)
		c-button(:title="btnTitle" type="primary" @click="saveReview()")
</template>


<script>
import { ref, computed, onMounted, onUnmounted, inject } from "vue";
import { useRouter } from "vue-router";
import useModals from "~/store/Modals.js";
import useData from "~/store/Data.js";
import { onClickOutside } from "@vueuse/core";
import cChat from "~/components/Misc/cChat.vue";
import cSelect from "~/components/Inputs/cSelect.vue";
import _clonedeep from "lodash.clonedeep";

export default {
	"components": { cChat, cSelect },
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
		const { document, documents, readDocuments, createDocuments, updateDocument } = useData( "reviews" );
		const { deleteModal } = useModals();
		const notification = inject( "notification" );
		const router = useRouter();

		const modalWindow = ref( null );
		const selectedId = ref( null );
		const form = ref({
			"title": "",
			"dateCreated": Date.now(),
			"lastModified": Date.now(),
			"startsAt": Date.now(),
			"endsAt": Date.now() + 864e5,
			"reviewPeriod": Date.now(),
			"completedAt": null,
			"endDate": Date.now(),
			"finding": 0,
			"categories": [],
			"businessChanges": "",
			"regulatoryChanges": [],
			"employeesInterviewed": [],
			"progress": {
				"current": 0,
				"max": 0
			}
		});

		const isNewTask = computed( () => !props.id );
		const title = computed( () => props.id ? "Edit Internal Review Modal" : "New Internal Review Modal" );
		const btnTitle = computed( () => props.id ? "Save" : "Create" );

		const closeModal = () => deleteModal( props.modalId );
		onClickOutside( modalWindow, () => closeModal() );

		const createReview = async () => {
			try {
				let reviewId;

				if ( selectedId.value ) {
					const index = documents.value.findIndex( doc => doc._id === selectedId.value );
					const copy = _clonedeep([documents.value[index]]);
					const duplicate = { ...form.value, ...copy };
					reviewId = await createDocuments([duplicate]);
				} else reviewId = await createDocuments([form.value]);

				notification({
					"type": "success",
					"title": "Success",
					"message": "Internal review has been created"
				});

				router.push({
					"name": "ReviewDetail",
					"params": { "id": reviewId[0] }
				});
			} catch ( error ) {
				console.error( error );
				notification({
					"type": "error",
					"title": "Error",
					"message": "Internal review has not been created. Please try again."
				});
			}
		};

		const updateReview = async () => {
			try {
				await updateDocument( form.value._id, form.value );
				notification({
					"type": "success",
					"title": "Success",
					"message": "Internal review has been updated."
				});
			} catch ( error ) {
				console.error( error );
				notification({
					"type": "error",
					"title": "Error",
					"message": "Internal review has not been updated. Please try again."
				});
			}
		};

		const saveReview = async () => {
			try {
				if ( !props.id ) await createReview();
				else if ( props.id ) await updateReview();
			} catch ( error ) {
				console.error( error );
			} finally {
				closeModal();
			}
		};

		const getData = async () => {
			await readDocuments( props.id );
			form.value = document.value;
		};


		onMounted( () => {
			readDocuments();
			if ( props.id ) getData();
		});
		onUnmounted( () => form.value = {});

		return { modalWindow, closeModal, title, btnTitle, selectedId, form, documents, isNewTask, saveReview };
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

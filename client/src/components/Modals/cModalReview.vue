<template lang="pug">
card-container.c-modal-review(:title="title" ref="modalWindow")
	template(#controls)
		c-button(type="icon" iconL="close" size="small" @click="closeModal()")
	template(#content)
		.grid-6
			c-select(v-if="isNewReview && items.length" label="Template" v-model="selectedId" :data="items")
			c-field(label="Review Name" v-model="form.name" required)
			c-field.col-3(label="Review Period Start Date" type="date" v-model="form.startsAt" required)
			c-field.col-3(label="Review Period End Date" type="date" v-model="form.endsAt" required)
	template(#footer)
		c-button(title="Cancel" type="link" @click="closeModal()")
		c-button(:title="btnTitle" type="primary" @click="saveReview()")
</template>


<script>
import { ref, computed, onMounted, onUnmounted, inject } from "vue";
import { useRouter } from "vue-router";
import useModals from "~/store/Modals.js";
import UseData from "~/store/Data.js";
import { onClickOutside } from "@vueuse/core";
import cSelect from "~/components/Inputs/cSelect.vue";
import _clonedeep from "lodash.clonedeep";

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
		}
	},
	setup ( props ) {
		const reviews = new UseData( "reviews" );
		const { deleteModal } = useModals();
		const notification = inject( "notification" );
		const router = useRouter();
		const modalWindow = ref( null );
		const selectedId = ref( null );
		const items = ref([]);
		const form = ref({
			"name": "",
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

		const isNewReview = computed( () => !props.id );
		const title = computed( () => props.id ? "Edit Internal Review" : "New Internal Review" );
		const btnTitle = computed( () => props.id ? "Save" : "Create" );
		const closeModal = () => deleteModal( props.modalId );
		onClickOutside( modalWindow, () => closeModal() );
		const createReview = async () => {
			try {
				let reviewId;
				if ( selectedId.value ) {
					const index = reviews.getDocuments().value.findIndex( doc => doc._id === selectedId.value );
					const duplicate = _clonedeep( reviews.getDocuments().value[index]);
					form.value.categories = duplicate.categories;
					reviewId = await reviews.createDocuments([form.value]);
				} else reviewId = await reviews.createDocuments([form.value]);
				notification({ "type": "success", "title": "Success", "message": "Internal review has been created" });
				router.push({
					"name": "ReviewDetail",
					"params": { "id": reviewId[0] }
				});
			} catch ( error ) {
				console.error( error );
				notification({ "type": "error", "title": "Error", "message": "Internal review has not been created. Please try again." });
			}
		};
		const getProgress = review => {
			let current, finding;
			current = 0;
			finding = 0;
			const max = review.categories.length + 1;
			if ( review.completedAt ) current += 1;
			review.categories.forEach( category => {
				if ( category.completedAt ) current += 1;
				category.content.forEach( topic => {
					topic.items.forEach( item => {
						finding += item.finding.length;
					});
				});
			});
			review.progress = { max, current };
			review.finding = finding;
		};
		const updateReview = async () => {
			try {
				await reviews.updateDocument( form.value._id, form.value );
				const index = reviews.getDocuments().value.findIndex( doc => doc._id === form.value._id );
				getProgress( reviews.getDocuments().value[index]);
				notification({ "type": "success", "title": "Success", "message": "Internal review has been updated." });
			} catch ( error ) {
				console.error( error );
				notification({ "type": "error", "title": "Error", "message": "Internal review has not been updated. Please try again." });
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
		onMounted( async () => {
			if ( props.id ) {
				await reviews.readDocuments( props.id );
				form.value = reviews.getDocument().value;
			} else {
				await reviews.readDocuments();
				reviews.getDocuments().value.forEach( review => {
					const item = {
						"title": review.title,
						"value": review._id
					};
					items.value.push( item );

					getProgress( review );
				});
			}
		});
		onUnmounted( () => form.value = {});
		return { modalWindow, closeModal, title, btnTitle, selectedId, form, "documents": reviews.getDocuments(), items, isNewReview, saveReview };
	}
};
</script>


<style lang="stylus" scoped>
.c-modal-review
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

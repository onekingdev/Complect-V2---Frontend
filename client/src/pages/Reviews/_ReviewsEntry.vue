<template lang="pug">
page-container(title="Internal Reviews")
	template(#controls)
		c-button-modal(title="New Review" modalTitle="New Review" type="primary")
			template(#content)
				c-select(label="Template" v-model="selectedId" :data="documents")
				c-field(label="Review Name" v-model="newReview.title" required)
				c-field.col-3(label="Review Period Start Date" type="date" v-model="newReview.startsAt" required)
				c-field.col-3(label="Review Period End Date" type="date" v-model="newReview.endsAt" required)
			template(#footer)
				c-button(title="Create" type="primary" @click="createReview()")
	template(#content)
		router-view
</template>


<script>
import { ref, onMounted, onUnmounted, inject } from "vue";
import { useRouter } from "vue-router";
import useData from "~/store/Data.js";
import cSelect from "~/components/Inputs/cSelect.vue";
import _clonedeep from "lodash.clonedeep";
export default {
	"components": { cSelect },
	setup () {
		const notification = inject( "notification" );
		const router = useRouter();
		const { documents, createDocuments, readDocuments, clearStore } = useData( "reviews" );

		const selectedId = null;
		const newReview = ref({
			"title": "",
			"dateCreated": Date.now(),
			"lastModified": Date.now(),
			"startsAt": Date.now(),
			"endsAt": Date.now() + 864e5,
			"reviewPeriod": Date.now(),
			"endDate": Date.now(),
			"finding": 0,
			"progress": {
				"current": 0,
				"max": 0
			}
		});

		const createReview = async () => {
			try {
				let reviewId;
				if(selectedId){
					const index = documents.value.findIndex( doc => doc._id === selectedId );
					duplicate = _clonedeep([documents.value[index]]);
					duplicate = { ...newReview, ...duplicate };
					reviewId = await createDocuments([duplicate]);
				}
				else{
					reviewId = await createDocuments([newReview.value]);
				}
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

		onMounted( () => readDocuments() );
		onUnmounted( () => clearStore() );

		return {
			newReview,
			selectedId,
			documents,
			createReview
		};
	}
};
</script>


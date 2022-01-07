<template lang="pug">
documents-container(title="Internal Reviews")
	template(#controls)
		c-button-modal(title="New Review" modalTitle="New Review" type="primary")
			template(#content)
				c-field(label="Review Name" v-model="newReview.title" required)
				c-field.col-3(label="Start Date" type="date" v-model="newReview.startsAt" required)
				c-field.col-3(label="End Date" type="date" v-model="newReview.endsAt" required)
			template(#footer)
				c-button(title="Create" type="primary" @click="createReview()")
	template(#content)
		router-view
</template>


<script>
import { ref, inject } from "vue";
import { useRouter } from "vue-router";
import useData from "~/store/Data.js";
export default {
	setup () {
		const toast = inject( "toast" );
		const router = useRouter();
		const { createDocuments } = useData( "reviews" );

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
			const reviewId = await createDocuments([newReview.value]);
			toast({
				"type": "success",
				"title": "Review Cteated"
			});
			router.push({
				"name": "ReviewDetail",
				"params": { "id": reviewId[0] }
			});
		};

		return {
			newReview,
			createReview
		};
	}
};
</script>


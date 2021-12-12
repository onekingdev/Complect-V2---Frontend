<template lang="pug">
documents-container(title="Internal Reviews")
	template(#controls)
		c-button-modal(title="New Review" modalTitle="New Review" type="primary")
			template(#content)
				//- c-field.col-full(label="Template" type="singleselect" :modelValue="templateOptions" @update:modelValue="updateTemplateReview" v-model="newReview.template_id")
				c-field.col-full(label="Review Name" v-model="newReview.title" required)
				c-field.col-3(label="Start Date" type="date" v-model="newReview.starts_at" required)
				c-field.col-3(label="End Date" type="date" v-model="newReview.ends_at" required)
			template(#footer)
				c-button(title="Create" type="primary" @click="createNewReview()")
	template(#content)
		c-banner.banner(title="Key Regulatory Developments 2021" message="New regulatory changes can have an impact on your policies and procedures.")
			template(#controls)
				c-button(title="View" @click="viewPolicy()")
		div.rules
			| Rule 206(4)-7 under the Adviser Act requires that you conduct a review of your compliance program no less than annually. Your last completed internal review was on
			a(href="/") 12/07/2021
		c-table(v-bind="{columns, documents}" :showSortIcon="false")
</template>
<script>
import { reactive } from "vue";
import cBanner from "~/components/Misc/cBanner.vue";
export default {
	"components": { cBanner },
	setup () {
		const newReview = reactive({
			"template_id": "",
			"title": "",
			"starts_at": "",
			"ends_at": ""
		});
		const columns = [
			{
				"title": "Name",
				"key": "name",
				"type": "title",
				"meta": { "link": "ReviewDetail" }
			},
			{
				"title": "Progress",
				"key": "progress",
				"type": "progress"
			},
			{
				"title": "Finding",
				"key": "finding",
				"type": "title"
			},
			{
				"title": "Last Modified",
				"key": "last_modified",
				"type": "date"
			},
			{
				"title": "Date Created",
				"key": "date_created",
				"type": "date"
			},
			{
				"title": "Review Period",
				"key": "review_period",
				"type": "date"
			},
			{
				"title": "End Date",
				"key": "end_date",
				"type": "date"
			}
		];

		const documents = [{
			"_id": "1",
			"name": "Review",
			"progress": {
				"current": 1,
				"max": 2
			},
			"finding": "1",
			"last_modified": new Date().toString(),
			"date_created": new Date().toString(),
			"review_period": new Date().toString(),
			"end_date": new Date().toString()
		}];

		const filters = [];
		const viewPolicy = () => {
			window.open( "https://www.sec.gov/exams" );
		};

		const createNewReview = () => {
			console.log( newReview );
		};

		return {
			columns,
			documents,
			filters,
			newReview,
			viewPolicy,
			createNewReview
		};
	}
};
</script>
<style lang="stylus" scoped>
.banner
	margin-bottom: 1em
.rules
	font-size: 0.9em
	margin-bottom: 0.8em
</style>

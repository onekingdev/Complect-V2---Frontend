<template lang="pug">
documents-container(title="Internal Reviews")
	template(#controls)
		c-button-modal(title="New Review" modalTitle="New Review" type="primary")
			template(#content)
				c-field(label="Review Name" v-model="newReview.title" required)
				c-field.col-3(label="Start Date" type="date" v-model="newReview.startsAt" required)
				c-field.col-3(label="End Date" type="date" v-model="newReview.endsAt" required)
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
		const handleClickEdit = id => console.debug( "Edit", id );
		const handleClickDuplicate = id => console.debug( "Duplicate", id );
		const handleClickDelete = id => console.debug( "Delete", id );

		const newReview = reactive({
			"templateId": "",
			"title": "",
			"startsAt": "",
			"endsAt": ""
		});

		const columns = [
			{
				"title": "Name",
				"key": "name",
				"cell": "CellTitle",
				"meta": { "link": "ReviewDetail" }
			},
			{
				"title": "Progress",
				"key": "progress",
				"cell": "CellProgress"
			},
			{
				"title": "Finding",
				"key": "finding",
				"cell": "CellTitle"
			},
			{
				"title": "Last Modified",
				"key": "lastModified",
				"cell": "CellDate"
			},
			{
				"title": "Date Created",
				"key": "dateCreated",
				"cell": "CellDate"
			},
			{
				"title": "Review Period",
				"key": "reviewPeriod",
				"cell": "CellDate"
			},
			{
				"title": "End Date",
				"key": "endDate",
				"cell": "CellDate"
			},
			{
				"unsortable": true,
				"cell": "CellDropdown",
				"meta": {
					"actions": [
						{ "title": "Edit", "action": handleClickEdit }, { "title": "Duplicate", "action": handleClickDuplicate }, { "title": "Delete", "action": handleClickDelete }
					]
				}
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
			"lastModified": Date.now(),
			"dateCreated": Date.now(),
			"reviewPeriod": Date.now(),
			"endDate": Date.now()
		}];

		const filters = [];
		const viewPolicy = () => {
			window.open( "https://www.sec.gov/exams" );
		};

		const createNewReview = () => {};

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

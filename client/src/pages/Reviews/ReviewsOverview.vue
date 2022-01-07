<template lang="pug">
c-banner(title="Key Regulatory Developments 2021" message="New regulatory changes can have an impact on your policies and procedures.")
	template(#controls)
		c-button(title="View" @click="viewPolicy()")
.rules-block Rule 206(4)-7 under the Adviser Act requires that you conduct a review of your compliance program no less than annually. Your last completed internal review was on
	a(href="/") 12/07/2021
c-table(v-bind="{columns, documents}")
</template>


<script>
import { onMounted, onUnmounted } from "vue";
import useData from "~/store/Data.js";
import cBanner from "~/components/Misc/cBanner.vue";
export default {
	"components": { cBanner },
	setup () {
		const { documents, readDocuments, deleteDocuments, clearStore } = useData( "reviews" );

		const handleClickEdit = id => console.debug( "Edit", id );
		const handleClickDuplicate = id => console.debug( "Duplicate", id );
		const handleClickDelete = id => deleteDocuments( id );

		const columns = [
			{
				"title": "Name",
				"key": "title",
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
				"cell": "CellDefault"
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

		onMounted( () => readDocuments() );
		onUnmounted( () => clearStore() );

		return {
			columns,
			documents
		};
	}
};
</script>


<style lang="stylus" scoped>
.rules-block
	font-size: 0.9em
	margin: 1em 0
</style>

<template lang="pug">
c-banner(title="Key Regulatory Developments 2021" message="New regulatory changes can have an impact on your policies and procedures.")
	template(#controls)
		a(href='https://www.sec.gov/exams' target='_blank')
			c-button(title="View" @click="viewPolicy()")
.rules-block Rule 206(4)-7 under the Adviser Act requires that you conduct a review of your compliance program no less than annually.
c-table(v-bind="{columns, documents}")
</template>


<script>
import { onMounted, onUnmounted, inject } from "vue";
import useData from "~/store/Data.js";
import { useRouter } from "vue-router";
import cBanner from "~/components/Misc/cBanner.vue";
export default {
	"components": { cBanner },
	setup () {
		const { documents, readDocuments, createDocuments, deleteDocuments, clearStore } = useData( "reviews" );
		const router = useRouter();
		const notification = inject( "notification" );

		const handleClickEdit = id => {
			router.push({
				"name": "ReviewDetail",
				"params": { id }
			});
		};

		const handleClickDuplicate = async id => {
			const index = documents.value.findIndex( doc => doc._id === id );
			await createDocuments([documents.value[index]]);
			notification({
				"type": "success",
				"title": "Internal review has been duplicated."
			});
		};

		const handleClickDelete = id => deleteDocuments( id );

		const columns = [
			{
				"title": "Name",
				"key": "title",
				"cell": "CellTitle",
				"width": "25%",
				"meta": { "link": "ReviewDetail" }
			},
			{
				"title": "Progress",
				"key": "progress",
				"cell": "CellProgress",
				"width": "25%"
			},
			{
				"title": "Finding",
				"key": "finding",
				"cell": "CellDefault",
				"align": "right"
			},
			{
				"title": "Last Modified",
				"key": "lastModified",
				"cell": "CellDate",
				"align": "right"
			},
			{
				"title": "Date Created",
				"key": "dateCreated",
				"cell": "CellDate",
				"align": "right"
			},
			{
				"title": "Review Period End Date	",
				"key": "reviewPeriod",
				"cell": "CellDate",
				"align": "right"
			},
			{
				"unsortable": true,
				"cell": "CellDropdown",
				"width": "35px",
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

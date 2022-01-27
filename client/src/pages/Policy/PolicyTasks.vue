<template lang="pug">
card-container(title="Tasks")
	template(#controls)
		c-button(title="New Task" type="primary")
	template(#content)
		c-table(v-bind="{columns, documents}" searchable)
</template>


<script>
import { onMounted, onUnmounted } from "vue";
import useData from "~/store/Data.js";
import cBanner from "~/components/Misc/cBanner.vue";

export default {
	"components": { cBanner },
	setup () {
		const { documents, readDocuments, deleteDocuments, clearStore } = useData( "tasks" );

		const handleClickEdit = id => console.debug( "Edit", id );
		const handleClickDuplicate = id => console.debug( "Duplicate", id );
		const handleClickDelete = id => deleteDocuments( id );

		const columns = [
			{
				"title": "Name",
				"key": "title",
				"cell": "CellTitle",
				"meta": { "link": "RiskDetail" }
			},
			{
				"title": "Assignee",
				"key": "assigned",
				"cell": "CellText",
			},
			{
				"title": "Start Date",
				"key": "startAt",
				"cell": "CellDate",
				"align": "right"
			},
			{
				"title": "Due Date",
				"key": "endAt",
				"cell": "CellDate",
				"align": "right"
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

<template lang="pug">
c-table(v-bind="{columns, documents, filters}")
</template>


<script>
import { onMounted, onUnmounted } from "vue";
import useData from "~/store/Data.js";
export default {
	setup () {
		const { documents, readDocuments, deleteDocuments, clearStore } = useData( "tasks" );

		const handleClickEdit = id => console.debug( "Edit", id );
		const handleClickDelete = id => deleteDocuments( id );

		const columns = [
			{
				"title": "Name",
				"key": "title",
				"cell": "CellTask"
			},
			{
				"title": "Linked",
				"key": "linked",
				"cell": "CellLinked"
			},
			{
				"title": "Assignee",
				"key": "assigned",
				"cell": "CellAssigned"
			},
			{
				"title": "Start Date",
				"key": "startsAt",
				"cell": "CellDate",
				"align": "right"
			},
			{
				"title": "End Date",
				"key": "endsAt",
				"cell": "CellDate",
				"align": "right",
				"meta": { "overdueWarning": true }
			},
			{
				"unsortable": true,
				"cell": "CellDropdown",
				"meta": {
					"actions": [
						{ "title": "Edit", "action": handleClickEdit }, { "title": "Delete", "action": handleClickDelete }
					]
				}
			}
		];

		const filters = [
			{
				"title": "Show:",
				"field": "status",
				"keys": [
					{
						"title": "All Tasks",
						"key": ""
					}, {
						"title": "Completed Tasks",
						"key": "complete"
					}, {
						"title": "Overdue Tasks",
						"key": "overdue"
					}
				]
			}, {
				"title": "Linked:",
				"field": "linked",
				"keys": [
					{
						"title": "All",
						"key": ""
					}, {
						"title": "Projects",
						"key": "project"
					}, {
						"title": "Policies",
						"key": "policy"
					}, {
						"title": "Internal Reviews",
						"key": "review"
					}
				]
			}
		];

		onMounted( () => readDocuments() );
		onUnmounted( () => clearStore() );

		return {
			columns,
			documents,
			filters
		};
	}
};
</script>

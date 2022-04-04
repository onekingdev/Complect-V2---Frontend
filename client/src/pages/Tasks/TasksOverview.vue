<template lang="pug">
c-table(v-bind="{columns, documents, filters}")
</template>


<script>
import { onMounted, onUnmounted } from "vue";
import UseData from "~/store/Data.js";
export default {
	setup () {
		const tasks = new UseData( "tasks" );
		const handleClickEdit = id => console.debug( "Edit", id );
		const handleClickDelete = id => tasks.deleteDocuments( id );

		const columns = [
			{
				"title": "Name",
				"key": "name",
				"cell": "CellTask",
				"unsortable": true
			},
			{
				"title": "Linked",
				"key": "linked",
				"cell": "CellLinked",
				"unsortable": true
			},
			{
				"title": "Assignee",
				"key": "assigned",
				"cell": "CellAssigned",
				"unsortable": true
			},
			{
				"title": "Start Date",
				"key": "startsAt",
				"cell": "CellDate",
				"align": "right",
				"unsortable": true
			},
			{
				"title": "End Date",
				"key": "endsAt",
				"cell": "CellDate",
				"align": "right",
				"unsortable": true,
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

		onMounted( () => tasks.readDocuments() );
		onUnmounted( () => tasks.clearStore() );

		return {
			columns,
			"documents": tasks.getDocuments(),
			filters
		};
	}
};
</script>

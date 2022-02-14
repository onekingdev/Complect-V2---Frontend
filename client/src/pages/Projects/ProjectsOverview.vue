<template lang="pug">
c-table(v-bind="{columns, documents, filters}")
</template>


<script>
import { onMounted, onUnmounted } from "vue";
import UseData from "~/store/Data.js";
export default {
	setup () {
		const projects = new UseData( "projects" );

		const columns = [
			{
				"title": "Name",
				"key": "title",
				"cell": "CellTitle",
				"meta": { "link": "ProjectDetail" }
			},
			{
				"title": "Collaborators",
				"key": "collaborators",
				"cell": "CellCollaborators"
			},
			{
				"title": "Tasks Left",
				"key": "tasks",
				"cell": "CellTasks",
				"align": "right"
			},
			{
				"title": "Cost",
				"key": "fixedBudget",
				"cell": "CellPrice",
				"align": "right"
			},
			{
				"title": "Status",
				"key": "status",
				"cell": "CellStatus",
				"align": "right"
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
			}
		];

		const filters = [{
			"title": "Filter by:",
			"field": "status",
			"keys": [
				{
					"title": "All",
					"key": ""
				},
				{
					"title": "Not Started",
					"key": "notStarted"
				},
				{
					"title": "Draft",
					"key": "draft"
				},
				{
					"title": "In Progress",
					"key": "inprogress"
				},
				{
					"title": "Pending",
					"key": "pending"
				},
				{
					"title": "Complete",
					"key": "complete"
				},
				{
					"title": "Overdue",
					"key": "overdue"
				}
			]
		}];

		onMounted( () => projects.readDocuments() );
		onUnmounted( () => projects.clearStore() );

		return {
			columns,
			"documents": projects.getDocuments(),
			filters
		};
	}
};
</script>

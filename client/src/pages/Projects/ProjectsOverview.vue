<template lang="pug">
c-table(v-bind="{columns, documents, filters}")
</template>


<script>
import { onMounted, onUnmounted } from "vue";
import useData from "~/store/Data.js";
export default {
	setup () {
		const { documents, readDocuments, clearStore } = useData( "projects" );

		const columns = [
			{
				"title": "Name",
				"key": "title",
				"type": "title",
				"meta": { "link": "ProjectDetail" }
			},
			{
				"title": "Collaborators",
				"key": "collaborators",
				"type": "collaborators"
			},
			{
				"title": "Tasks Left",
				"key": "tasks",
				"type": "tasks",
				"align": "right"
			},
			{
				"title": "Cost",
				"key": "fixedBudget",
				"type": "price",
				"align": "right"
			},
			{
				"title": "Status",
				"key": "status",
				"type": "status",
				"align": "right"
			},
			{
				"title": "Start Date",
				"key": "startsAt",
				"type": "date",
				"align": "right"
			},
			{
				"title": "End Date",
				"key": "endsAt",
				"type": "date",
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

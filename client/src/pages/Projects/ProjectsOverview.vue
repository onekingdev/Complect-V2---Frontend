<template lang="pug">
c-table(v-bind="{options, filters, documents}")
</template>


<script>
import { onMounted, onUnmounted } from "vue";
import useData from "~/store/Data.js";
export default {
	setup () {
		const { documents, documentsToStore, clearStore } = useData( "projects" );

		const options = {
			// "searchable": true,
			"columns": [
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
					"key": "fixed_budget",
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
					"key": "starts_at",
					"type": "date",
					"align": "right"
				},
				{
					"title": "End Date",
					"key": "ends_at",
					"type": "date",
					"align": "right",
					"meta": { "overdueWarning": true }
				}
				// "title": "Name",
				// "collaborators": "Collaborators",
				// "tasks": "Tasks Left",
				// "fixed_budget": "Cost",
				// "status": "Status",
				// "starts_at": "Start Date",
				// "ends_at": "End Date"
			]
		};

		const filters = [
			{
				"title": "Filter by:",
				"field": "status",
				"keys": [
					{
						"title": "All",
						"key": ""
					},
					{
						"title": "Not Started",
						"key": "not_started"
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
			}
		];

		onMounted( async () => await documentsToStore() );
		onUnmounted( () => clearStore() );

		return {
			options,
			filters,
			documents
		};
	}
};
</script>

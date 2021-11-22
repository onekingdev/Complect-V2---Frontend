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
			"searchable": true,
			"columns": {
				"title": "Name",
				// "collaborators": "Collaborators",
				// "tasks": "Tasks Left",
				"fixed_budget": "Cost",
				"status": "Status",
				"starts_at": "Start Date",
				"ends_at": "End Date"
			}
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

<template lang="pug">
Table(:options="options" :records="documents")
	//- template(v-slot:controls)
		c-button(title="Filter by: All")
</template>


<script>
import { onMounted, onUnmounted } from "vue";
import useData from "~/store/Data.js";
import Table from "~/components/Table/Table.vue";
export default {
	"components": { Table },
	setup () {
		const options = {
			"columns": {
				"title": "Name",
				"collaborators": "Collaborators",
				"tasks": "Tasks Left",
				"fixed_budget": "Cost",
				"status": "Status",
				"starts_at": "Start Date",
				"ends_at": "End Date"
			}
		};
		const { documents, documentsToStore, clearStore } = useData( "projects" );

		onMounted( async () => await documentsToStore() );
		onUnmounted( () => clearStore() );
		return {
			options,
			documents
		};
	}
};
</script>

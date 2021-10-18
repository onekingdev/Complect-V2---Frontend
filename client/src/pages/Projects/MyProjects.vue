<template lang="pug">
Table(:options="options" :records="records")
	template(v-slot:controls)
		c-button(label="Filter by: All")
</template>

<script>
import { onMounted, onUnmounted } from "vue";
import useData from "~/store/Data.js";
import Table from "~/components/Table/Table.vue";
export default {
	components: { Table },
	setup () {
		const options = {
			columns: {
				title: "Name",
				collaborators: "Collaborators",
				tasks: "Tasks Left",
				fixedBudget: "Cost",
				status: "Status",
				starts: "Start Date",
				ends: "End Date"
			}
		};
		const { records, recordsToStore, cleanStore } = useData( "projects" );
		onMounted( () => recordsToStore() );
		onUnmounted( () => cleanStore() );
		return {
			options,
			records
		};
	}
};
</script>

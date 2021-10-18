<template lang="pug">
general-layout(title="Tasks")
	template(v-slot:controls)
		c-button(label="Download")
		c-button(label="New Task" type="primary")
	template(v-slot:content)
		Table(:options="options" :records="records")
			template(v-slot:controls)
				c-button(label="Filter by: All")
</template>

<script>
import { onMounted, onUnmounted } from "vue";
import useData from "~/store/Data.js";
import GeneralLayout from "~/components/Layouts/General.vue";
import Table from "~/components/Table/Table.vue";
export default {
	components: {
		GeneralLayout,
		Table
	},
	setup () {
		const options = {
			columns: {
				title: "Name",
				location: "Location",
				status: "Status",
				rating: "Rating"
			}
		};
		const { records, recordsToStore, cleanStore } = useData( "tasks" );
		onMounted( () => recordsToStore() );
		onUnmounted( () => cleanStore() );
		return {
			options,
			records
		};
	}
};
</script>

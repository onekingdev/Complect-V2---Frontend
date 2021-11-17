<template lang="pug">
c-card(title="Tasks")
	template(v-slot:controls)
		c-button(title="New Task" type="primary")
	template(v-slot:content)
		c-table(:options="options" :records="documents")
</template>


<script>
import cCard from "~/components/Misc/Card.vue";
import cTable from "~/components/Table/Table.vue";
export default {
	"components": {
		cCard,
		cTable
	},
	setup () {
		const options = {
			"columns": {
				"title": "Name",
				"assignee": "Assignee",
				"starts_at": "Start Date",
				"ends_at": "Due Date"
			}
		};

		const documents = [
		];


		return {
			options,
			documents
		};
	}
};
</script>

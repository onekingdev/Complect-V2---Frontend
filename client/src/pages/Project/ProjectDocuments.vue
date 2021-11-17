<template lang="pug">
c-card(title="Documents")
	template(v-slot:controls)
		c-button(title="Upload" type="primary")
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
				"owner": "Owner",
				"size": "Size",
				"modified": "Last Modified"
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

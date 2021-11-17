<template lang="pug">
general-layout(title="Internal Reviews")
	template(v-slot:controls)
		c-button(title="New Review" type="primary")
	template(v-slot:content)
		//- Table(:options="options" :records="records")
			template(v-slot:controls)
				c-button(title="Filter by: All")
</template>

<script>
import GeneralLayout from "~/components/Layouts/General.vue";
// import Table from "~/components/Table/Table.vue";
export default {
	"components": {
		GeneralLayout
		// table
	}
	// setup () {
	// 	const options = {
	// 		columns: {
	// 			name: "Name",
	// 			progress: "Progress",
	// 			findings: "Findings",
	// 			modified: "Last Modified",
	// 			created: "Date Created",
	// 			review_end: "Review Period End Date"
	// 		}
	// 	};
	// 	const records = {};
	// 	return {
	// 		options,
	// 		records
	// 	};
	// }
};
</script>

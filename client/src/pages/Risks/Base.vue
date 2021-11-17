<template lang="pug">
general-layout(title="Risk Register")
	template(v-slot:controls)
		c-button(title="New Risk" type="primary")
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
	// 			impact: "Impact",
	// 			likelihood: "Likelihood",
	// 			level: "Risk Level",
	// 			created: "Date Created"
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

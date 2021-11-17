<template lang="pug">
general-layout(title="Tasks")
	template(v-slot:controls)
		c-button(title="Download")
		c-button(title="New Task" type="primary")
	//- template(v-slot:content)
		//- Table(:options="options" :records="documents")
			//- template(v-slot:controls)
				c-button(title="Show: All Tasks")
				c-button(title="All Links")

//- Modal
</template>

<script>
// import { onMounted, onUnmounted } from "vue";
// import useData from "~/store/Data.js";
import GeneralLayout from "~/components/Layouts/General.vue";
// import Table from "~/components/Table/Table.vue";
// import Modal from "~/components/Misc/Modal.vue";
export default {
	"components": {
		GeneralLayout
		// table,
		// modal
	}
	// setup () {
	// 	const options = {
	// 		columns: {
	// 			title: "Name",
	// 			linked: "Linked",
	// 			assignee: "Assignee",
	// 			start_at: "Start Date",
	// 			end_at: "Due Date"
	// 		}
	// 	};
	// 	const { documents, documentsToStore, cleanStore } = useData( "tasks" );
	// 	onMounted( () => documentsToStore() );
	// 	onUnmounted( () => cleanStore() );
	// 	return {
	// 		options,
	// 		documents
	// 	};
	// }
};
</script>

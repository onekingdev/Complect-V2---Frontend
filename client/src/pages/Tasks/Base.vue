<template lang="pug">
general-layout(title="Tasks")
	template(v-slot:controls)
		c-button(label="Download")
		c-button(label="New Task" type="primary")
	template(v-slot:content)
		Table(:data="tasks")
			template(v-slot:controls)
				c-button(label="Filter by: All")
</template>

<script>
import GeneralLayout from "~/components/Layouts/General.vue";
import useData from "~/store/Data.js";
import Table from "~/components/Table/Table.vue";
export default {
	components: {
		GeneralLayout,
		Table
	},
	setup () {
		const { tasks } = useData();
		return { tasks };
	}
};
</script>

<template lang="pug">
page-container(title="Tasks")
	template(#controls)
		c-dropdown(title="Download" wide)
			.container.date-range-container
				c-field(label="Start Date" type="date" v-model="dateRange.start")
				c-field(label="End Date" type="date" v-model="dateRange.end")
			.container.butotns-container
				c-button(title="Download All" type="link" @click="downloadAllTasks()")
				c-button(title="Download" @click="downloadTasks()")
		c-button(title="New Task" type="primary" @click="openTaskModal()")
	template(#content)
		router-view
</template>


<script>
import { ref, inject } from "vue";
import cDropdown from "~/components/Inputs/cDropdown.vue";
export default {
	"components": { cDropdown },
	setup () {
		const modal = inject( "modal" );
		const dateRange = ref({
			"start": null,
			"end": null
		});

		const downloadAllTasks = () => console.debug( "downloadAllTasks" );
		const downloadTasks = () => console.debug( "downloadTasks" );
		const openTaskModal = () => modal({ "name": "cModalTask" });

		return { openTaskModal, dateRange, downloadAllTasks, downloadTasks };
	}
};
</script>


<style lang="stylus" scoped>
.container
	display: flex
	justify-content: space-between
	gap: 1em
	padding: 1em
	.c-field
		flex: 1
.date-range-container
	.c-field
		width: 9em
</style>

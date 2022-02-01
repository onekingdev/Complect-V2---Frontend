<template lang="pug">
card-container(title="Constructor")
	template(#content)
		.dropdowns-container
			c-dropdown(label="Label" title="Actions")
				c-button(v-for="button in buttons" :title="button.title" type="transparent" @click="demoAction(button.title)")
			c-dropdown(title="Select:" :selected="selectedFilter" wide)
				c-button(v-for="filter in filters" :title="filter.title" type="transparent" fullwidth @click="selectFilter(filter.title)")
			c-dropdown(iconR="more" type="transparent" wide)
				c-button(v-for="button in buttons" :title="button.title" type="transparent" fullwidth @click="demoAction(button.title)")
		.dropdowns-container
			c-dropdown(title="Download" wide)
				.container.date-range-container
					c-field(label="Start Date" type="date")
					c-field(label="End Date" type="date")
				.container.butotns-container
					c-button(title="Download All" type="link" @click="demoAction('downloadAllTasks')")
					c-button(title="Download" @click="demoAction('downloadTasks')")
		

</template>


<script>
import { ref } from "vue";
import ComponentConstructor from "~/_devmode/misc/ComponentConstructor.vue";
import cDropdown from "~/components/Inputs/cDropdown.vue";
export default {
	components: { ComponentConstructor, cDropdown },
	setup() {
		const buttons = [
			{ title: "Edit" },
			{ title: "Dublicate" },
			{ title: "Delete" },
		]

		const filters = [
			{ title: "A" },
			{ title: "Option" },
			{ title: "Super Long Option" }
		]

		const selectedFilter = ref("All")
		
		const selectFilter = value => selectedFilter.value = value;

		const demoAction = value => console.debug(`Demo Action Fired: ${value}`)

		return { buttons, demoAction, filters, selectedFilter, selectFilter }
	}
};
</script>


<style lang="stylus" scoped>
.dropdowns-container
	display: flex
	gap: 2em
	align-items: flex-end
.container
	display: flex
	justify-content: space-between
	gap: 1em
	// width: 20em
	padding: 1em
	.c-field
		flex: 1
.date-range-container
	.c-field
		width: 9em
</style>
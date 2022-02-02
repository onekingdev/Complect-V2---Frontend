<template lang="pug">
card-container(title="Constructor")
	template(#content)
		component-constructor
			template(#preview)
				c-dropdown(title="Actions")
					c-button(v-for="button in buttons" :title="button.title" type="transparent" fullwidth @click="demoAction(button.title)")
				c-dropdown(title="Show:" :selected="selectedFilter")
					c-button(v-for="filter in filters" :title="filter.title" type="transparent" fullwidth @click="selectFilter(filter.title)")

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
			{ title: "All" },
			{ title: "Draft" },
			{ title: "Completed" },
		]

		const selectedFilter = ref("All")
		
		const selectFilter = value => selectedFilter.value = value;
		const demoAction = value => console.log(value)

		return { buttons, demoAction, filters, selectedFilter, selectFilter }
	}
};
</script>
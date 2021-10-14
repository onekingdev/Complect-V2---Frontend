<template lang="pug">
general-layout(title="Policies and Procedures")
	template(v-slot:controls)
		c-button(label="New Policy" type="primary")
	template(v-slot:tabs)
		router-link(v-for="tab in tabs" :to="{name: tab.name}") {{tab.title}}
	template(v-slot:content)
		router-view
</template>

<script>
import GeneralLayout from "~/components/Layouts/General.vue";
export default {
	components: { GeneralLayout },
	data () {
		return {
			tabs: [{
				name: "Policies",
				title: "Policies"
			}, {
				name: "Policies Archive",
				title: "Archive"
			}, {
				name: "Policies Setup",
				title: "Setup"
			}]
		};
	}
};
</script>

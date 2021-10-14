<template lang="pug">
general-layout(title="Projects")
	template(v-slot:controls)
		c-button(label="Post Job")
		c-button(label="New Project" type="primary")
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
				name: "Projects",
				title: "My Projects"
			}, {
				name: "Contacts",
				title: "Contacts"
			}, {
				name: "Ratings",
				title: "Ratings and Reviews"
			}]
		};
	}
};
</script>

<template lang="pug">
general-layout(title="Inputs" grey)
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
				name: "cButtons",
				title: "Buttons"
			}, {
				name: "cFields",
				title: "Fields"
			}, {
				name: "cExtra",
				title: "Extra"
			}]
		};
	}
};
</script>

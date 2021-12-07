<template lang="pug">
document-container(section="Components" title="Table")
	template(#tabs)
		router-link(v-for="(tab, index) in tabs" :key="index" :to="{name: tab.name}") {{tab.title}}
	template(#content)
		router-view
</template>


<script>
export default {
	data () {
		return {
			tabs: [{
				name: "devTableGeneral",
				title: "General"
			}]
		};
	}
};
</script>

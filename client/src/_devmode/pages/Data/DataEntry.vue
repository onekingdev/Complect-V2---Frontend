<template lang="pug">
page-container(section="Components" title="Data")
	template(#tabs)
		router-link(v-for="(tab, index) in tabs" :key="index" :to="{name: tab.name}") {{tab.title}}
	template(#content)
		router-view
</template>


<script>
export default {
	setup() {
		const tabs = [{
			name: "devDataModel",
			title: "Model"
		}]
		return { tabs }
	}
};
</script>

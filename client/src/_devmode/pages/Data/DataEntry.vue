<template lang="pug">
document-container(section="Components" title="Data")
	template(#tabs)
		router-link(v-for="tab in tabs" :to="{name: tab.name}") {{tab.title}}
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

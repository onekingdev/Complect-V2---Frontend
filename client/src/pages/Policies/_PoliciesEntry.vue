<template lang="pug">
documents-container(title="Policies and Procedures")
	template(#controls)
		c-button(title="New Policy" type="primary")
	template(#tabs)
		router-link(v-for="tab in tabs" :to="{name: tab.name}") {{tab.title}}
	template(#content)
		router-view
</template>


<script>
export default {
	setup () {
		const tabs = [
			{
				"name": "Policies",
				"title": "Policies"
			}, {
				"name": "Policies Archive",
				"title": "Archive"
			}, {
				"name": "Policies Setup",
				"title": "Setup"
			}
		];
		return { tabs };
	}
};
</script>

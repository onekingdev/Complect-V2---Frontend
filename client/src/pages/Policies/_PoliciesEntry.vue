<template lang="pug">
page-container(title="Policies and Procedures")
	template(#controls)
		c-button(title="New Policy" type="primary")
	template(#tabs)
		router-link(v-for="(tab, index) in tabs" :key="index" :to="{name: tab.routeName}") {{tab.title}}
	template(#content)
		router-view
</template>


<script>
export default {
	setup () {
		const tabs = [
			{
				"title": "Policies",
				"routeName": "Policies"
			}, {
				"title": "Archive",
				"routeName": "PoliciesArchive"
			}, {
				"title": "Setup",
				"routeName": "PoliciesSetup"
			}
		];
		return { tabs };
	}
};
</script>

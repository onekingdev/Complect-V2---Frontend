<template lang="pug">
document-container(section="Components" title="Inputs")
	template(#tabs)
		router-link(v-for="tab in tabs" :to="{name: tab.name}") {{tab.title}}
	template(#content)
		router-view
</template>


<script>
export default {
	setup() {
		const tabs = [{
			name: "devInputsButtons",
			title: "Buttons"
		}, {
			name: "devInputsFields",
			title: "Fields"
		}, {
			name: "devInputsExtra",
			title: "Extra"
		}]

		return { tabs }
	}
};
</script>

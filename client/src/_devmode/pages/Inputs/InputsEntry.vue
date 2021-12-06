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
			title: "Button"
		}, {
			name: "devInputsFields",
			title: "Field"
		}, {
			name: "devInputsSelect",
			title: "Select"
		}, {
			name: "devInputsCheckbox",
			title: "Checkbox"
		}, {
			name: "devInputsExtra",
			title: "Extra"
		}]

		return { tabs }
	}
};
</script>

<template lang="pug">
.cell-title
	template(v-if="meta && meta.checkbox")
		c-checkbox(type="round")
	template(v-if="meta && meta.link")
		router-link(:to="{name: meta.link, params: {id: id}}") {{data}}
	template(v-else) {{data}}
</template>


<script>
import cCheckbox from "~/components/Inputs/cCheckbox.vue";
export default {
	"components": { cCheckbox },
	"props": {
		"id": {
			"type": String,
			"required": true
		},
		"data": {
			"type": String,
			"required": true
		},
		"meta": {
			"type": Object,
			"default": () => {}
		},
		"completed": Boolean
	}
};
</script>


<style lang="stylus" scoped>
.cell-title
	max-width: 20em
	.c-checkbox
		margin-right: 0.5em
	a
		overflow: hidden
		text-overflow: ellipsis
		white-space: nowrap
</style>

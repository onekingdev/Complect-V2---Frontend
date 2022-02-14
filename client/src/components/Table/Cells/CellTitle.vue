<template lang="pug">
.cell-title
	c-checkbox(v-if="meta && meta.checkbox" type="round" v-model="isChecked")
	icon(v-if="meta && meta.icon" :name="meta.icon" size="big")
	icon(v-if="meta && meta.expandable && !showSub && controlLength" name="chevron-right" @click="hideShow()")
	icon(v-if="meta && meta.expandable && showSub && controlLength" name="chevron-down" @click="hideShow()")
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
		"hideShow": {
			"type": Function,
			"default": true
		},
		"controlLength": {
			"type": Number,
			"default": 0
		},
		"isChecked": Boolean,
		"showSub": Boolean,
		"completed": Boolean
	}
};
</script>


<style lang="stylus" scoped>
.cell-title
	width: 20em
	.c-checkbox
		margin-right: 0.5em
	svg.icon
		margin-right: 0.5em
		fill: var(--c-text)
	a
		overflow: hidden
		text-overflow: ellipsis
		white-space: nowrap
</style>

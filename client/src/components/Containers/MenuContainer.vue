<template lang="pug">
.page-container(:class="[type]")
	.container-leftmenu
		slot(name="leftmenu")
	.container-content
		slot(name="content")
</template>


<script>
import { defineAsyncComponent } from "vue";
export default {
	"components": { "cBadge": defineAsyncComponent( () => import( "~/components/Misc/cBadge.vue" ) ) },
	"props": {
		"type": {
			"type": String,
			"default": "documents"
		},
		"section": {
			"type": String,
			"default": ""
		},
		"badge": {
			"type": [
				Number, String, Object
			],
			"default": ""
		},
		"title": {
			"type": String,
			"default": ""
		},
		"owner": {
			"type": String,
			"default": ""
		}

	}
};
</script>

<style lang="stylus" scoped>
.page-container
	display: flex
	flex-direction: row
	height: 100%
	min-height: 0
	.container-leftmenu
		width: 25%
		border-right: 1px solid #ddd
		padding: 2rem
		background: var(--c-bg-z2)
		height: fit-content
		min-height: 100%
	.container-content
		width: 75%
		display: flex
		flex-wrap: wrap
		background: var(--c-bg-z2)
.page-container.hide-menu
	.container-leftmenu
		display: none
	.container-content
		width: 100%
</style>

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
		width: 30%
		border-right: 1px solid #ddd
		padding: 2rem
	.container-content
		width: 70%
		display: flex
		flex-wrap: wrap
	// Types
	&.documents
		.container-content
			background: var(--c-bg-z2)

	&.documents
		.container-leftmenu
			background: var(--c-bg-z2)
</style>
	
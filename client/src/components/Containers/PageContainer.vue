<template lang="pug">
.page-container(:class="[type]")
	.container-header
		.container-title
			.page-collection(v-if="section") {{ $locale(section) }}
			.page-name(v-if="title")
				c-badge(v-if="badge" :icon="badge.icon" :title="badge.title")
				.title {{ title }}
			.page-owner(v-if="owner") {{ owner }}
		.container-controls
			.controls
				slot(name="add-controls")
			.controls
				slot(name="controls")
		.container-sections(v-if="$slots['tabs'] || $slots['navigation-controls']")
			.tabs(v-if="$slots['tabs']")
				slot(name="tabs")
			.controls(v-if="$slots['navigation-controls']")
				slot(name="navigation-controls")
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
	flex-direction: column
	height: 100%
	min-height: 0
	.container-header
		flex-shrink: 0
		display: flex
		flex-wrap: wrap
		align-items: flex-end
		justify-content: space-between
		.container-title
			padding: 2em
			flex: 1
			.page-name
				font-size: 1.4em
				display: flex
				align-items: center
				.title
					line-height: 1.3
				.c-badge
					flex: 0 1
					margin-right: 0.5em
					font-size: 0.5em
		.container-controls
			padding: 2em
			.controls
				display: flex
				flex-wrap: wrap
				gap: 1em
				justify-content: flex-end
		.container-sections
			flex-shrink: 0
			width: 100%
			display: flex
			justify-content: space-between
			align-items: center
			.tabs
				flex-shrink: 1
				overflow: scroll
				display: flex
				gap: 2em
				padding: 1em 2em 0
				:deep(a)
					color: #343741
					padding-bottom: 0.7em
					line-height: 1.2
					&:hover
						color: #000
					&.router-link-exact-active
						font-weight: bold
						box-shadow: inset 0 -4px 0 0 var(--c-gold)
			.controls
				padding: 0 2em
				display: flex
				gap: 1em
	.container-content
		flex: 1
		align-content: flex-start
		flex-wrap: wrap
		padding: 1em 2em

	// Types
	&.documents
		.container-content
			background: var(--c-bg-z2)

	&.document
		.container-header
			background: var(--c-bg-z2)
			border-bottom: 1px solid var(--c-border)
			.container-sections
				border-top: 1px solid var(--c-border)
</style>

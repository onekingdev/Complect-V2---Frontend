<template lang="pug">
.document-container
	.container-header
		.container-title
			.document-collection(v-if="section") {{ $locale(section) }}
			.document-name(v-if="title")
				c-badge(v-if="badge" :icon="badge.icon" :title="badge.title")
				.title {{ title }}
			.document-owner(v-if="owner") {{ owner }}
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
import cBadge from "~/components/Misc/cBadge.vue";
export default {
	"components": { cBadge },
	"props": {
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
.document-container
	.container-header
		background: var(--c-bg-z2)
		display: flex
		flex-wrap: wrap
		align-items: flex-end
		justify-content: space-between
		border-bottom: 1px solid var(--c-border)
		.container-title
			padding: 2em
			.document-name
				font-size: 1.4em
				display: flex
				align-items: center
				.c-badge
					margin-right: 0.5em
					font-size: 0.5em
		.container-controls
			padding: 2em
			.controls
				display: flex
				flex-wrap: wrap
				gap: 1em
				justify-content: flex-end
				+ .controls
					margin-top: 2em
		.container-sections
			flex-shrink: 0
			width: 100%
			border-top: 1px solid var(--c-border)

			display: flex
			justify-content: space-between
			align-items: center
			.tabs
				flex-shrink: 1
				overflow: scroll
				background: var(--c-bg-z2)
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
		display: grid
		gap: 1em
		padding: 1em 2em
</style>

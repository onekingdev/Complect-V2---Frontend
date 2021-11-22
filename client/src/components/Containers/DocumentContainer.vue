<template lang="pug">
.document-container
	.container-header
		.container-title
			.document-collection(v-if="section") {{ $locale(section) }}
			.document-name(v-if="title") {{ title }}
			.document-owner(v-if="owner") {{ owner }}
		.container-controls
			.controls
				slot(name="add-controls")
			.controls
				slot(name="controls")
		.container-sections
			.tabs
				slot(name="tabs")
			.controls
				slot(name="navigation-controls")

	.container-content
		slot(name="content")

</template>


<script>
export default {
	"props": {
		"section": {
			"type": String,
			"default": ""
		},
		"title": {
			"type": String,
			"default": "Title"
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
		.container-title
			padding: 2em
			.document-name
				font-size: 1.4em
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
			border-bottom: 1px solid var(--c-border)
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
					color: #555
					padding-bottom: 0.7em
					&.router-link-exact-active
						color: #000
						box-shadow: inset 0 -4px 0 0 #fc0
			.controls
				padding: 0 2em
				display: flex
				gap: 1em

	.container-content
		display: grid
		gap: 1em
		padding: 1em 2em
</style>

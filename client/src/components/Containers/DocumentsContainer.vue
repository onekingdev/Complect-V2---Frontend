<template lang="pug">
.documents-container
	.container-header
		.container-title {{ $locale(title) }}
		.container-controls
			slot(name="controls")
	.container-tabs(v-if="$slots.tabs")
		slot(name="tabs")
	.container-content
		slot(name="content")
</template>


<script>
export default {
	"props": {
		"title": {
			"type": String,
			"default": "Title"
		}
	}
};
</script>


<style lang="stylus" scoped>
.documents-container
	.container-header
		display: flex
		align-items: center
		flex-wrap: wrap
		justify-content: space-between
		padding: 3em 2em
		gap: 2em
		user-select: none
		.container-title
			font-size: 1.6em
			line-height: 1.2
		.container-controls
			flex-shrink: 0
			display: flex
			gap: 1em
	.container-tabs
		width: 100%
		display: flex
		padding: 0 2em
		gap: 2em
		align-items: center
		:deep(a)
			color: #555
			padding-bottom: 0.7em
			&:hover
				color: #000
			&.router-link-exact-active
				color: #000
				box-shadow: inset 0 -4px 0 0 var(--c-gold)
	.container-content
		padding: 2em
		background: var(--c-bg-z2)
		min-height: 100vh
</style>

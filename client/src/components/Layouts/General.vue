<template lang="pug">
.layout.general-layout
	.header
		.title {{ $locale(title) }}
		.controls
			slot(name="controls")
	.tabs
		slot(name="tabs")
	.content(:class="{grey}")
		slot(name="content")
</template>

<script>
export default {
	"props": {
		"title": {
			"type": String,
			"default": "Title"
		},
		"grey": Boolean
	}
};
</script>

<style lang="stylus" scoped>
.layout.general-layout
	.header
		display: flex
		align-items: center
		padding: 2em
		gap: 2em
		.title
			font-size: 1.6em
			line-height: 1.2
		.controls
			flex-shrink: 0
			margin-left: auto
			display: flex
			gap: 1em
	:deep(.tabs)
		display: flex
		gap: 2em
		padding: 1em 2em 0
		a
			color: #555
			padding-bottom: 0.5em
			&.router-link-exact-active
				color: #000
				border-bottom: 4px solid #fc0
	.content
		padding: 2em
		background: var(--c-bg-z2)
		min-height: 100vh
		&.grey
			background: #fcfcfc
</style>

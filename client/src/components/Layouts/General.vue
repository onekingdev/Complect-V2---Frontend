<template lang="pug">
.layout.general-layout
	.header
		.title {{ title }}
		.controls
			slot(name="controls")
	.tabs
		slot(name="tabs")
	.content
		slot(name="content")
</template>

<script>
export default {
	props: {
		title: {
			type: String,
			default: "Title"
		}
	}
};
</script>

<style lang="stylus">
.layout.general-layout
	.header
		display: flex
		align-items: center
		padding: 2em
		.title
			font-size: 1.6em
		.controls
			margin-left: auto
			display: flex
			gap: 1em
	.tabs
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
</style>

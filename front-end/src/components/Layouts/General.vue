<template lang="pug">
.layout.general-layout
	.header
		.title {{ title }}
		.controls
			slot(name="controls")
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

<style lang="stylus" scoped>
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
	.content
		background: var(--c-bg-z2)
</style>

<template lang="pug">
.card
	.header
		.card-title {{ $locale(title) }}
		slot(name="controls")
	.content
		slot(name="content")
	.footer
		slot(name="footer")
</template>

<script>
export default {
	"props": {
		"title": {
			"type": String,
			"required": true
		}
	}
};
</script>

<style lang="stylus" scoped>
.card
	background: var(--c-bg-z2, #fff)
	border: 1px solid var(--c-border)
	border-radius: 0.3em
	.header
		line-height: 1
		padding: 1em
		border-bottom: 1px solid var(--c-border)
		display: flex
		gap: 0.5em
		align-items: center
		font-size: 1em
		.card-title
			font-size: 1.2em
			margin-right: auto
	.content
		padding: 1.5em
</style>

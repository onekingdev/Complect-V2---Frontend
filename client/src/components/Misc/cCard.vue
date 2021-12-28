<template lang="pug">
.c-card
	.c-card-header(v-if="title || $slots['header-controls']")
		.card-title(v-if="title") {{ $locale(title) }}
		slot(v-if="$slots['header-controls']" name="header-controls")
	.c-card-content.grid-6(v-if="$slots.content")
		slot(name="content")
	.c-card-footer(v-if="$slots.footer")
		slot(name="footer")
</template>


<script>
export default {
	"props": {
		"title": {
			"type": String,
			"default": "",
			"required": false
		}
	}
};
</script>


<style lang="stylus" scoped>
.c-card
	background: var(--c-bg-z2, #fff)
	border: 1px solid var(--c-border)
	border-radius: var(--v-border-radius)
	width: 100%
	margin: auto
	.c-card-header
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
	.c-card-content
		padding: 1.5em

	.c-card-footer
		display: flex
		gap: 1em
		justify-content: flex-end
		border-top: 1px solid var(--c-border)
		padding: 1em
</style>

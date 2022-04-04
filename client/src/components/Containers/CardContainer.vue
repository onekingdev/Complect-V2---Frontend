<template lang="pug">
.card-container.card-style
	.card-header(v-if="title || $slots['header'] || $slots['controls']")
		.card-title(v-if="title") {{ $locale(title) }}
		.header-content(v-if="$slots['header']")
			slot(name="header")
		slot(v-if="$slots['controls']" name="controls")
	.card-sub-header.grid-6(v-if="$slots['sub-header']")
		slot(name="sub-header")
	.card-content.grid-6(v-if="$slots.content")
		slot(name="content")
	.card-footer(v-if="$slots.footer")
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
.card-container
	width: 100%
	display: flex
	flex-direction: column
	.card-header
		padding: 1em
		line-height: 1
		display: flex
		gap: 0.5em
		align-items: center
		font-size: 1em
		.card-title, .header-content
			font-size: 1.2em
			margin-right: auto
	.card-content, .card-sub-header, .card-footer
		border-top: 1px solid var(--c-border)
		padding: 1.5em
	.card-footer
		display: flex
		gap: 1em
		justify-content: flex-end
		padding: 1em
</style>

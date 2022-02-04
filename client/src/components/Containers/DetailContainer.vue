<template lang="pug">
.detail-container.card-style
	.card-header(v-if="title || $slots['header'] || $slots['controls']")
		.card-title(v-if="title") {{ $locale(title) }}
		.header-content(v-if="$slots['header']")
			slot(name="header")
		slot(v-if="$slots['controls']" name="controls")
	.card-sub-header(v-if="$slots['sub-header']")
		slot(name="sub-header")
	.card-content(v-if="$slots.content")
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
.detail-container
	padding: 1em 1.5em
	width: 100%
	display: flex
	flex-direction: column
	.card-header
		padding-bottom: 1.25em
		line-height: 1
		display: flex
		gap: 0.5em
		align-items: center
		font-size: 1em
		.card-title, .header-content
			flex: 1
	.card-content, .card-sub-header, .card-footer
		border-top: 0.0625em solid var(--c-border)
	.card-console
		padding: 1.25em 0
	.card-footer
		padding: 1.25em 0
		display: flex
		gap: 1em
		justify-content: space-between
</style>

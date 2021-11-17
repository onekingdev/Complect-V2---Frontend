<template lang="pug">
.banner(:class="type")
	.content
		.title {{ title }}
		.message {{ message }}
	.controls
		slot(name="controls")
</template>

<script>
export default {
	"props": {
		"type": {
			"type": String,
			"default": "info"
		},
		"title": {
			"type": String,
			"default": ""
		},
		"message": {
			"type": String,
			"required": true
		}
	}
};
</script>

<style lang="stylus" scoped>
.banner
	padding: 0.7em 1em
	background: #303132
	border-left: 0.4em solid transparent
	color: #303132
	display: flex
	align-items: center
	gap: 1em
	.content
		min-width: 10em
		max-width: 20em
		line-height: 1.2
		.title
			font-weight: bold
			margin-bottom: 0.5em
		.message
			font-size: 0.9em

	.controls
		margin-left: auto
		display: flex
		gap: 1em
		align-items: center
	&.info
		border-color: var(--c-info)
		background: #ecf4ff
</style>

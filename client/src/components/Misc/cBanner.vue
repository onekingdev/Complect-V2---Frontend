<template lang="pug">
.c-banner(:class="type")
	.c-banner-content
		.title(v-if="title") {{ title }}
		.message {{ message }}
	.c-banner-controls
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
.c-banner
	flex: 1
	padding: 0.7em 1em
	background: #eee
	border-left: 0.4em solid transparent
	color: #303132
	display: flex
	align-items: center
	gap: 1em
	width: 100%
	.c-banner-content
		line-height: 1.2
		.title
			font-weight: bold
			margin-bottom: 0.5em
		.message
			font-size: 0.9em

	.c-banner-controls
		margin-left: auto
		display: flex
		gap: 1em
		align-items: center

	&.info
		border-color: var(--c-info)
		background: #ecf4ff
	&.success
		border-color: var(--c-success)
		background: #d5fbef
	&.warning
		border-color: var(--c-warning)
		background: #fff7e4
	&.error
		border-color: var(--c-error)
		background: #fddee3
</style>

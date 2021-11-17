<template lang="pug">
.toast(v-if="toast" :class="type")
	icon.status(:name="type")
	.content
		.title {{ title || type }}
		.message {{ message }}
	icon.close(name="close")
</template>

<script>
export default {
	"props": {
		"type": {
			"type": String,
			"default": "success"
		},
		"title": {
			"type": String,
			"default": ""
		},
		"message": {
			"type": String,
			"required": true
		}
	},
	data () {
		return { "toast": true };
	}
};
</script>

<style lang="stylus" scoped>
.toast
	position: absolute
	z-index: 10
	top: 0.4em
	right: 0.4em
	padding: 0.7em 1em
	background: #303132
	border-left: 0.4em solid transparent
	color: #fff
	display: flex
	align-items: center
	gap: 1em
	svg.icon
		flex: 1 0 auto
		&.status
			width: 1.5em
			height: 1.5em
		&.close
			width: 0.8em
			height: 0.8em
			align-self: flex-start
			fill: #fff
	.content
		min-width: 10em
		max-width: 20em
		.title
			font-weight: bold
			text-transform: capitalize
		.message
			font-size: 0.9em
	&.info
		border-color: var(--c-info)
	&.success
		border-color: var(--c-success)
	&.warning
		border-color: var(--c-warning)
	&.error
		border-color: var(--c-error)
</style>

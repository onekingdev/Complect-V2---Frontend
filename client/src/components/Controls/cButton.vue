<template lang="pug">
button.c-button(:class="type")
	icon(v-if="icon" :name="icon")
	.label(v-if="label") {{ label }}
</template>

<script>
export default {
	props: {
		icon: {
			type: String,
			default: "",
			required: false
		},
		label: {
			type: String,
			default: "",
			required: false
		},
		type: {
			type: String,
			default: "default",
			required: false
		}
	}
};
</script>

<style lang="stylus" scoped>
button.c-button
	font-size: 0.9em
	border-radius: 0.3em
	transition: background 0.2s ease-in
	padding: 0.7em 1em
	svg.icon
		width: 1.5em
		height: 1.5em
		fill: #222
	.label
		line-height: 1
		font-weight: bold
	&.default
		color: #303132
		background: #fff
		box-shadow: 0 0 0 1px #dadadc
		&:hover
			background: #f3f6f9
	&.primary
		color: #fff
		background: #303132
		&:hover
			background: #2e304f
	&.accent
		color: #000
		background: #ffc900
		&:hover
			background: #ffdc5b
	&.transparent
		color: #000
		background: transparent
		&:hover
			background: #f3f6f9
</style>

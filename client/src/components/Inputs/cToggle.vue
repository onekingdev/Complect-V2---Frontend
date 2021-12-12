<template lang="pug">
label.c-input.c-toggle(:title="tooltip")
	.title(v-if="title") {{title}}
	input(type="checkbox" :checked="modelValue" @change="update")
	.toggle-body
</template>


<script>
export default {
	"props": {
		"title": {
			"type": String,
			"default": ""
		},
		"tooltip": {
			"type": String,
			"default": ""
		},
		"modelValue": Boolean
	},
	"emits": ["update:modelValue"],
	setup ( props, context ) {
		const update = event => context.emit( "update:modelValue", event.target.checked );
		return { update };
	}
};
</script>

<style lang="stylus" scoped>
$toggle_size = 2.1em
$toggle_dot_margin = $toggle_size * 0.03

.c-toggle
	font-size: 1em
	line-height: 1
	display: flex
	align-items: center
	input[type="checkbox"]
		height: 0
		width: 0
		visibility: hidden
		display: none

	.toggle-body
		cursor: pointer
		text-indent: -9999px
		width: $toggle_size
		height: $toggle_size * 0.5
		margin-left: 0.5em
		background: #3d424c
		display: block
		border-radius: $toggle_size * 0.5
		position: relative
		&:after
			content: ''
			position: absolute
			top: $toggle_dot_margin
			left: $toggle_dot_margin
			width: $toggle_size * 0.45
			height: $toggle_size * 0.45
			background: #fff
			border-radius: 50%
			transition: .25s
	input:checked + .toggle-body
		background: var(--c-blue)
		transition: .5s background
	input:checked + .toggle-body:after
		left: 'calc(100% - %s)' % $toggle_dot_margin
		transform: translateX(-100%)
</style>

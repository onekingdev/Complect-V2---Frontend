<template lang="pug">
button.c-button(:class="[type, {fullwidth, disabled}]" :tabindex="disabled ? -1 : 0")
	icon(v-if="icons[0] || icon" :name="icons[0] || icon")
	.title(v-if="title") {{ $locale(title, devmode) }}
	icon(v-if="icons[1]" :name="icons[1]")
</template>

<script>
export default {
	"props": {
		"icon": {
			"type": String,
			"default": "",
			"required": false
		},
		"icons": {
			"type": Array,
			"default": () => [
			],
			"required": false
		},
		"title": {
			"type": String,
			"default": "",
			"required": false
		},
		"type": {
			"type": String,
			"default": "default",
			"required": false
		},
		"disabled": Boolean,
		"fullwidth": Boolean,
		"devmode": Boolean
	}
};
</script>

<style lang="stylus" scoped>
button.c-button
	font-size: 0.9em
	border-radius: var(--v-inputs-border-radius)
	transition: color 0.2s ease-in, background 0.2s ease-in, opacity 0.2s ease-in
	padding: 0.4em 1em
	display: flex
	align-items: center
	justify-content: center
	svg.icon
		width: 1.5em
		height: 1.5em
		fill: #222
		+ .title
			margin-left: 0.7em
	.title
		line-height: 1.5
		font-weight: bold
		+ svg.icon
			margin-left: 0.7em

	&.default
		color: #303132
		background: #fff
		box-shadow: 0 0 0 1px var(--c-border)
		&:hover, &.hovered
			background: #f3f6f9
		&.focused
			background: #f3f6f9
			border: none
			outline: none
			box-shadow: 0 0 0 0.15em #007aff
		&:active, &.active
			background: #dde0e3
		&.disabled
			svg.icon, .title
				opacity: 0.4
	&.primary
		color: #fff
		background: #303132
		&:hover, &.hovered
			background: #2e304f
		&.focused
			background: #2e304f
			box-shadow: 0 0 0 0.15em #007aff
		&:active, &.active
			background: #000
		&.disabled
			background: #a2a3a9
			color: #fff
		svg.icon
			fill: #fff

	&.accent
		color: #000
		background: #ffc900
		&:hover, &.hovered
			background: #ffdc5b
		&.focused
			background: #ffdc5b
			box-shadow: 0 0 0 0.15em #007aff
		&:active, &.active
			background: #ffc900
		&.disabled
			opacity: 0.4

	&.transparent
		color: #000
		background: transparent
		&:hover, &.hovered
			background: #f3f6f9
		&.focused
			background: #f3f6f9
			box-shadow: 0 0 0 0.15em #007aff
		&:active, &.active
			background: #e3ebf2
		&.disabled
			opacity: 0.4

	&.link
		color: var(--c-link)
		svg.icon
			fill: var(--c-link)
		background: transparent
		&:hover, &.hovered
			background: #f3f6f9
		&.focused
			background: #f3f6f9
			box-shadow: 0 0 0 0.15em #007aff
		&:active, &.active
			background: #e3ebf2
		&.disabled
			opacity: 0.4

	&.icon
		background: transparent
		padding: 0.4em
		svg.icon
			fill: #555
			transition: fill 0.2s ease-in
			width: 0.8em
			height: 0.8em
		&:hover, &.hovered
			svg.icon
				fill: #111
		&.disabled
			opacity: 0.4

	&.danger
		color: #fff
		background: var(--c-red)
		svg.icon
			fill: #fff


	&.fullwidth
		width: 100%
	&.disabled
		pointer-events: none
</style>

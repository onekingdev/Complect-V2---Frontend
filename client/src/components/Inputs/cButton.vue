<template lang="pug">
button.c-input.c-button(:class="[type, size, {fullwidth, disabled}]" :tabindex="disabled ? -1 : 0")
	icon(v-if="iconL" :name="iconL")
	.title(v-if="title") {{ $locale(title) }}
	.title(v-if="secondTitle") {{ $locale(secondTitle) }}
	icon(v-if="iconR" :name="iconR")
	template(v-if="modal")
		slot(name="default")
</template>


<script>
export default {
	"props": {
		"iconL": {
			"type": String,
			"default": "",
			"required": false
		},
		"iconR": {
			"type": String,
			"default": "",
			"required": false
		},
		"title": {
			"type": String,
			"default": "",
			"required": false
		},
		"secondTitle": {
			"type": String,
			"default": "",
			"required": false
		},
		"type": {
			"type": String,
			"default": "default",
			"required": false
		},
		"size": {
			"type": String,
			"default": "regular",
			"required": false
		},
		"disabled": Boolean,
		"modal": Boolean,
		"fullwidth": Boolean
	}
};
</script>


<style lang="stylus" scoped>
.c-button
	user-select: none
	font-size: 0.9em
	border-radius: var(--v-inputs-border-radius)
	transition: color 0.2s ease-in, background 0.2s ease-in, opacity 0.2s ease-in
	padding: 0.4em 1em
	display: flex
	align-items: center
	justify-content: center
	position: relative
	svg.icon
		width: 1em
		height: 1em
		fill: #222
		+ .title
			margin-left: 0.7em
	.title
		line-height: 1.3
		font-weight: bold
		+ svg.icon
			margin-left: 0.7em
		+ .title
			margin-left: 0.4em

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
		background: transparent
		svg.icon
			fill: var(--c-link)
		.title
			font-weight: 400
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
		padding: 0.3em
		svg.icon
			fill: #555
			transition: fill 0.2s ease-in
			width: 1em
			height: 1em
		&:hover, &.hovered
			svg.icon
				fill: #111
		&.disabled
			opacity: 0.4


	// Sizes
	&.tiny
		font-size: 0.6em
&.small
		font-size: 0.75em
	&.regular
		font-size: 0.9em
	&.big
		font-size: 1em
	&.huge
		font-size: 1.2em


	&.fullwidth
		width: 100%
		justify-content: center

	&.disabled
		pointer-events: none

</style>

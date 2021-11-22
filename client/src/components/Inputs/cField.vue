<template lang="pug">
label.c-input.c-field(:class="{fullwidth}")
	.field-label(v-if="label") {{ label }}
		span.required(v-if="required") *
	.field-body
		icon(v-if="icon || icons[0]" :name="icon ? icon : icons[0]")
		input.field-input(
			v-if="type !== 'multiple'"
			@input="$emit('update:modelValue', $event.target.value)"
			:value="modelValue"
			:type="type"
			:placeholder="placeholder"
			:required="required"
			:min="min"
			:max="max"
			:step="step"
			:autocomplete="autocomplete"
			:disabled="disabled"
			:tabIndex="tabIndex")
		.field-multisect(v-else)
			.item(v-for="item in modelValue")
				.title {{item}}
				icon(name="close")
		icon(v-if="icons[1]" :name="icons[1]")
		//- icon(v-if="required" name="required")
</template>


<script>
export default {
	"props": {
		"label": {
			"type": String,
			"default": "",
			"required": false
		},
		"placeholder": {
			"type": String,
			"default": "",
			"required": false
		},
		"icon": {
			"type": String,
			"default": "",
			"required": false
		},
		"min": {
			"type": Number,
			"default": 0,
			"required": false
		},
		"max": {
			"type": Number,
			"default": 100,
			"required": false
		},
		"step": {
			"type": Number,
			"default": 1,
			"required": false
		},
		"icons": {
			"type": Array,
			"default": () => [
				false, false
			],
			"required": false
		},
		"type": {
			"type": String,
			"default": () => "text"
		},
		"tabIndex": {
			"type": Number,
			"default": 0
		},
		"modelValue": {
			"type": [
				String, Array, Number
			],
			"required": true
		},
		"multiselect": Boolean,
		"required": Boolean,
		"fullwidth": Boolean,
		"autocomplete": Boolean,
		"disabled": Boolean
	},
	"emits": [
		"update:modelValue"
	]
};
</script>


<style lang="stylus" scoped>
.c-field
	min-width: 8em
	.field-label
		font-size: 0.8em
		margin-bottom: 0.2em
		color: #666
		span.required
			color: var(--c-red)
			line-height: 1
			font-weight: bold
			margin-left: 0.2em
	.field-body
		background: var(--c-bg-z2)
		box-shadow: 0 0 0 1px var(--c-border)
		border-radius: var(--v-inputs-border-radius)
		overflow: hidden
		display: flex
		align-items: center
		gap: 0.3em
		padding: 0.35em 0.5em
		min-height: 1.7em
		svg.icon
			width: 1em
			height: 1em
			fill: #777
			flex-shrink: 0
			&.icon-required
				width: 0.4em
				height: 0.4em
				fill: #777
				margin-left: 0.4em
		.field-input, .field-multisect
			font-size: 0.9em
			flex: 1 0 auto
			display: block
			width: 1em
			color: #000
			background: transparent
			border: none
			outline: none
			line-height: 1.3
			padding: 0
			margin: 0
			&::placeholder
				color: #999
				font-size: 0.9em
		.field-multisect
			display: flex
			gap: 0.4em
			.item
				display: flex
				align-items: center
				font-size: 0.9em
				padding: 0.4em 0.4em
				line-height: 1
				background: var(--c-bg-light-active)
				color: var(--c-link)
				border-radius: var(--v-border-radius)
				svg.icon
					width: 0.6em
					height: 0.6em
					margin-left: 0.8em
					fill: var(--c-link)
	// &:focus-within
	// 	.field-body
	// 		box-shadow: 0 0 0 0.15rem #4499f0
	&.fullwidth
		width: 100%
</style>

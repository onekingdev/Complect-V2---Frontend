<template lang="pug">
label.c-input.c-field(:class="{fullwidth}")
	.field-label(v-if="label") {{ label }}:
		span.required(v-if="required") *

	.field-body
		icon(v-if="iconL || icon" :name="iconL || type")
		component.field-input(
			:is="fieldType"
			:placeholder="placeholder"
			:required="required"
			v-model="modelValue")
		icon(v-if="iconR" :name="iconR")
</template>


<script>
import { computed, defineAsyncComponent } from "vue";
export default {
	"props": {
		"type": {
			"type": String,
			"default": "text"
		},
		"label": {
			"type": String,
			"default": ""
		},
		"placeholder": {
			"type": String,
			"default": ""
		},
		"iconL": {
			"type": String,
			"default": ""
		},
		"iconR": {
			"type": String,
			"default": ""
		},
		"autocomplete": {
			"type": String,
			"default": "off"
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
		"icon": Boolean,
		"multiselect": Boolean,
		"required": Boolean,
		"fullwidth": Boolean,
		"disabled": Boolean
	},
	"emits": [
		"update:modelValue"
	],
	setup ( props ) {
		const fieldType = computed( () => defineAsyncComponent( () => import( `./types/${props.type}.vue` ) ) );
		return { fieldType };
	}
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
		min-height: 2em
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
		.field-input
			font-size: 0.9em
			flex: 1 0 auto
			// display: block
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
	// &:focus-within
	// 	.field-body
	// 		box-shadow: 0 0 0 0.15rem #4499f0
	&.fullwidth
		width: 100%
</style>

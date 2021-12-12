<template lang="pug">
label.c-input.c-checkbox(:class="[type, {checked: isChecked(value)}]")
	input(type="checkbox" :checked="isChecked(value)" @change="updateModelValue(value, $event.target.checked)")
	.checkbox-body
	.title(v-if="label") {{label}}
</template>


<script>
export default {
	"props": {
		"label": {
			"type": String,
			"default": ""
		},
		"type": {
			"type": String,
			"default": "default",
			"required": false
		},
		"value": {
			"type": [
				String, Number
			],
			"default": "",
			"required": false
		},
		"modelValue": {
			"type": [
				Array, Boolean
			],
			"default": []
		},
		"multiple": Boolean,
		"fulldata": Boolean
	},
	"emits": ["update:modelValue"],
	setup ( props, context ) {
		const isChecked = value => props.multiple ? props.modelValue.includes( value ) : props.modelValue;
		const updateModelValue = ( value, checked ) => {
			if ( props.multiple ) {
				const modelValue = [...props.modelValue];
				if ( checked ) modelValue.push( value );
				else modelValue.splice( modelValue.indexOf( value ), 1 );
				context.emit( "update:modelValue", modelValue );
			} else
				context.emit( "update:modelValue", !props.modelValue );
		};
		return {
			isChecked,
			updateModelValue
		};
	}
};
</script>


<style lang="stylus" scoped>
.c-checkbox
	user-select: none
	font-size: 0.9em
	line-height: 1
	display: flex
	align-items: center
	cursor: pointer
	.title
		margin-left: 0.5em
	input[type="checkbox"]
		height: 0
		width: 0
		visibility: hidden
		display: none
	.checkbox-body
		font-size: 1.2em
		cursor: pointer
		width: 1em
		height: 1em
		border: 0.1em solid var(--c-border)
		position: relative
		transition: background var(--fx-duration-short), border-color var(--fx-duration-short)
		&:after
			content: ''
			display: block
			position: absolute
			top: 0.09em
			right: 0.25em
			width: 0.3em
			height: 0.55em
			transform: rotate(45deg)
			border: solid var(--c-border)
			border-width: 0 0.15em 0.15em 0
			transition: border-color var(--fx-duration-short)

	// Types
	&.default
		.checkbox-body
			border-radius: var(--v-inputs-border-radius)
			&:after
				border-color: transparent
		input:checked + .checkbox-body
			background: #1F80C1
			border-color: #1F80C1
			&:after
				border-color: #fff
	&.round
		.checkbox-body
			border-radius: 50%
		input:checked + .checkbox-body
			background: var(--c-success)
			border-color: var(--c-success)
			&:after
				border-color: #fff
	&.toggle
		// $toggle_size = 2em
		// $toggle_dot_margin = $toggle_size * 0.03
		.checkbox-body
			width: 2em
			background: var(--c-border)
			border-radius: 0.5em
			&:after
				top: 0
				left: 0
				width: 0.8em
				height: 0.8em
				background: #fff
				border-radius: 50%
				border: none
				transition: var(--fx-duration-short)
		input:checked + .checkbox-body
			background: #1F80C1
			border-color: #1F80C1
			transition: background var(--fx-duration-short)
		input:checked + .checkbox-body:after
			transform: translateX(120%)
</style>

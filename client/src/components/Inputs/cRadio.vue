<template lang="pug">
.c-input.c-radio
	input(type="radio" :id="labelId" :checked="isChecked()" @change="updateModelValue()")
	label.label(v-if="title" :for="labelId")
		span {{ title }}
</template>
<script>


export default {
	"props": {
		"title": {
			"type": String,
			"required": false,
			"default": ""
		},
		"value": {
			"type": String,
			"required": false,
			"default": ""
		},
		"modelValue": {
			"type": [
				String, Number
			],
			"required": true,
			"default": ""
		}
	},
	"emits": ["update:modelValue"],
	setup ( props, context ) {
		const labelId = `${props.value}-${new Date().getTime()}`;
		const isChecked = () => props.value === props.modelValue;

		const updateModelValue = () => {
			context.emit( "update:modelValue", props.value );
		};

		return {
			labelId,
			isChecked,
			updateModelValue
		};
	}
};
</script>

<style lang="stylus" scoped>
.c-radio
	.label
		margin-left: 0.5em
		color: var(--c-dimmed)
		display: inline-block
		position: relative
		vertical-align: top
		span
			margin-left: 0.5em
			vertical-align: text-top
		&:before
			width: 1.25em
			height: 1.25em
			content: ''
			position: absolute
			top: 0.25em
			left: -1.5em
			display: block
			pointer-events: none
			background-color: var(--c-bg-z2)
			border: #adb5bd solid 1px
			border-radius: 50%
		&:after
			width: 1.25em
			height: 1.25em
			content: ''
			position: absolute
			top: 0.25em
			left: -1.5em
			display: block
			pointer-events: none
			background-color: #fff
			border: #adb5bd solid 1px
			border-radius: 50%
	input
		&:checked
				& ~ .label
						&::after
								background-image none
								background-color black
								padding 2px
								border solid 3px white
								border-radius 50%
								box-shadow 0 0 0 2px black
</style>


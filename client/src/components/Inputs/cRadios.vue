<template lang="pug">
.c-input.c-radios
	label.c-radio(v-for="(option, index) in data" :title="option.tooltip" :key="index" :class="{checked: checked(option)}")
		input(type="radio" :name="`radio_group_${id}`" :checked="checked(option)" @click="update(option)")
		.radio-body
		.title(v-if="option.title") {{option.title}}
</template>


<script>
export default {
	"props": {
		"id": {
			"type": String,
			"required": true
		},
		"data": {
			"type": Array,
			"required": true
		},
		"modelValue": {
			"type": [
				String, Boolean
			],
			"default": false
		}
	},
	"emits": ["update:modelValue"],
	setup ( props, context ) {
		const checked = option => props.modelValue === option.value;
		const update = option => context.emit( "update:modelValue", option.value );
		return {
			checked,
			update
		};
	}
};
</script>


<style lang="stylus" scoped>
.c-radios
	user-select: none
	label.c-radio
		flex: 1 0 0
		display: flex
		align-items: center
		cursor: pointer
		+ label.c-radio
			margin-top: 0.5em
		input[type="radio"]
			height: 0
			width: 0
			visibility: hidden
			display: none
		.radio-body
			flex-shrink: 0
			border-radius: 50%
			width: 1.25em
			height: 1.25em
			box-shadow: inset 0 0 0 0.1em var(--c-border)
			position: relative
			transition: box-shadow 0.15s
			margin-right: 0.5em
		&.checked .radio-body
			box-shadow: inset 0 0 0 0.1em var(--c-border), inset 0 0 0 0.3em #fff, inset 0 0 0 1em #343741
</style>

<template lang="pug">
.input.c-checkers
	label.c-checker(v-for="option in options")
		input(type="checkbox" :checked="isChecked(option)" @change="updateModel(option, $event.target.checked)")
		.box {{ option }}
</template>


<script>
export default {
	"props": {
		"options": {
			"type": Array,
			"required": true
		},
		"modelValue": {
			"type": Array,
			"required": true
		}
	},
	"emits": [
		"update:modelValue"
	],
	setup ( props, context ) {
		const isChecked = option => props.modelValue.includes( option );
		const updateModel = ( option, checked ) => {
			const update = [
				...props.modelValue
			];
			if ( checked ) update.push( option );
			else update.splice( update.indexOf( option ), 1 );
			context.emit( "update:modelValue", update );
		};
		return {
			isChecked,
			updateModel
		};
	}
};
</script>


<style lang="stylus" scoped>
.input.c-checkers
	font-size: 0.9em
	line-height: 1
	display: flex
	flex-wrap: wrap
	align-items: center
	gap: 0.5em
	user-select: none
	label.c-checker
		line-height: 1
		display: block
		cursor: pointer
		flex: 1 0 auto
		input
			height: 0
			width: 0
			visibility: hidden
			display: none
		.box
			background: #fff
			text-align: center
			padding: 0.5em 1em
			color: #1b1c29
			border-radius: var(--v-inputs-border-radius)
			box-shadow: 0 0 0 1px var(--c-border)
			transition: color 0.2s, background 0.2s
			&:hover, &:focus
				background: #f3f6f9
		input:checked + .box
			color: #fff
			background: #1b1c29
</style>

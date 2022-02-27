<template lang="pug">
.c-input.c-radio-card
	label.radio-card(v-for="(option, index) in data" :title="option.tooltip" :key="index")
		input(type="radio" :name="`radio_group_${id}`" :checked="checked(option)" @click="update(option)")
		.option(:class="{ center: alignCenter }")
			icon.title-icon(v-if="option.icon" :name="option.icon")
			.content
				.title(v-if="option.title") {{option.title}}
				icon.image(v-if="option.image" :name="option.image")
				.description(v-if="option.description") {{option.description}}
</template>


<script>
export default {
	"props": {
		"id": {
			"type": String,
			"default": ""
		},
		"data": {
			"type": Array,
			"default": []
		},
		"modelValue": {
			"type": String,
			"default": ""
		},
		"alignCenter": {
			"type": Boolean,
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
.c-radio-card
	display: flex
	gap: 1.5em
	label.radio-card
		flex: 1 0 0
		display: flex
		input
			height: 0
			width: 0
			visibility: hidden
			display: none
		.option
			display: flex
			align-items: flex-start
			gap: 0.7em
			padding: 1em
			border: 1px solid var(--c-border)
			border-radius: var(--v-border-radius)
			transition: background var(--fx-duration-short), border-color var(--fx-duration-short)
			cursor: pointer
			&.center
				text-align: center
				padding: 2.5em 1em
				.title
					font-weight: bold
					margin-bottom: 1em
				svg.icon
					width: 3em
					height: 3em
					margin: 1.2em 0
			svg
				flex-shrink: 0
				width: 1.1em
				height: 1.1em
				fill: var(--c-headers)
			.content
				.title
					color: var(--c-headers)
					line-height: 1
					margin-bottom: 0.3em
				.description
					color: var(--c-dimmed)
					font-size: 0.9em
					line-height: 1.4
			&:hover
				background: #f6f6f8
		input:checked + .option
			border-color: var(--c-headers)
			background: #f6f6f8
			.title
				color: var(--c-headers)
			svg.icon
				fill: var(--c-headers)
</style>

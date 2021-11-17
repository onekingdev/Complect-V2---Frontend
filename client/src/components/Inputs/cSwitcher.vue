<template lang="pug">
.input.c-switcher
	.switcher-label(v-if="label") {{ label }}
	.switchers
		label.switch(v-for="option in options" :title="option.tooltip")
			input(type="radio" :name="`radio_group_${id}`" :checked="checked(option)" @click="update(option)")
			.option
				icon(v-if="option.icons && option.icons[0]" :name="option.icons[0]")
				.title(v-if="option.title") {{option.title}}
				icon(v-if="option.icons && option.icons[1]" :name="option.icons[1]")
</template>


<script>
export default {
	"props": {
		"id": {
			"type": String,
			"default": ""
		},
		"label": {
			"type": String,
			"default": ""
		},
		"options": {
			"type": Array,
			"default": [
			]
		},
		"modelValue": {
			"type": String,
			"default": ""
		}
	},
	"emits": [
		"update:modelValue"
	],
	setup ( props, context ) {
		const checked = option => props.modelValue === option.key;
		const update = option => context.emit( "update:modelValue", option.key );
		return {
			checked,
			update
		};
	}
};
</script>


<style lang="stylus" scoped>

.input.c-switcher
	.switcher-label
		font-size: 0.8em
		margin-bottom: 0.2em
		color: #666
	.switchers
		font-size: 0.9em
		line-height: 1
		display: flex
		overflow: hidden
		border-radius: var(--v-inputs-border-radius)
		border: 1px solid var(--c-border)
		width: max-content
		user-select: none
	.switch
		flex: 1 0 auto
		display: flex
		input
			height: 0
			width: 0
			visibility: hidden
			display: none
		.option
			transition: background .2s, color .2s
			cursor: pointer
			display: flex
			width: 100%
			justify-content: center
			background: #fff
			color: #1b1c29
			padding: 0.5em 0.7em
			svg.icon
				width: 1em
				height: 1em
				fill: #1b1c29
				+ .title
					margin-left: 0.7em
			.title
				text-align: center
				+ svg.icon
					margin-left: 0.7em
		input:checked + .option
			background: #444
			color: #fff
			svg.icon
				fill: #fff
		+ .switch
			border-left: 1px solid var(--c-border)
</style>

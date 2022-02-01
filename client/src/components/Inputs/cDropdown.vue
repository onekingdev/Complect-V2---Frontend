<template lang="pug">
.c-input.c-dropdown(:class="{expanded: listVisible}" @click="toggleListVisibility()" ref="dropdownList")
	c-button(
		:title="title"
		:additionalTitle="selected"
		:type="type"
		:iconR="iconR")
	.dropdown(v-show="listVisible")
		slot(name="default")
</template>


<script>
import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";
export default {
	"props": {
		"title": {
			"type": String,
			"default": "",
			"required": false
		},
		"selected": {
			"type": String,
			"default": "",
			"required": false
		},
		"iconR": {
			"type": String,
			"default": "chevron-down",
			"required": false
		},
		"type": {
			"type": String,
			"default": "default",
			"required": false
		}
	},
	setup () {
		const dropdownList = ref( null );
		const listVisible = ref( false );

		const toggleListVisibility = () => listVisible.value = !listVisible.value;
		onClickOutside( dropdownList, () => listVisible.value = false );

		return {
			dropdownList,
			listVisible,
			toggleListVisibility
		};
	}
};
</script>


<style lang="stylus" scoped>
.c-dropdown
	user-select: none
	position: relative
	:deep(.c-button)
		.title
			font-weight: 400
		svg.icon-chevron-down
			width: 0.7em
			height: 0.7em
			margin-left: 1em
			transition: transform var(--fx-duration-short, .15s)
	.dropdown
		position: absolute
		z-index: 5
		top: calc(100% + 0.05em)
		left: 0
		background: #fff
		width: 100%
		border-radius: 0 0 var(--v-inputs-border-radius) var(--v-inputs-border-radius)
		box-shadow: 0 0 0 1px var(--c-border)
		:deep(.c-button)
			border-radius: 0
			width: 100%
			justify-content: flex-start
			.title
				font-weight: 400
	&.expanded
		.c-button
			border-radius: var(--v-inputs-border-radius) var(--v-inputs-border-radius) 0 0
			:deep(svg.icon-chevron-down)
				transform: rotate(180deg)
</style>

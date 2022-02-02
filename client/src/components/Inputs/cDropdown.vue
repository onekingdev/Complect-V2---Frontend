<template lang="pug">
.c-input.c-dropdown(:class="[{expanded: datalistVisible, fullwidth, wide}, type]" v-bind="{label, required}")
	c-button(
		:title="title"
		:additionalTitle="selected"
		:type="type"
		:iconR="iconR"
		@click="toggleDropdownList()")
	.dropdown(:class="[direction, {hidden: !datalistVisible}]" ref="dropdownList")
		slot(name="default")
</template>


<script>
import { ref, reactive, toRefs } from "vue";
import { onClickOutside } from "@vueuse/core";
import { calcExpandDirections } from "~/core/utils";
import cLabel from "~/components/Misc/cLabel.vue";
export default {
	"components": { cLabel },
	"props": {
		"label": {
			"type": String,
			"default": ""
		},
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
		},
		"fullwidth": Boolean,
		"required": Boolean,
		"wide": Boolean
	},
	setup () {
		const dropdownList = ref( null );
		const params = reactive({
			"datalistVisible": false,
			"direction": [
				"toRight", "toBottom"
			]
		});

		const showDropdownList = () => {
			params.direction = calcExpandDirections( dropdownList.value );
			params.datalistVisible = true;
		};

		const hideDropdownList = () => {
			params.direction = [
				"toRight", "toBottom"
			]; // reset position
			params.datalistVisible = false;
		};

		const toggleDropdownList = () => {
			if ( params.datalistVisible ) hideDropdownList();
			else showDropdownList();
		};

		onClickOutside( dropdownList, () => hideDropdownList() );

		return {
			...toRefs( params ),
			dropdownList,
			showDropdownList,
			toggleDropdownList
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
			overflow: hidden
			text-overflow: ellipsis
			white-space: nowrap
		svg.icon-chevron-down
			width: 0.7em
			height: 0.7em
			margin-left: 1em
			transition: transform var(--fx-duration-short, .15s)
	.dropdown
		position: absolute
		z-index: 5
		background: #fff
		min-width: 100%
		width: 100%
		border-radius: 0 0 var(--v-inputs-border-radius) var(--v-inputs-border-radius)
		box-shadow: 0 0 0 1px var(--c-border)
		&.toTop
			bottom: calc(100% + 0.05em)
		&.toBottom
			top: calc(100% + 0.05em)
		&.hidden
			visibility: hidden
		> :deep(.c-button)
			border-radius: 0
			width: 100%
			justify-content: flex-start
			.title
				font-weight: 400
				text-align: left
				overflow: hidden
				text-overflow: ellipsis
				white-space: nowrap
	&.expanded
		.c-button
			border-radius: var(--v-inputs-border-radius) var(--v-inputs-border-radius) 0 0
			:deep(svg.icon-chevron-down)
				transform: rotate(180deg)
	&.fullwidth
		:deep(.c-button)
			width: 100%
			gap: 0.3em
			svg.icon-chevron-down
				margin-left: auto
	&.wide
		.dropdown
			width: max-content
			&.toRight
				left: 0
				border-radius: 0 var(--v-inputs-border-radius) var(--v-inputs-border-radius) var(--v-inputs-border-radius)
			&.toLeft
				right: 0
				border-radius: var(--v-inputs-border-radius) 0 var(--v-inputs-border-radius) var(--v-inputs-border-radius)


	&.transparent
		.dropdown
			border-radius: var(--v-inputs-border-radius) !important

</style>

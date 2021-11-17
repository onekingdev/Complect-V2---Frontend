<template lang="pug">
section
	components-constructor
		template(v-slot:preview)
			template(v-for="state in buttonsStates")
				.state-label {{state.label}}
				c-button(v-bind="selectedOptions" :class="state.class" devmode)
		template(v-slot:controls)
			c-switcher.col-full(id="button-types" label="Type:" :options="buttonOptions.types" v-model="selectedOptions.type")
			c-select.col-1(label="Left Icon:" :data="icons" v-model="selectedOptions.icons[0]" iconify)
			c-field.col-4(type="text" label="Title:" v-model="selectedOptions.title")
			c-select.col-1(label="Right Icon:" :data="icons" v-model="selectedOptions.icons[1]" iconify)
			c-toggle.col-full(title="Full Width" v-model="buttonOptions.fullwidth")

	.buttons-container
		c-button(v-for="button in buttons" v-bind="button" devmode)
	
</template>

<script>
import { reactive } from "vue"
import ComponentsConstructor from "~/_devmode/misc/ComponentsConstructor.vue"
import cSwitcher from "~/components/Inputs/cSwitcher.vue"
import cToggle from "~/components/Inputs/cToggle.vue"
import cSelect from "~/components/Inputs/cSelect.vue"
import { icons } from "~/_devmode/misc/iconsList.js"
export default {
	components: { ComponentsConstructor, cSwitcher, cToggle, cSelect },
	setup() {
		const buttonsStates = [
			{ label: "Default", class: "" },
			{ label: "Hovered", class: "hovered" },
			{ label: "Focused", class: "focused" },
			{ label: "Active", class: "active" },
			{ label: "Disabled", class: "disabled" },
		]
		const buttons = [
			{ title: "Default button"},
			{ title: "Primary button", type: "primary"},
			{ title: "Accent button", type: "accent"},
			{ title: "Transparent button", type: "transparent"},
			{ title: "Link button", type: "link"},
			{ title: "Button with icon", type: "primary", icon: "components"},
			{ title: "primary", icons: ["components"]},
			{ title: "transparent", icons: ["components"]},
			{ title: "Full width button", fullwidth: true },
		]
		const buttonOptions = {
			types: [
				{title: "Default", key: "default"},
				{title: "Primary", key: "primary"},
				{title: "Accent", key: "accent"},
				{title: "Transparent", key: "transparent"},
				{title: "Link", key: "link"}
			],
			
			width: [
				{title: "Content", value: ""},
				{title: "Full width", value: "full"}
			]
		}
		const selectedOptions = reactive({
			title: "Button",
			type: "default",
			icons: ["components"],
			fullwidth: false
		})
		return { buttons, icons, buttonOptions, buttonsStates, selectedOptions }
	}
};
</script>

<style lang="stylus" scoped>
.buttons-container
	margin-top: 4em
	display: flex
	flex-wrap: wrap
	justify-content: center
	gap: 1.5em
</style>

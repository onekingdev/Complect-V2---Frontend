<template lang="pug">
c-card(title="Constructor")
	template(#content)
		component-constructor
			template(#controls)
				c-switcher(id="button-types" label="Type" :options="options.types" v-model="selectedOptions.type" fullwidth)
				c-switcher(id="button-sizes" label="Size" :options="options.sizes" v-model="selectedOptions.size" fullwidth)
				c-field.col-3(type="text" label="Title" v-model="selectedOptions.title")
				c-field.col-3(type="text" label="Additional Title" v-model="selectedOptions.additionalTitle")
			template(#code)
				code {{code}}
			template(#preview)
				.preview-item(v-for="(state, index) in buttonsStates" :key="index")
					.state-label {{state.label}}:
					c-button(v-bind="selectedOptions" :class="state.class")
			

c-card.buttons-container(title="Collection")
	template(#content)
		c-button(v-for="button in buttons" v-bind="button")
</template>


<script>
import { ref, reactive, computed } from "vue";
import ComponentConstructor from "~/_devmode/misc/ComponentConstructor.vue";
import cSwitcher from "~/components/Inputs/cSwitcher.vue";
import cCheckers from "~/components/Inputs/cCheckers.vue";
import cSelect from "~/components/Inputs/cSelect.vue";
import { icons } from "~/_devmode/misc/iconsList.js";

export default {
	components: { ComponentConstructor, cSwitcher, cCheckers, cSelect },
	setup() {
		
		const buttonsStates = [
			{ label: "Default", class: "" },
			{ label: "Hovered", class: "hovered" },
			{ label: "Focused", class: "focused" },
			{ label: "Active", class: "active" },
			{ label: "Disabled", class: "disabled" },
		]
		
		const buttons = [
			{ title: "Default"},
			{ title: "Primary", type: "primary"},
			{ title: "Accent", type: "accent"},
			{ title: "Transparent", type: "transparent"},
			{ title: "Link", type: "link"},
			{ title: "Icon", type: "primary", iconL: "components"},
			{ title: "Full width button", fullwidth: true },
		]
		
		const options = {
			types: [
				{title: "Default", value: "default"},
				{title: "Primary", value: "primary"},
				{title: "Accent", value: "accent"},
				{title: "Transparent", value: "transparent"},
				{title: "Link", value: "link"}
			],
			sizes: [
				{title: "Tiny", value: "tiny"},
				{title: "Small", value: "small"},
				{title: "Regular", value: "regular"},
				{title: "Big", value: "big"},
				{title: "Huge", value: "huge"}
			]
		}
		
		const selectedOptions = reactive({
			title: "Button",
			additionalTitle: "",
			type: "default",
			size: "regular",
			iconL: "",
			iconR: ""
		})

		const selectedBoolean = ref([])

		const code = computed(() => {
			let title = selectedOptions.title ? `title="${selectedOptions.title}"` : ""
			let additionalTitle = selectedOptions.additionalTitle ? `additionalTitle="${selectedOptions.additionalTitle}"` : ""
			let type = selectedOptions.type !== 'default' ? `type="${selectedOptions.type}"` : ""
			let size = selectedOptions.size !== 'regular' ? `size="${selectedOptions.size}"` : ""
			let iconL = selectedOptions.iconL ? `iconL="${selectedOptions.iconL}"` : ""
			let iconR = selectedOptions.iconL ? `iconR="${selectedOptions.iconR}"` : ""
			let options = selectedBoolean.value.join(" ")
			return `c-button(${title} ${additionalTitle} ${type} ${size} ${iconL} ${iconR} ${options})`
		})

		return { buttons, icons, options, buttonsStates, selectedOptions, selectedBoolean, code }
	}
};
</script>


<style lang="stylus" scoped>
.buttons-container
	:deep(.c-card-content)
		display: flex
		flex-wrap: wrap
		justify-content: center
		gap: 1.5em
</style>

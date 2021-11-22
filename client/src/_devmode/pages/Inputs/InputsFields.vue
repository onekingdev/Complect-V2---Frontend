<template lang="pug">
c-card(title="Constructor")
	template(#content)
		components-constructor
			template(#controls)
				//- c-switcher.col-full(id="fields-types" label="Type:" :options="fieldsOptions.types" v-model="selectedOptions.type")
				
				
				
				c-field.col-full(type="text" label="Input Label:" v-model="selectedOptions.label")
				c-select.col-1(label="Left Icon:" :data="icons" v-model="selectedOptions.icons[0]" iconify)
				c-field.col-4(type="text" label="Placeholder:" v-model="selectedOptions.placeholder")
				c-select.col-1(label="Left Icon:" :data="icons" v-model="selectedOptions.icons[1]" iconify)
				c-toggle.col-full(title="Required" v-model="selectedOptions.required")


			template(#preview)
				template(v-for="state in fieldsStates")
					.state-label {{state.label}}
					c-field(v-bind="selectedOptions" :class="state.class" fullwidth)
			
				
	.fields-container
		c-field(v-for="field in fields" v-bind="field")
</template>


<script>
import { reactive } from "vue"
import cSwitcher from "~/components/Inputs/cSwitcher.vue"
import cSelect from "~/components/Inputs/cSelect.vue"
import cToggle from "~/components/Inputs/cToggle.vue"
import ComponentsConstructor from "~/_devmode/misc/ComponentsConstructor.vue"
import { icons } from "~/_devmode/misc/iconsList.js"

export default {
	components: {
		cSwitcher,
		cSelect,
		cToggle,
		ComponentsConstructor
	},
	setup () {
		const fieldsStates = [
			{ label: "Default", class: "" },
			{ label: "Hovered", class: "hovered" },
			{ label: "Focused", class: "focused" },
			{ label: "Active", class: "active" },
			{ label: "Disabled", class: "disabled" },
		]
		
		const fieldsOptions = {
			types: [
				{title: "Text", value: "text"},
				{title: "Email", value: "email"},
				{title: "Password", value: "password"},
				{title: "Search", value: "search"},
				{title: "Number", value: "number"},
				{title: "URL", value: "url"},
				{title: "Tel", value: "tel"},
				{title: "Date", value: "date"},
				{title: "Time", value: "time"}
			],
			icon: [
				{title: "No icon", value: false},
			],
		}
		const selectedOptions = reactive({
			label: "Input Label:",
			type: "text",
			icons: ["", ""],
			placeholder: "Placeholder",
			required: false,
			fullwidth: true
		})
		const fields = [
			{type: "text", placeholder: "John Smith", label: "Text:", required: true},
			{type: "email", placeholder: "john.smith@email.com", label: "Email:", required: true},
			{type: "password", placeholder: "********", label: "Password:", required: true},
			{type: "search", placeholder: "Search...", label: "Search:"},
			{type: "number", placeholder: "12345", label: "Number:"},
			{type: "url", placeholder: "www.example.com", label: "URL:"},
			{type: "tel", placeholder: "+12 345 678 90", label: "Tel:"},
			{type: "date", placeholder: "", label: "Date:"},
			{type: "time", placeholder: "", label: "Time:"},
			{type: "textarea", placeholder: "", label: "Textarea:"}
		]
		return {
			fieldsStates,
			fieldsOptions,
			selectedOptions,
			fields,
			icons
		};
	}
};
</script>


<style lang="stylus" scoped>
.fields-container
	display: flex
	flex-direction: column
	gap: 0.8em
	margin-top: 2em
</style>

<template lang="pug">
section
	components-constructor
		template(v-slot:preview)
			template(v-for="state in fieldsStates")
				.state-label {{state.label}}
				c-field(v-bind="selectedOptions" :class="state.class" fullwidth)
		template(v-slot:controls)
			label Type:
				select(name="type" v-model="selectedOptions.type")
					option(v-for="option in fieldsOptions.type" :value="option.value") {{option.title}}
			
			c-field(type="text" label="Input Label:" v-model="selectedOptions.label")
			c-field(type="text" label="Placeholder:" v-model="selectedOptions.placeholder")
			label Left Icon:
				select(name="icon" v-model="selectedOptions.icons[0]")
					option(v-for="option in [...fieldsOptions.icon, ...fieldsOptions.type]" :value="option.value") {{option.title}}
			label Right Icon:
				select(name="icon" v-model="selectedOptions.icons[1]")
					option(v-for="option in [...fieldsOptions.icon, ...fieldsOptions.type]" :value="option.value") {{option.title}}
			
			label Required
				input(type="checkbox" v-model="selectedOptions.required")
			
	.fields-container
		c-field(v-for="field in fields" v-bind="field")
</template>

<script>
import { reactive } from "vue"
import ComponentsConstructor from "~/_devmode/misc/ComponentsConstructor.vue"
export default {
	components: {
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
			type: [
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
			icons: [false, false],
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
			fields
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

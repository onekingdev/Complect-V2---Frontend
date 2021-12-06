<template lang="pug">
c-card(title="Constructor" :maxWidth="700")
	template(#content)
		component-constructor
			template(#controls)
				c-switcher.col-full(id="field-types" label="Type" :options="options.types" v-model="selectedOptions.type" fullwidth)
				c-switcher.col-full(id="field-sizes" label="Size" :options="options.sizes" v-model="selectedOptions.size" fullwidth)
				c-field.col-full(type="text" label="Label" v-model="selectedOptions.label")
				//- c-select.col-1(label="Icon" :data="icons" v-model="selectedOptions.iconL")
				c-field.col-6(type="text" label="Placeholder" v-model="selectedOptions.placeholder")
				//- c-select.col-1(label="Icon" :data="icons" v-model="selectedOptions.iconR")
				c-checkers(label="Options" :options="options.boolean" v-model="selectedBoolean")
			template(#code)
				code {{code}}
			template(#preview)
				.preview-item(v-for="state in fieldsStates")
					.state-label {{state.label}}:
					c-field(v-bind="selectedOptions" :class="state.class")
			//- template(#code)
			//- 	code {{code}}

//- c-card(title="Constructor")
	template(#content)
		component-constructor
			template(#controls)
				c-switcher.col-full(id="fields-types" label="Type:" :options="fieldsOptions.types" v-model="selectedOptions.type")
				c-field.col-full(type="text" label="Input Label:" v-model="selectedOptions.label")
				//- c-select.col-1(label="Left Icon:" :data="icons" v-model="selectedOptions.icons[0]" iconify)
				c-field.col-4(type="text" label="Placeholder:" v-model="selectedOptions.placeholder")
				//- c-select.col-1(label="Left Icon:" :data="icons" v-model="selectedOptions.icons[1]" iconify)
				//- c-checkbox.col-full(label="Required" v-model="selectedOptions.required")


			template(#preview)
				template(v-for="state in fieldsStates")
					.state-label {{state.label}}
					c-field(v-bind="selectedOptions" :class="state.class" fullwidth)
			
				
	.fields-container
		c-field(v-for="field in fields" v-bind="field")
</template>


<script>
import { ref, reactive, computed } from "vue"
import cSwitcher from "~/components/Inputs/cSwitcher.vue"
import cCheckers from "~/components/Inputs/cCheckers.vue"
import cSelect from "~/components/Inputs/cSelect.vue"
import ComponentConstructor from "~/_devmode/misc/ComponentConstructor.vue"
import { icons } from "~/_devmode/misc/iconsList.js"

export default {
	components: {
		cSwitcher,
		cCheckers,
		cSelect,
		ComponentConstructor
	},
	setup () {
		const fieldsStates = [
			{ label: "Default", class: "" },
			{ label: "Hovered", class: "hovered" },
			{ label: "Focused", class: "focused" },
			{ label: "Active", class: "active" },
			{ label: "Disabled", class: "disabled" },
		]
		
		const options = {
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
			sizes: [
				{title: "Tiny", value: "tiny"},
				{title: "Small", value: "small"},
				{title: "Regular", value: "regular"},
				{title: "Big", value: "big"},
				{title: "Huge", value: "huge"}
			],
			icon: [
				{title: "No icon", value: false},
			],
			boolean: [
				{title: "Icon", value: "icon"},
				{title: "Required", value: "required"},
				{title: "Fullwidth", value: "fullwidth"}
			]
		}
		const selectedOptions = reactive({
			type: "text",
			label: "Label",
			placeholder: "Placeholder",
			iconL: "",
			iconR: "",
			size: "regular"
		})
		const selectedBoolean = ref(['required'])

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

		const code = computed(() => {
			let type = selectedOptions.type !== 'text' ? `type="${selectedOptions.type}"` : ""
			let label = selectedOptions.label ? `label="${selectedOptions.label}"` : ""
			let placeholder = selectedOptions.placeholder ? `placeholder="${selectedOptions.placeholder}"` : ""
			let size = selectedOptions.size !== 'regular' ? `size="${selectedOptions.size}"` : ""
			let iconL = selectedOptions.iconL ? `iconL="${selectedOptions.iconL}"` : ""
			let iconR = selectedOptions.iconL ? `iconR="${selectedOptions.iconR}"` : ""
			let options = selectedBoolean.value.join(" ")
			return `c-field(${type} ${label} ${placeholder} ${size} ${iconL} ${iconR} ${options})`
		})

		return {
			fieldsStates,
			options,
			selectedOptions,
			selectedBoolean,
			fields,
			icons,
			code
		};
	}
};
</script>


<style lang="stylus" scoped>
.preview-item
	flex: 1 0 100%
.fields-container
	display: flex
	flex-direction: column
	gap: 0.8em
	margin-top: 2em
</style>

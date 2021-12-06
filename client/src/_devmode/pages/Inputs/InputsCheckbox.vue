<template lang="pug">
c-card(title="Constructor" :maxWidth="700")
	template(#content)
		component-constructor
			template(#controls)
				c-switcher.col-full(id="checkbox-types" label="Type" :options="options.types" v-model="selectedOptions.type" fullwidth)
				c-field.col-full(type="text" label="Label" v-model="selectedOptions.label")
			template(#preview)
				.variants
					.variant
						h4 Single value (true/false)
						code.value {{ codeSingle }}
						c-checkbox(:label="selectedOptions.label" :type="selectedOptions.type" v-model="checkedValue")
						code.value checkedValue: {{checkedValue}}
					.variant
						h4 Mutliple values (array)
						code.value
							pre {{ codeArray }}
						c-checkbox(v-for="checkbox in arrayCheckboxes" :label="checkbox.label" :type="selectedOptions.type" :value="checkbox.value" v-model="checkedValues" multiple)
						code.value checkedValues: {{checkedValues}}

c-card.buttons-container(title="Collection" :maxWidth="700")
	template(#content)
		.collection
			c-checkbox(label="Checkbox" v-model="checkedValue")
			c-checkbox(label="Value 1" type="round" v-model="checkedValue")
			c-checkbox(label="Value 2" type="round" v-model="checkedValue")
			c-checkbox(label="Value 3" type="round" v-model="checkedValue")
</template>


<script>
import { ref, reactive, computed } from "vue";
import ComponentConstructor from "~/_devmode/misc/ComponentConstructor.vue";
import cSwitcher from "~/components/Inputs/cSwitcher.vue";
import cCheckers from "~/components/Inputs/cCheckers.vue";
import cSelect from "~/components/Inputs/cSelect.vue";

export default {
	components: { ComponentConstructor, cSwitcher, cCheckers, cSelect },
	setup() {

		const options = {
			types: [
				{title: "Default", value: "default"},
				{title: "Round", value: "round"},
				{title: "Toggle", value: "toggle"},
			]
		}
		
		const selectedOptions = reactive({
			type: "default",
			label: "Checkbox",
		})

		const checkedValue = ref(false)
		const checkedValues = ref([])
		const arrayCheckboxes = [
			{label: "HTML", value: "html"},
			{label: "CSS", value: "css"},
			{label: "Javascript", value: "js"}
		]

		const codeSingle = computed(() => {
			let label = selectedOptions.label ? `label="${selectedOptions.label}"` : ""
			let type = selectedOptions.type !== 'default' ? `type="${selectedOptions.type}"` : ""
			let model = 'v-model="checkedValue"'
			return `c-checkbox(${label} ${type} ${model})`
		})

		const codeArray = computed(() => {
			let type = selectedOptions.type !== 'default' ? `type="${selectedOptions.type}"` : ""
			let model = 'v-model="checkedValues"'
			return `c-checkbox(label="HTML" ${type} value="html" ${model} multiple)\nc-checkbox(label="CSS" ${type} value="css" ${model} multiple)\nc-checkbox(label="Javascript" ${type} value="js" ${model} multiple)`
		})

		return { options, selectedOptions, checkedValue, checkedValues, arrayCheckboxes, codeSingle, codeArray}
	}
};
</script>


<style lang="stylus" scoped>
.variants
	width: 100%
	.variant
		margin-bottom: 3em
		code.value
			margin: 1em auto
			display: block
			width: 100%
			padding: 1em
			line-height: 1.5
			background: #f1f1f1
			border-radius: 0.5em
		.c-checkbox + .c-checkbox
			margin-top: 1em
.collection
	display: flex
	flex-direction: column
	gap: 1em
</style>
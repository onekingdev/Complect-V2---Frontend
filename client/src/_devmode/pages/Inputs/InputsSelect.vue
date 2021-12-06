<template lang="pug">
c-card(title="Constructor" :maxWidth="700")
	template(#content)
		component-constructor
			template(#controls)
				c-field.col-full(type="text" label="Label" v-model="selectedOptions.label")
				c-select.col-1(label="Icon" :data="icons" v-model="selectedOptions.iconL")
				c-field.col-5(type="text" label="Placeholder" v-model="selectedOptions.placeholder")
				c-checkers(label="Options" :options="options.boolean" v-model="selectedBoolean")
			template(#code)
				code {{code}}
			template(#preview)
				c-select(:label="selectedOptions.label" :placeholder="selectedOptions.placeholder" :data="jurisdictions" v-model="selectedJurisdictions" v-bind="selectedBoolean" searchable multiple)
</template>


<script>
import { ref, reactive, computed } from "vue";
import ComponentConstructor from "~/_devmode/misc/ComponentConstructor.vue";
import cSwitcher from "~/components/Inputs/cSwitcher.vue";
import cCheckers from "~/components/Inputs/cCheckers.vue";
import cSelect from "~/components/Inputs/cSelect.vue";
import { jurisdictions } from "~/data/static.js";
import { icons } from "~/_devmode/misc/iconsList.js";

export default {
	components: { ComponentConstructor, cSwitcher, cCheckers, cSelect },
	setup() {
		const options = {
			boolean: [
				{title: "Fullwidth", value: "fullwidth"},
				{title: "Multiselect", value: "multiselect"},
				{title: "Searchable", value: "searchable"}
			]
		}
		
		const selectedOptions = reactive({
			label: "Jurisdictions",
			placeholder: "USA",
			iconL: "",
			size: "regular"
		})
		const selectedBoolean = ref([])

		const selectedJurisdictions = ref([])

		const code = computed(() => {
			let label = selectedOptions.label ? `label="${selectedOptions.label}"` : ""
			let placeholder = selectedOptions.placeholder ? `placeholder="${selectedOptions.placeholder}"` : ""
			let size = selectedOptions.size !== 'regular' ? `size="${selectedOptions.size}"` : ""
			let iconL = selectedOptions.iconL ? `iconL="${selectedOptions.iconL}"` : ""
			let data = ':data="jurisdictions"'
			let model = 'v-model="selectedJurisdictions"'
			let options = selectedBoolean.value.join(" ")
			return `c-select(${label} ${placeholder} ${size} ${iconL} ${data} ${model} ${options})`
		})

		return { icons, options, selectedOptions, selectedBoolean, jurisdictions, selectedJurisdictions, code }
	}
};
</script>

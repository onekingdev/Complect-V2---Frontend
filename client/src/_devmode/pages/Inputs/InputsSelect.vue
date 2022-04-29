<template lang="pug">
card-container(title="Constructor")
	template(#content)
		component-constructor
			template(#preview)
				.variants
					.variant
						c-select(label="Single value" placeholder="Option 1" :data="selectValues" v-model="singleValue" searchable)
						code.value {{ singleValue }}
						code.value c-select(label="Single value" placeholder="Option 1" :data="selectValues" v-model="singleValue" searchable)
					.variant
						c-select(label="Multiple values" placeholder="Option 1" :data="selectValues" v-model="multipleValues" searchable multiple)
						code.value {{ multipleValues }}
						code.value c-select(label="Multiple values" placeholder="Option 1" :data="selectValues" v-model="multipleValues" searchable multiple)
</template>


<script>
import { ref } from "vue";
import ComponentConstructor from "~/_devmode/misc/ComponentConstructor.vue";
import cSelect from "~/components/Inputs/cSelect.vue";
export default {
	components: { ComponentConstructor, cSelect },
	setup() {
		const selectValues = [
			{ title: "Value 1", value: "value-1"},
			{ title: "Value 2", value: "value-2"},
			{ title: "Value 3", value: "value-3"},
			{ title: "Value 4", value: "value-4"},
			{ title: "Value 5", value: "value-5"},
			{ title: "Value 6", value: "value-6"},
			{ title: "Value 7", value: "value-7"},
			{ title: "Value 8", value: "value-8"},
			{ title: "Value 9", value: "value-9"},
			{ title: "Value 10", value: "value-10"},
		]
		const singleValue = ref("value-3")
		const multipleValues = ref([ "value-4", "value-5", "value-8" ])

		return { selectValues, singleValue, multipleValues }
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
</style>

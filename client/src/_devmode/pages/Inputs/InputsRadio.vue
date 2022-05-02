<template lang="pug">
card-container(title="Constructor")
	template(#content)
		component-constructor
			template(#preview)
				c-radios(id="demo" :data="radiosValues" v-model="selectedValue")
</template>


<script>
import { ref } from "vue";
import ComponentConstructor from "~/_devmode/misc/ComponentConstructor.vue";
import cRadios from "~/components/Inputs/cRadios.vue";
export default {
	components: { ComponentConstructor, cRadios },
	setup() {

		const radiosValues = [
			{title: "Option 1", value: "option1"},
			{title: "Option 2", value: "option2"},
			{title: "Option 3", value: "option3"}
		]

		const selectedValue = ref("option1")

		return { radiosValues, selectedValue }
	}
};
</script>
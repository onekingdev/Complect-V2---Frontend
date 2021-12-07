<template lang="pug">
c-card(title="Constructor" :maxWidth="700")
	template(#content)
		component-constructor
			template(#controls)
				c-checkbox(label="Read only" v-model="options.readonly")
				label
					.label Max value:
					input(type="range" min="1" max="10" v-model.number="options.max")
			template(#code)
				code {{code}}
			template(#preview)
				.ratings
					c-rating(:max="options.max" v-model="selectedRating" :readonly="options.readonly")
</template>


<script>
import { ref, reactive, computed } from "vue";
import ComponentConstructor from "~/_devmode/misc/ComponentConstructor.vue";
import cRange from "~/components/Inputs/cRange.vue";
import cRating from "~/components/Inputs/cRating.vue";

export default {
	components: { ComponentConstructor, cRange, cRating },
	setup() {
		const options = reactive({
			max: 5,
			readonly: false
		})
		const selectedRating = ref(4)
		const starsCount = ref(5)
		

		const code = computed(() => {
			let max = options.max !== 5 ? `:max="${options.max}"` : ""
			let vmodel = `v-model="selectedRating"`
			let readOnly = options.readonly ? 'readonly' : ""
			return `c-rating(${max} ${vmodel} ${readOnly})`
		})

		return { options, starsCount, selectedRating, code }
	}
};
</script>


<style lang="stylus" scoped>
.ratings
	display: block
</style>

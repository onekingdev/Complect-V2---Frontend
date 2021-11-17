<template lang="pug">
section
	h3 Switcher
	c-switcher(id="layout" :options="options.switcher" v-model="values.switcher")
section
	h3 Checkers
	c-checkers(:options="options.checkers" v-model="values.checkers")
section
	h3 Select
	p {{values.select}}
	c-select(id="select" v-model="values.select" label="Jurisdictions:" placeholder="Ok" :data="options.select" required)
section
	h3 Rating
	c-rating(:max="5" v-model="values.rating")
	c-rating(:max="5" v-model="values.rating" readonly)
section
	h3 Range
	c-range(:min="1" :max="20" v-model.number="values.range")
section
	h3 Toggle {{values.toggle}}
	c-toggle(title="Toggle" v-model="values.toggle")
</template>

<script>
import { reactive } from "vue";
import cSwitcher from "~/components/Inputs/cSwitcher.vue";
import cRating from "~/components/Inputs/cRating.vue";
import cRange from "~/components/Inputs/cRange.vue";
import cCheckers from "~/components/Inputs/cCheckers.vue";
import cSelect from "~/components/Inputs/cSelect.vue";
import cToggle from "~/components/Inputs/cToggle.vue";
export default {
	components: {
		cSwitcher,
		cRating,
		cRange,
		cCheckers,
		cSelect,
		cToggle
	},
	setup () {
		const values = reactive({
			switcher: "option1",
			rating: 4,
			range: 4,
			checkers: ['aerial'],
			select: [],
			toggle: false
		});
		const options = {
			switcher: [{
				key: "option1",
				icons: ["bell"],
				title: "Option 1",
				tooltip: "Switch to Option 1"
			}, {
				key: "option2",
				icons: ["bell"],
				title: "Option 2",
				tooltip: "Switch to Option 2"
			}, {
				key: "option3",
				icons: ["bell"],
				title: "Option 3",
				tooltip: "Switch to Option 3"
			}],
			checkers: ['html', 'css', 'vue.js', 'react.js', 'aws', 'node.js'],
			select: [
				{ title: "USA", value: "USA" },
				{ title: "England", value: "England" },
				{ title: "Germany", value: "Germany"},
				{ title: "Spain", value: "Spain" }
			]
		};
		return {
			values,
			options
		};
	}
};
</script>

<style lang="stylus" scoped>
section + section
	margin-top: 3em
h3
	margin-bottom: 1em
</style>

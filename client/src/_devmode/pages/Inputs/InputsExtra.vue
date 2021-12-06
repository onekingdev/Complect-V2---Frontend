<template lang="pug">
c-card(title="Rating")
	template(#content)
		section
			code.result {{values.rating}}
			c-rating(:max="5" v-model="values.rating")
			c-rating(:max="5" v-model="values.rating" readonly)

c-card(title="Switcher")
	template(#content)
		section
			code.result {{values.switcher}}
			c-switcher(id="layout" :options="options.checkboxes" v-model="values.switcher")

c-card(title="Checkers")
	template(#content)
		section
			code.result {{values.checkers}}
			c-checkers(:options="options.checkboxes" v-model="values.checkers")

</template>


<script>
import { reactive } from "vue";
import cCheckers from "~/components/Inputs/cCheckers.vue";
import cSwitcher from "~/components/Inputs/cSwitcher.vue";
import cRating from "~/components/Inputs/cRating.vue";
import { jurisdictions } from "~/data/static.js";

export default {
	components: {
		cCheckers,
		cSwitcher,
		cRating
	},
	setup () {
		const values = reactive({
			switcher: "vue.js",
			rating: 4,
			range: 4,
			checkers: ['css', 'aws'],
			select: [],
			toggle: false,
			checkbox: false,
			checkboxes: []
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
			checkboxes: [
				{ title: "HTML", value: "html"},
				{ title: "CSS", value: "css"},
				{ title: "Vue.js", value: "vue.js"},
				{ title: "React.js", value: "react.js"},
				{ title: "AWS", value: "aws"},
				{ title: "Node.js", value: "node.js"}
			],
			select: {jurisdictions}
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
code.result
	padding: 1em
	line-height: 1
	background: #f1f1f1
	border-radius: 0.5em
section
	h3
		margin: 0
	display: flex
	flex-direction: column
	gap: 1em
</style>

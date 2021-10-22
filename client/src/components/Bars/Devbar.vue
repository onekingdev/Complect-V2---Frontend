<template lang="pug">
.bar.devbar
	.databse-controls
		//- label Databse
			//- select(name="database" id="database")
			//- 	option(value="") 4
		c-button(label="Generate" type="primary" @click="generateData()")
	//- pre(v-if="records") {{records}}
	//- label
	//- 	.label Type
	//- 	input(type="radio" value="Business")
	//- 	input(type="radio" value="Employee")
	//- 	input(type="radio" value="Specialist")
</template>

<script>
import useDev from "~/store/Dev.js";
export default {
	setup () {
		const { generateData } = useDev();
		return { generateData };
	}
};
</script>

<style lang="stylus" scoped>
.bar.devbar
	font-size: 1rem
	color: #fff
	padding: 1em
	background: #16171e
	border-top: 1px solid #222
</style>

<template lang="pug">
.bar.devbar
	h1 Devbar
	pre(v-if="records") {{records}}
	//- label
	//- 	.label Type
	//- 	input(type="radio" value="Business")
	//- 	input(type="radio" value="Employee")
	//- 	input(type="radio" value="Specialist")
</template>

<script>
import useDev from "~/store/Dev.js";
import { onMounted } from "vue";
export default {
	setup () {
		const { records, getRecords } = useDev( "projects" );
		onMounted( () => getRecords() );
		return { records };
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

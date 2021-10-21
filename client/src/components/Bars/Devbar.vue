<template lang="pug">
.bar.devbar
	.databse-controls
		label Databse
			select(name="database" id="database")
				option(value="") 4
		c-button(label="Create" type="primary" @click="createDatabse()")
		c-button(label="Update" type="primary" @click="updateDatabse()")
		c-button(label="Drop" type="primary" @click="dropDatabse()")
	//- pre(v-if="records") {{records}}
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
		const { getDatabases, databases, createDatabse, updateDatabse, dropDatabse } = useDev();
		onMounted( () => getDatabases() );
		return {
			databases,
			createDatabse,
			updateDatabse,
			dropDatabse
		};
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

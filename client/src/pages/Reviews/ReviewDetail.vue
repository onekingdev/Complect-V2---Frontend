<template lang="pug">
div.grid-6
	div.categories.col-2
		div.categorie-item
			span.name.active General
			icon.icon(name="check" size="huge")
		div.categorie-item(v-for="category in categories" :key="category.id")
			span.name {{ category.name }}
			icon.icon(name="check" size="huge")
		c-button.mg-t(title="New Category" iconL="circle_plus")
	div.col-4.general
		c-card(title="General")
			template(#content)
				h3.heading Review Period
				div.grid-6
					c-field.col-3(label="Start Date" type="date" v-model="tempData.startsAt")
					c-field.col-3(label="Start Date" type="date" v-model="tempData.endsAt")
				hr
				h3.heading Material Business Changes
				p.paragraph List any changes to your business processes, key vendors, and/or key employees during the Review Period
				c-field.col-full(label="" type="textarea" cols="50")
				hr
				h3.heading Material Regulatory Changes
				p.paragraph List any regulatory changes that impacted you during the Review Period and how the business responded.
				div.regulator-changes
					div.regulator-changes-item.grid-6(v-for="(item, index) in regulatories" :key="index")
						c-field.col-3.padding-right(label="Change" type="textarea" placeholder="Describe the change")
						c-field.col-3.padding-right(label="Response" type="textarea" placeholder="Describe the response")
						c-button.removeRegulatory(type="icon" iconL="close" size="small")
				c-button.mg-t(title="New Entry" iconL="circle_plus" @click="addRegulatoryChange")
				hr
				h3.heading Key Employees Interviewed
				p.paragraph
					|	Regulators interview employees to uncover potential discrepancies in a firm's policies and procedures
					| and their day-to-day practicies. It's important to interview those employees responsible for certain
					| key tasks or have access to sensitive client in order to hear about their day-to-day activities in their own words.
				div.employees
					div.employees-item.grid-6(v-for="(item, index) in employees" :key="index")
						c-field.col-2.padding-right(label="Employee Name" type="text" placeholder="Enter Name")
						c-field.col-2.padding-right(label="Title/Role" type="text" placeholder="Enter Title")
						c-field.col-2.padding-right(label="Department" type="text" placeholder="Enter Department")
						c-button.col-1.removeEmployee(type="icon" iconL="close" size="small")
				c-button.mg-t(title="New Entry" iconL="circle_plus" @click="addNewEmployee")
			template(#footer)
				c-button(title="Save")
				c-button(title="Mark as Complete" type="primary")
</template>
<script>
import { reactive } from "@vue/reactivity";
import cDropdown from "~/components/Inputs/cDropdown.vue";
export default {
	"components": { cDropdown },
	setup () {
		const categories = reactive([{
			"id": "_axxxx",
			"name": "Category One"
		}]);

		const newRegulatory = {
			"change": "",
			"response": ""
		};

		const tempData = reactive({
			"startsAt": Date.now(),
			"endsAt": Date.now()
		});

		const regulatories = reactive([]);

		const addRegulatoryChange = () => {
			regulatories.push( newRegulatory );
		};

		const newEmployee = {
			"name": "",
			"title": "",
			"department": ""
		};

		const employees = reactive([]);
		const addNewEmployee = () => {
			employees.push( newEmployee );
		};

		return {
			categories,
			regulatories,
			employees,
			tempData,
			addRegulatoryChange,
			addNewEmployee
		};
	}
};
</script>
<style lang="stylus" scoped>
hr
	background: #DCDEE4
	color: #DCDEE4
	border-width: 0
	height: 1px
	margin-top: 1.5em
.mg-t
	margin-top: 1em
.heading
	font-weight: bold
	font-size: 1.2em
.general
	margin-left: 7em
.categories
	margin-top: 1em
	.categorie-item
		margin-bottom: 1em
		position: relative
		.name
			&.active
				color: #2180C2
		.icon
			position: absolute
			right: -7em
.paragraph
	font-size: 0.9em
	margin-bottom: 0.5em
.padding-right
	padding-right: 2em
.regulator-changes-item
	position: relative
	margin-bottom: 1em
	.removeRegulatory
		position: absolute
		right: 0
		top: 3em
.employees-item
	position: relative
	margin-bottom: 0.8em
	.removeEmployee
		position: absolute
		right: 0
		top: 2.3em
</style>

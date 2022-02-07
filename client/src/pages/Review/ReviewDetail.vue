<template lang="pug">
vertical-detail
	template(#list)
		.category
			.title General
			icon.icon-r(name="check")
		.category(v-for="(category, index) in categories" :key="index" @click="selectCategory(category.id)")
			.title {{ category.title }}
			icon.icon-r(name="check")
		c-button.new-category(title="New Category" iconL="circle_plus" @click="toggleCategory()")
		c-field(type="text" fullwidth @blur="toggleCategory()")
	template(#content)
		detail-container.detail-container(v-if="isGeneral" title="General")
			template(#content)
				.sub-item-container
					.sub-title Review Period
					.date-range-container
						c-field(label="Start Date" type="date" v-model="dateRange.start"	fullwidth)
						c-field(label="End Date" type="date" v-model="dateRange.end" fullwidth)
				.sub-item-container
					.sub-title Material Business Changes
					p List any changes to your business processes, key vendors, and/or key employees during the Review Period
					c-textarea(label="")
				.sub-item-container
					.sub-title Material Regulatory Changes
					p List any regulatory changes that impacted you during the Review Period and how the business responded.
					//- .regulatory-entry(v-for="(regulatory, index) in regulatories" :key="index")
					.regulatory-entry
						c-textarea(label="Change" placeholder="Describe the change")
						c-textarea(label="Response" placeholder="Describe the response")
						icon.icon-r(name="close")
					c-button(title="Add Entry" iconL="circle_plus")
				.sub-item-container
					.sub-title Key Employees Interviewed
					p Regulators interview employees to uncover potential discrepancies in a firm's policies and procedures and their day-to-day practicies. It's important to interview those employees responsible for certain key tasks or have access to sensitive client in order to hear about their day-to-day activities in their own words.
					.employee-label
						.label Employee Name
						.label Title/Role
						.label Department
						.empty
					.employee-entry
						c-field(type="text" placeholder="Enter Name" fullwidth)
						c-field(type="text" placeholder="Enter Title" fullwidth)
						c-field(type="text" placeholder="Enter Department" fullwidth)
						icon.icon-r(name="close")
					c-button(title="Add Entry" iconL="circle_plus")
			template(#footer)
				c-button(title="Save")
				c-button(title="Mark as Complete" type="primary")
		router-view
</template>


<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import useData from "~/store/Data.js";
import VerticalDetail from "~/components/Containers/VerticalDetail.vue";
export default {
	"components": { VerticalDetail },
	setup () {
		const { document } = useData( "reviews" );
		const isGeneral = true;
		const router = useRouter();

		const categories = [{
			"id": 1,
			"title": "General",
			"sections": []
		}];

		const dateRange = ref({
			"start": null,
			"end": null
		});

		const selectCategory = (id) => {
			router.push({
				"name": "ReviewCategory",
				"params": { catId: id }
			});
		};
		const addCategory = () => console.debug( "Add new Category" );
		const toggleCategory = () => console.log( "Toggle Category" );

		return {
			document,
			categories,
			dateRange,
			isGeneral,
			selectCategory,
			toggleCategory
		};
	}
};
</script>

<style lang="stylus" scoped>
.category
	display: flex
	cursor: pointer
	align-items: center
	justify-content: space-between
	margin-bottom: 1em
	.icon
		font-size: 1.25em
		fill: #cecfd2
.sub-item-container
	border-bottom: 1px solid #dcdee4
	padding: 1.25em 0
	p
		margin-bottom: 1em
		font-size: 0.875
	.sub-title
		margin-bottom: 0.675em
		font-size: 1.25
		font-weight: bold
	.date-range-container
		display: flex
		margin-right: -1em
		margin-left: -1em
		.c-field
			position: relative
			width: 100%
			padding-right: 1em
			padding-left: 1em
	.regulatory-entry
		display: flex
		gap: 2em
		.icon
			top: 3.125em
			position: relative
			font-size: 0.75em
	.employee-label, .employee-entry
		display: flex
		gap: 1.5em
	.employee-label
		margin-bottom: 0.5em
		.label
			flex: 1
			font-size: 0.875em
			color: #797b7e
		.empty
			width: 0.875em
	.employee-entry
		align-items: center
		margin-bottom: 1em
		.icon
			font-size: 0.875em
	.c-button
		margin-top: 1em

</style>



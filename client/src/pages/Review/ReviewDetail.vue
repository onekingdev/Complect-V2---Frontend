<template lang="pug">
vertical-detail
	template(#list)
		.category
			.title General
			icon.icon-r(name="check")
		.category(v-for="(category, index) in categories" :key="index")
			router-link(:to="{name: 'ReviewCategory', params: {catId: category.id}}")
				.title {{ category.title }}
				icon.icon-r(name="check")
		c-button.new-category(title="New Category" iconL="circle_plus" @click="toggleCategory()")
		c-field(type="text" fullwidth @click="toggleCategory()")
	template(#content)
		detail-container.detail-container(title="General")
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
					c-button(title="New Entry" iconL="circle_plus")
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
					c-button(title="New Entry" iconL="circle_plus")
			template(#footer)
				c-button(title="Save")
				c-button(title="Mark as Complete" type="primary")
		//- router-view
</template>


<script>
import { ref } from "vue";
import useData from "~/store/Data.js";
import VerticalDetail from "~/components/Containers/VerticalDetail.vue";
export default {
	"components": { VerticalDetail },
	setup () {
		const { document } = useData( "reviews" );

		const categories = [{
			"id": 1,
			"title": "General",
			"sections": []
		}];

		const dateRange = ref({
			"start": null,
			"end": null
		});

		const addCategory = () => console.debug( "Add new Category" );
		const toggleCategory = () => consoloe.log( "Toggle Category" );
		return {
			document,
			categories,
			dateRange,
			addCategory
		};
	}
};
</script>

<style lang="stylus" scoped>
.new-category
	width: 50%
.category
	display: flex
	cursor: pointer
	align-items: center
	justify-content: space-between
	margin-bottom: 16px
	.router-link
		.icon
			font-size: 20px
			fill: #cecfd2

.detail-container
	padding: 20px 30px
	.sub-item-container
		border-bottom: 1px solid #dcdee4
		padding: 20px 0
		p
			margin-bottom: 16px
			font-size: 14px
		.sub-title
			margin-bottom: 10px
			font-size: 20px
			font-weight: bold
		.date-range-container
			display: flex
			margin-right: -15px
			margin-left: -15px
			.c-field
				position: relative
				width: 100%
				padding-right: 15px
				padding-left: 15px
		.regulatory-entry
			display: flex
			gap: 2em
			.icon
				top: 50px
				position: relative
				font-size: 12px
		.employee-label, .employee-entry
			display: flex
			gap: 1.5em
		.employee-label
			margin-bottom: 8px
			.label
				flex: 1
				font-size: 14px
				color: #797b7e
			.empty
				width: 15px
		.employee-entry
			align-items: center
			margin-bottom: 16px
			.icon
				font-size: 15px
		.c-button
			margin-top: 16px

</style>



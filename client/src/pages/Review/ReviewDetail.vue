<template lang="pug">
vertical-detail
	template(#list)
		.category(@click="selectGeneral()")
			.title(:class="{ active: state.isGeneral }") General
			icon.icon-r(name="check" v-if="!document.completedAt")
			icon.icon-r(name="success" v-else)
		.category(v-for="(category, index) in document.categories" :key="index" @click="selectCategory(index)")
			.title(:class="{ active: index == state.catId && !state.isGeneral }") {{ category.title }}
			icon.icon-r(name="check" v-if="!category.completedAt")
			icon.icon-r(name="success" v-else)
		c-button.new-category(v-if="state.isButton" title="New Category" iconL="circle_plus" @click="toggleCategory()")
		c-field(v-else type="text" @change="createCategory()" v-model="state.categoryName" fullwidth wide)
	template(#content)
		detail-container.detail-container(v-if="state.isGeneral" title="General")
			template(#content)
				.sub-item-container
					.sub-title Review Period
					.date-range-container
						c-field(label="Start Date" type="date" v-model="document.startsAt" fullwidth)
						c-field(label="End Date" type="date" v-model="document.endsAt" fullwidth)
				.sub-item-container
					.sub-title Material Business Changes
					p List any changes to your business processes, key vendors, and/or key employees during the Review Period
					c-textarea(label="" v-model="document.businessChanges")
				.sub-item-container
					.sub-title Material Regulatory Changes
					p List any regulatory changes that impacted you during the Review Period and how the business responded.
					.regulatory-entry(v-for="(regulatoryChange, i) in document.regulatoryChanges" :key="i")
						c-textarea(label="Change" placeholder="Describe the change" v-model="regulatoryChange.change")
						c-textarea(label="Response" placeholder="Describe the response" v-model="regulatoryChange.response")
						icon.icon-r(name="close" @click="deleteRegulatoryChange(document.regulatoryChanges, i)")
					c-button(title="Add Entry" iconL="circle_plus" @click="addRegulatoryChange()")
				.sub-item-container
					.sub-title Key Employees Interviewed
					p
						| Regulators interview employees to uncover potential discrepancies in a firm's policies and procedures and their day-to-day practicies.
						| It's important to interview those employees responsible for certain key tasks or have access to sensitive client in order to hear about their
						| day-to-day activities in their own words.
					.employee-label
						.label Employee Name
						.label Title/Role
						.label Department
						.empty
					.employee-entry(v-for="(interviewItem, index) in document.employeesInterviewed" :key="index")
						c-field(type="text" placeholder="Enter Name" v-model="interviewItem.name" fullwidth)
						c-field(type="text" placeholder="Enter Title" v-model="interviewItem.role" fullwidth)
						c-field(type="text" placeholder="Enter Department" v-model="interviewItem.department" fullwidth)
						icon.icon-r(name="close" @click="deleteEmployeesInterviewed(document.employeesInterviewed, j)")
					c-button(title="Add Entry" iconL="circle_plus" @click="addEmployeesInterviewed()")
			template(#footer)
				c-button(title="Save" @click="updateReview()")
				c-button(:title="btnTitle" type="primary" @click="completeReview()")
		router-view(v-else v-model:reviewCategory="reviewCategory")
</template>


<script>
import { ref, computed, inject } from "vue";
import { useRouter } from "vue-router";
import useData from "~/store/Data.js";
import VerticalDetail from "~/components/Containers/VerticalDetail.vue";
export default {
	"components": { VerticalDetail },
	setup () {
		const { document, updateDocument } = useData( "reviews" );
		const notification = inject( "notification" );
		const router = useRouter();
		const reviewCategory = ref({});

		const state = ref({
			"isGeneral": true,
			"isButton": true,
			"categoryName": "",
			"catId": null
		});

		const btnTitle = computed( () => document.value.completedAt ? "Mark as Incomplete" : "Mark as Complete" );

		const selectGeneral = () => {
			state.value.isGeneral = true;
			router.push({
				"name": "ReviewDetail",
				"params": { "id": document.value._id }
			});
		};

		const selectCategory = id => {
			state.value.isGeneral = false;
			state.value.catId = id;
			reviewCategory.value = document.value.categories[id];
			router.push({
				"name": "ReviewCategory",
				"params": { "catId": id }
			});
		};

		const updateReview = async () => {
			try {
				await updateDocument( document.value._id, document.value );
				notification({
					"type": "success",
					"title": "Success",
					"message": "Internal review has been saved"
				});
			} catch ( error ) {
				console.error( error );
				notification({
					"type": "error",
					"title": "Error",
					"message": "Internal review has not been saved. Please try again."
				});
			}
		};

		const completeReview = async () => {
			const timestamp = document.value.completedAt ? null : Date.now();
			try {
				await updateDocument( document.value._id, { "completedAt": timestamp });
				notification({
					"type": "success",
					"title": "Success",
					"message": `Review has been marked as ${timestamp ? "complete" : "incomplete"}.`
				});
			} catch ( error ) {
				console.error( error );
				notification({
					"type": "error",
					"title": "Error",
					"message": `Review has not been marked as ${timestamp ? "complete" : "incomplete"}. Please try again.`
				});
			}
		};

		const addRegulatoryChange = () => document.value.regulatoryChanges.push({ "change": "", "response": "" });

		const addEmployeesInterviewed = () => document.value.employeesInterviewed.push({ "name": "", "role": "", "department": "" });

		const deleteRegulatoryChange = ( regulatoryChange, index ) => regulatoryChange.splice( index, 1 );

		const deleteEmployeesInterviewed = ( employeesInterviewed, index ) => employeesInterviewed.splice( index, 1 );

		const toggleCategory = () => state.value.isButton = !state.value.isButton;

		const createCategory = async () => {
			state.value.isButton = !state.value.isButton;
			state.value.categoryName = "";
			document.value.categories.push({ "title": state.value.categoryName, "content": [], "completedAt": null });
			try {
				await updateDocument( document.value._id, document.value );
				notification({
					"type": "success",
					"title": "Success",
					"message": "Category has been added."
				});
			} catch ( error ) {
				console.error( error );
				notification({
					"type": "error",
					"title": "Error",
					"message": "Category has not been added. Please try again."
				});
			}
		};

		return {
			document,
			state,
			reviewCategory,
			createCategory,
			selectGeneral,
			addRegulatoryChange,
			addEmployeesInterviewed,
			updateReview,
			completeReview,
			deleteRegulatoryChange,
			deleteEmployeesInterviewed,
			selectCategory,
			btnTitle,
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
	margin-bottom: 1.25em
	.title
		display: inline-block
		-webkit-line-clamp: 1
		-webkit-box-orient: vertical
		overflow: hidden
		text-overflow: ellipsis
		font-size: 1em
		font-weight: 300
		color: #a2a3a9
		&:hover
			color: #2180c2
		&.active
			font-weight: 600
			color: #2180c2
	.icon
		font-size: 1.25em
		fill: #cecfd2
		&.active
			fill: #1ab27f
.sub-item-container
	border-bottom: 1px solid #dcdee4
	padding: 1.25em 0
	p
		margin-bottom: 1.14286em
		font-size: 0.875em
	.sub-title
		margin-bottom: 0.5em
		font-size: 1.25em
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
			top: 4.425	em
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
			font-size: 0.75em
	.c-button
		margin-top: 1em

</style>



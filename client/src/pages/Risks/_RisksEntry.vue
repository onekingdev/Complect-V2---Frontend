<template lang="pug">
div.risk-container
	div.risk-container-header.clearfix
		div.left.float-left
			h1 Risk Register
			span.risk-name
				c-label(:title="risk.level" iconName="triangle" type="low")
				span {{ risk.name }}
		div.float-right
			c-dropdown(title="Actions")
				c-button(title="Delete")
	div.risk-container-content
		c-card(title="Risk Details")
			template(#header-controls)
				c-button(title="Edit" type="primary" @click="showEditRiskModal")
				risk-modal(title="Edit Risk" :isModalVisible="isShowEditRiskModal" @updateVisibleModal="updateVisibleModal")
			template(#content)
				definition-list(:data="riskProperties")
		c-card.controls(title="Controls")
			template(#header-controls)
				c-button-modal.risk-controls-modal(title="New Control" modalTitle="Select Control" type="primary" :largeWidth="true" :displayBlock="true")
					template(#content)
						c-card
							template(#content)
								c-table(:columns="columnsPoliciesModal" :documents="policies" :showSortIcon="false")
					template(#left-footer)
						div.count-selected 1 Items Selected
					template(#footer)
						c-button(title="Add" type="primary")
			template(#content)
				c-table(v-bind="{columns, documents}")
</template>
<script>
import { reactive, ref } from "@vue/reactivity";
import cDropdown from "~/components/Inputs/cDropdown.vue";
import cLabel from "~/components/Misc/cLabel.vue";
import RiskModal from "~/pages/Risks/components/RiskModal.vue";
import DefinitionList from "~/components/Misc/DefinitionList.vue";
export default {
	"components": {
		cDropdown,
		cLabel,
		RiskModal,
		DefinitionList
	},
	setup () {
		const risk = reactive({
			"name": "Hello",
			"level": "Low",
			"likelihood": "Medium"
		});

		const isShowEditRiskModal = ref( false );

		const riskProperties = {
			"Title": "Hello",
			"Impact": "Low",
			"Likelihood": "Medium"
		};

		const columns = [
			{
				"title": "Policy",
				"key": "name",
				"type": "policy"
			}, {
				"title": "Status",
				"key": "status",
				"type": "status"
			}, {
				"title": "Last Modiied",
				"key": "updated_at",
				"type": "date"
			}, {
				"title": "Date Created",
				"key": "created_at",
				"type": "date"
			}
		];

		const columnsPoliciesModal = [
			{
				"title": "Policy",
				"key": "completed",
				"type": "checkbox"
			},
			{
				"title": "",
				"key": "name",
				"type": "policy"
			},
			{
				"title": "Status",
				"key": "status",
				"type": "status"
			},
			{
				"title": "Last Modiied",
				"key": "updated_at",
				"type": "date"
			},
			{
				"title": "Date Created",
				"key": "created_at",
				"type": "date"
			}
		];

		const policies = [
			{
				"completed": true,
				"name": {
					"id": "1",
					"title": "Policy"
				},
				"status": "draft",
				"updated_at": new Date().toString(),
				"created_at": new Date().toString()
			}
		];

		const documents = [
			{
				"name": {
					"id": "1",
					"title": "Policy"
				},
				"status": "draft",
				"updated_at": new Date().toString(),
				"created_at": new Date().toString()
			}
		];

		const showEditRiskModal = () => {
			isShowEditRiskModal.value = true;
		};

		const updateVisibleModal = ( value ) => {
			isShowEditRiskModal.value = value;
		};

		return {
			risk,
			riskProperties,
			isShowEditRiskModal,
			columns,
			columnsPoliciesModal,
			documents,
			policies,
			updateVisibleModal,
			showEditRiskModal
		};
	}
};
</script>
<style lang="stylus" scoped>
.risk-container
	&-header
		border-bottom: 1px solid #ccc
		padding: 2em
		.left
			h1
				font-size: 1.1em
			.risk-name
				span
					display: inline-block
					margin-right: 0.5em
	&-content
		padding: 1.5em 2em
		.controls
			margin-top: 1em
.count-selected
	position: absolute
	left: 1em
	font-size: 0.9em
	color: #797B7E
	font-weight: bold
</style>

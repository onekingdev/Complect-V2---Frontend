<template lang="pug">
card-container(title="Risks")
	template(#controls v-if="policyDetail.status != 'archived'")
		c-button-modal(title="New Risk" modalTitle="New Risk" type="primary")
			template(#content)
				c-field(label="Risk Name" v-model="newRisk.name" required)
				c-select.col-3(label="Impact" :data="options" v-model="newRisk.impact")
				c-select.col-3(label="Likelihood" :data="options" v-model="newRisk.likelihood")
				c-label.col-2(label="Risk Level")
					c-badge(icon="warning-light" :title="`risk${newRiskLevel}`")
			template(#footer)
				c-button(title="Create" type="primary" @click="createRisk()")
	template(#content)
		c-table(v-bind="{columns, documents}" searchable v-if="policyDetail.status != 'archived'")
		c-table(v-bind="{columns: archivecolumns, documents}" searchable v-else)
</template>


<script>
import { onMounted, onUnmounted, computed, ref, inject } from "vue";
import UseData from "~/store/Data.js";
import cBanner from "~/components/Misc/cBanner.vue";
import cSelect from "~/components/Inputs/cSelect.vue";
import cLabel from "~/components/Misc/cLabel.vue";
import cBadge from "~/components/Misc/cBadge.vue";
import { calcRiskLevel } from "~/core/utils.js";


export default {
	"components": { cBanner, cSelect, cLabel, cBadge },
	"props": {
		"policyDetails": {
			"type": Object,
			"required": true,
			"default": {}
		}
	},
	"emits": ["update:policyDetails"],
	// eslint-disable-next-line max-lines-per-function
	setup ( props ) {
		const risks = new UseData( "risks" );
		const handleClickEdit = id => console.debug( "Edit", id );
		const handleClickDuplicate = id => console.debug( "Duplicate", id );
		const handleClickDelete = id => risks.deleteDocuments( id );
		const notification = inject( "notification" );
		const policyDetail = computed( () => props.policyDetails );
		const newRisk = ref({
			"name": "",
			"impact": 0,
			"likelihood": 0,
			"dateCreated": Date.now()
		});
		const newRiskLevel = computed( () => calcRiskLevel( newRisk.value.impact, newRisk.value.likelihood ) );
		const options = [
			{ "title": "Low", "value": 0 }, { "title": "Medium", "value": 1 }, { "title": "High", "value": 2 }
		];
		const columns = [
			{
				"title": "Name",
				"key": "name",
				"cell": "CellTitle",
				"meta": { "link": "RiskDetail" }
			},
			{
				"title": "Impact",
				"key": "impact",
				"cell": "CellText",
				"meta": {
					"locale": true,
					"prefix": "risk"
				}
			},
			{
				"title": "Likelihood",
				"key": "likelihood",
				"cell": "CellText",
				"meta": {
					"locale": true,
					"prefix": "risk"
				}
			},
			{
				"title": "Risk Level",
				"key": "riskLevel",
				"cell": "CellRiskLevel"
			},
			{
				"title": "Date Created",
				"key": "dateCreated",
				"cell": "CellDate",
				"align": "right"
			},
			{
				"unsortable": true,
				"cell": "CellDropdown",
				"meta": {
					"actions": [
						{ "title": "Edit", "action": handleClickEdit }, { "title": "Duplicate", "action": handleClickDuplicate }, { "title": "Delete", "action": handleClickDelete }
					]
				}
			}
		];
		const archivecolumns = [
			{
				"title": "Name",
				"key": "name",
				"cell": "CellTitle",
				"meta": { "link": "RiskDetail" }
			},
			{
				"title": "Impact",
				"key": "impact",
				"cell": "CellText",
				"meta": {
					"locale": true,
					"prefix": "risk"
				}
			},
			{
				"title": "Likelihood",
				"key": "likelihood",
				"cell": "CellText",
				"meta": {
					"locale": true,
					"prefix": "risk"
				}
			},
			{
				"title": "Risk Level",
				"key": "riskLevel",
				"cell": "CellRiskLevel"
			},
			{
				"title": "Date Created",
				"key": "dateCreated",
				"cell": "CellDate",
				"align": "right"
			}
		];
		const createRisk = async () => {
			try {
				await risks.createDocuments([newRisk.value]);
				notification({
					"type": "success",
					"title": "New Risk has been Created"
				});
			} catch ( error ) {
				console.error( error );
				notification({
					"type": "error",
					"title": "Error",
					"message": "Risk has not been deleted. Please try again."
				});
			}
		};

		onMounted( () => risks.readDocuments() );
		onUnmounted( () => risks.clearStore() );
		return {
			columns,
			"documents": risks.getDocuments(),
			createRisk,
			newRisk,
			options,
			newRiskLevel,
			policyDetail,
			archivecolumns
		};
	}
};
</script>


<style lang="stylus" scoped>
.rules-block
	font-size: 0.9em
	margin: 1em 0
</style>

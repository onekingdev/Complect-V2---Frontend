<template lang="pug">
card-container(title="Risks")
	template(#controls v-if="policyDetail.status != 'archived'")
		// c-button-modal(title="New Risk" modalTitle="New Risk" type="primary" v-if="profile.role != 'Basic'")
		c-button(title="New Risk" type="primary" @click="toggleNewRisk()")
	template(#content)
		c-table(v-bind="{columns, documents}" v-if="policyDetail.status != 'archived'")
		c-table(v-bind="{columns: archivecolumns, documents}" v-else)
c-modal(title="New Risk" v-model="isRiskVisible")
	template(#content)
		c-field(label="Risk Name" v-model="newRisk.title" required)
		c-select.col-3(label="Impact" :data="options" v-model="newRisk.impact")
		c-select.col-3(label="Likelihood" :data="options" v-model="newRisk.likelihood")
		c-label.col-2(label="Risk Level")
			c-badge(icon="warning-light" :title="`risk${newRiskLevel}`")
	template(#footer)
		c-button(title="Add" type="primary" @click="createRisk()")
c-modal(title="New Risk" v-model="isRiskEditVisible")
	template(#content)
		c-field(label="Risk Name" v-model="editRisk.title" required)
		c-select.col-3(label="Impact" :data="options" v-model="editRisk.impact")
		c-select.col-3(label="Likelihood" :data="options" v-model="editRisk.likelihood")
		c-label.col-2(label="Risk Level")
			c-badge(icon="warning-light" :title="`risk${editRiskLevel}`")
	template(#footer)
		c-button(title="Edit" type="primary" @click="editRiskValue()")
c-modal(title="New Risk" v-model="isRiskDeleteVisible")
	template(#content)
		.col-1
			icon(name="error" size="huge")
		.col-5
			p This risk will be deleted from the Risk Register and all policy controls will be unlinked.
			p
				b Do you want to continue?
	template(#footer)
		c-button(title="Delete" type="primary" @click="deleteRiskValue()")
</template>


<script>
import { onMounted, onUnmounted, computed, ref, inject } from "vue";
import UseData from "~/store/Data.js";
import cBanner from "~/components/Misc/cBanner.vue";
import cSelect from "~/components/Inputs/cSelect.vue";
import cLabel from "~/components/Misc/cLabel.vue";
import cBadge from "~/components/Misc/cBadge.vue";
import { calcRiskLevel } from "~/core/utils.js";
import cModal from "~/components/Misc/cModal.vue";
import useProfile from "~/store/Profile.js";

export default {
	"components": { cBanner, cSelect, cLabel, cBadge, cModal },
	"props": {
		"policyDetails": {
			"type": Object,
			"required": true,
			"default": {}
		}
	},
	"emits": ["update:policyDetails"],
	// eslint-disable-next-line
	setup ( props ) {
		const risks = new UseData( "risks" );
		const editRisk = ref({
			"title": "",
			"impact": 0,
			"likelihood": 0
		});
		const isRiskEditVisible = ref( false );
		const isRiskDeleteVisible = ref( false );
		const clickId = ref( "" );
		const handleClickEdit = async id => {
			isRiskEditVisible.value = !isRiskEditVisible.value;
			await risks.readDocuments( id );
			editRisk.value = risks.getDocument().value;
		};
		const editRiskLevel = computed( () => calcRiskLevel( editRisk.value.impact, editRisk.value.likelihood ) );
		const handleClickDelete = id => {
			clickId.value = id;
			isRiskDeleteVisible.value = !isRiskDeleteVisible.value;
		};
		const notification = inject( "notification" );
		const policyDetail = computed( () => props.policyDetails );
		const { profile } = useProfile();
		const isRiskVisible = ref( false );
		const toggleNewRisk = () => isRiskVisible.value = !isRiskVisible.value;
		const newRisk = ref({
			"title": "",
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
				"key": "title",
				"width": "50%",
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
						{ "title": "Edit", "action": handleClickEdit }, { "title": "Delete", "action": handleClickDelete }
					]
				}
			}
		];
		const archivecolumns = [
			{
				"title": "Name",
				"key": "title",
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
				newRisk.value.riskLevel = newRiskLevel.value;
				newRisk.value.controls = {
					"_id": policyDetail.value._id,
					"title": policyDetail.value.title,
					"status": policyDetail.value.status,
					"lastModified": policyDetail.value.lastModified,
					"dateCreated": policyDetail.value.dateCreated
				};
				await risks.createDocuments([newRisk.value]);
				notification({
					"type": "success",
					"title": "Success",
					"message": "New Risk has been Created"
				});
				toggleNewRisk();
			} catch ( error ) {
				console.error( error );
				notification({
					"type": "error",
					"title": "Error",
					"message": "Risk has not been deleted. Please try again."
				});
			}
		};
		const editRiskValue = async () => {
			try {
				newRisk.value.riskLevel	 = editRiskLevel.value;
				await risks.updateDocuments( newRisk.value._id, [editRisk.value]);
				notification({
					"type": "success",
					"title": "Success",
					"message": "New Risk has been Created"
				});
				isRiskEditVisible.value = !isRiskEditVisible.value;
			} catch ( error ) {
				console.error( error );
				notification({
					"type": "error",
					"title": "Error",
					"message": "Risk has not been deleted. Please try again."
				});
			}
		};
		const deleteRiskValue = async () => {
			try {
				await risks.deleteDocuments( clickId.value );
				notification({
					"type": "success",
					"title": "Success",
					"message": "Risk has been deleted."
				});
				isRiskDeleteVisible.value = !isRiskDeleteVisible.value;
			} catch ( error ) {
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
			archivecolumns,
			profile,
			isRiskVisible,
			toggleNewRisk,
			editRiskLevel,
			editRisk,
			isRiskEditVisible,
			editRiskValue,
			deleteRiskValue,
			isRiskDeleteVisible
		};
	}
};
</script>


<style lang="stylus" scoped>
.rules-block
	font-size: 0.9em
	margin: 1em 0
</style>
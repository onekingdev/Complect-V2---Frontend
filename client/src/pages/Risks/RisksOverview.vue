<template lang="pug">
c-dropdown-table(v-bind="{columns, controlColumns, documents}" searchable)
c-modal(title="Edit Risk" v-model="isEditVisible")
	template(#content)
		c-field(label="Risk Name" v-model="riskForm.name" required)
		c-select.col-3(label="Impact" :data="options" v-model="riskForm.impact")
		c-select.col-3(label="Likelihood" :data="options" v-model="riskForm.likelihood")
		c-label.col-2(label="Risk Level")
			c-badge(icon="warning-light" :title="`risk${newRiskLevel}`")
	template(#footer)
		c-button(title="Save" type="primary" @click="editRisk()")
c-modal(title="Delete Risk" v-model="isDeleteVisible")
	template(#content)
		.delete-container
			div
				icon(name="error" size="big")
			.description
				p This risk will be deleted from the Risk Register and all policy controls will be unlinked.
				p.confirm Do you want to continue?
	template(#footer)
		c-button(title="Delete" type="primary" @click="deleteRisk()")
c-modal(title="Unlink Policy" v-model="isUnlinkVisible")
	template(#content)
		.delete-container
			div
				icon(name="error" size="big")
			.description
				p This policy will be removed as a control for this risk. This will also remove the risk from the policy s associated Risks tab.
				p.confirm Do you want to continue?
	template(#footer)
		c-button(title="Unlink" type="primary" @click="unlinkPolicy()")
</template>


<script>
import { onMounted, onUnmounted, ref, inject, computed } from "vue";
import UseData from "~/store/Data.js";
import { calcRiskLevel } from "~/core/utils.js";
import cBanner from "~/components/Misc/cBanner.vue";
import { useRouter } from "vue-router";
import cModal from "~/components/Misc/cModal.vue";
import useProfile from "~/store/Profile.js";
import cSelect from "~/components/Inputs/cSelect.vue";
import cBadge from "~/components/Misc/cBadge.vue";
import cLabel from "~/components/Misc/cLabel.vue";
import { notifyMessages } from "~/data/notifications.js";

export default {
	"components": { cBanner, cModal, cSelect, cLabel, cBadge },
	// eslint-disable-next-line
	setup () {
		const risks = new UseData( "risks" );
		const router = useRouter();
		const notification = inject( "notification" );
		const { profile } = useProfile();
		const isEditVisible = ref( false );
		const isDeleteVisible = ref( false );
		const isUnlinkVisible = ref( false );
		const clickId = ref({});
		const options = [
			{ "title": "Low", "value": 0 }, { "title": "Medium", "value": 1 }, { "title": "High", "value": 2 }
		];
		const riskForm = ref({ });
		const newRiskLevel = computed( () => calcRiskLevel( riskForm.value.impact, riskForm.value.likelihood ) );
		const handleClickEdit = async id => {
			clickId.value.riskId = id;
			await risks.readDocuments( id );
			riskForm.value = risks.getDocument().value;
			isEditVisible.value = !isEditVisible.value;
		};
		const handleClickDelete = id => {
			clickId.value.riskId = id;
			isDeleteVisible.value = !isDeleteVisible.value;
		};
		const handleUnlinkPolicy = ( id, controlId ) => {
			clickId.value.riskId = id;
			clickId.value.policyId = controlId;
			isUnlinkVisible.value = !isUnlinkVisible.value;
		};
		const unlinkPolicy = async () => {
			try {
				const riskId = clickId.value.riskId;
				const policyId = clickId.value.policyId;
				// await policies.deleteDocuments( policyId );
				await risks.readDocuments( riskId );
				const controls = risks.getDocument().value.controls.filter( doc => doc._id !== policyId );
				await risks.updateDocument( risks.getDocument().value._id, { controls });
				isUnlinkVisible.value = !isUnlinkVisible.value;
				notification({
					"type": "success",
					"title": "Success",
					"message": notifyMessages.risk.control.delete.success
				});
				await risks.readDocuments( risks.getDocument().value._id );
			} catch ( error ) {
				console.error( error );
				notification({
					"type": "error",
					"title": "Error",
					"message": notifyMessages.risk.control.delete.error
				});
			}
		};
		const editRisk = async () => {
			try {
				riskForm.value.riskLevel = newRiskLevel.value;
				riskForm.value.creator = `${profile.value.firstName} ${profile.value.lastName}`;
				const riskId = await risks.updateDocument( clickId.value.riskId, riskForm.value );
				notification({
					"type": "success",
					"title": "Success",
					"message": notifyMessages.risk.update.success
				});
				router.push({
					"name": "RiskDetail",
					"params": { "id": riskId[0] }
				});
			} catch {
				notification({
					"type": "error",
					"title": "Error",
					"message": notifyMessages.risk.update.error
				});
			}
		};
		const deleteRisk = async () => {
			try {
				await risks.deleteDocuments( clickId.value.riskId );
				notification({
					"type": "success",
					"title": "Success",
					"message": notifyMessages.risk.delete.success
				});
				isDeleteVisible.value = !isDeleteVisible.value;
			} catch ( error ) {
				notification({
					"type": "error",
					"title": "Error",
					"message": notifyMessages.risk.delete.error
				});
			}
		};

		const columns = [
			{
				"title": "Name",
				"key": "name",
				"cell": "CellTitle",
				"width": "50%",
				"meta": {
					"link": "RiskDetail",
					"expandable": true
				}
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
				"title": "Risk Creator",
				"key": "creator",
				"cell": "CellText",
				"meta": { "locale": false }
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
		const controlColumns = ref([
			{
				"title": "Name",
				"key": "name",
				"cell": "CellTitle",
				"width": "50%",
				"meta": {
					// "link": "PolicyDetail",
					"icon": "policy"
				}
			},
			{
				"title": "Impact",
				"key": "none",
				"cell": "CellText",
				"meta": { "locale": false }
			},
			{
				"title": "Likelihood",
				"key": "none",
				"cell": "CellText",
				"meta": { "locale": false }
			},
			{
				"title": "Risk Level",
				"key": "none",
				"cell": "CellText",
				"meta": { "locale": false }
			},
			{
				"title": "Date Created",
				"key": "none",
				"cell": "CellText",
				"meta": { "locale": false }
			},
			{
				"title": "Risk Creator",
				"key": "none",
				"cell": "CellText",
				"meta": { "locale": false }
			},
			{
				"unsortable": true,
				"cell": "CellDropdown",
				"meta": { "actions": [{ "title": "Unlink", "action": handleUnlinkPolicy }] }
			}
		]);

		onMounted( () => risks.readDocuments() );
		onUnmounted( () => risks.clearStore() );


		return { columns, "documents": risks.getDocuments(), isEditVisible, isDeleteVisible, editRisk, deleteRisk, riskForm, options, newRiskLevel, controlColumns, unlinkPolicy, isUnlinkVisible };
	}
};
</script>


<style lang="stylus" scoped>
.rules-block
	font-size: 0.9em
	margin: 1em 0
.delete-container
	display: flex
	gap: 1.25em
	.description
		font-size: 0.875em
		.confirm
			padding-top: 0.625em
			font-weight: bold
</style>

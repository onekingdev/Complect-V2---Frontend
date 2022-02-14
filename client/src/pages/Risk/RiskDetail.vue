<template lang="pug">
card-container(title="Risk Details")
	template(#controls)
		c-button-modal(title="Edit" modalTitle="Edit Risk" type="default")
			template(#content)
				c-field(label="Risk Name" v-model="riskForm.title" required)
				c-select.col-3(label="Impact" :data="options" v-model="riskForm.impact")
				c-select.col-3(label="Likelihood" :data="options" v-model="riskForm.likelihood")
				c-label.col-2(label="Risk Level")
					c-badge(icon="warning-light" :title="`risk${newRiskLevel}`")
			template(#footer)
				c-button(title="Save" type="primary" @click="editRisk()")
	template(#content)
		definition-list(:data="riskDetails")

card-container(title="Controls")
	template(#controls)
		c-button-modal(title="Edit" modalTitle="Select Control" type="default" v-if="controlsDocuments && controlsDocuments.length" wide)
			template(#content)
				c-table(v-bind="{columns: controlsColumnsModal, documents: policyDocuments}")
			template(#footer)
				c-button(title="Add" type="primary" @click="addControl()")
		c-button-modal(title="Add Control" modalTitle="Select Control" type="default" v-if="!controlsDocuments || !controlsDocuments.length" wide)
			template(#content)
				c-table(v-bind="{columns: controlsColumnsModal, documents: policyDocuments}")
			template(#footer)
				c-button(title="Add" type="primary" @click="addControl()")

	template(#content)
		c-table(v-bind="{columns: controlsColumns, documents: controlsDocuments}")
c-modal(title="Unlink Policy" v-model="isDeleteVisible")
	template(#content)
		.col-1
			icon(name="error" size="huge")
		.col-5
			p This policy will be removed as a control for this risk. This will also remove the risk from the policy's associated Risks tab.
			p
				b Do you want to continue?
	template(#footer)
		c-button(title="Unlink" type="primary" @click="deletePolicy()")
</template>


<script>
import { computed, inject, ref } from "vue";
import useData from "~/store/Data.js";
import definitionList from "~/components/Misc/DefinitionList.vue";
import { calcRiskLevel } from "~/core/utils.js";
import cSelect from "~/components/Inputs/cSelect.vue";
import cLabel from "~/components/Misc/cLabel.vue";
import cBadge from "~/components/Misc/cBadge.vue";
import useProfile from "~/store/Profile.js";
import cModal from "~/components/Misc/cModal.vue";
export default {
	"components": { definitionList, cSelect, cLabel, cBadge, cModal },
	// eslint-disable-next-line max-lines-per-function
	setup () {
		const { document, updateDocument, readDocuments } = useData( "risks" );
		const notification = inject( "notification" );
		const locale = inject( "locale" );
		const clickId = ref( "" );

		const { profile } = useProfile();
		const isDeleteVisible = ref( false );
		const handleClickDelete = id => {
			clickId.value = id;
			isDeleteVisible.value = !isDeleteVisible.value;
		};
		const deletePolicy = async () => {
			try {
				const policyId = clickId.value;
				// await policies.deleteDocuments( policyId );
				const controls = document.value.controls.filter( doc => doc._id !== policyId );
				await updateDocument( document.value._id, { controls });
				isDeleteVisible.value = !isDeleteVisible.value;
				notification({
					"type": "success",
					"title": "Success",
					"message": "Control has been removed."
				});
				await readDocuments( document.value._id );
			} catch ( error ) {
				notification({
					"type": "error",
					"title": "Error",
					"message": "Control has not been removed. Please try again."
				});
			}
		};
		const options = [
			{ "title": "Low", "value": 0 }, { "title": "Medium", "value": 1 }, { "title": "High", "value": 2 }
		];
		const riskDetails = computed( () => ({
			"title": document.value.title,
			"impact": locale( `risk${document.value.impact}` ),
			"likelihood": locale( `risk${document.value.likelihood}` )
		}) );
		const riskForm = computed( () => ({
			"title": document.value.title,
			"impact": document.value.impact,
			"likelihood": document.value.likelihood
		}) );
		const newRiskLevel = computed( () => calcRiskLevel( riskForm.value.impact, riskForm.value.likelihood ) );
		const editRisk = async () => {
			try {
				riskForm.value.riskLevel = newRiskLevel.value;
				riskForm.value.creator = `${profile.value.firstName} ${profile.value.lastName}`;
				// await updateDocuments( document.value._id, riskForm );
				notification({
					"type": "success",
					"title": "Success",
					"message": "Risk has been updated."
				});
				await readDocuments( document.value._id );
			} catch {
				notification({
					"type": "error",
					"title": "Error",
					"message": "Risk has not been updated. Please try again."
				});
			}
		};
		const checkPolicy = ( id, event ) => console.debug( id, event.target.value );
		const controlsColumns = [
			{
				"title": "Policy",
				"key": "title",
				"cell": "CellTitle",
				"meta": {
					"icon": "policy"
					// "link": "PolicyDetail"
				}
			},
			{
				"title": "Status",
				"key": "status",
				"cell": "CellStatus"
			},
			{
				"title": "Last Modified",
				"key": "lastModified",
				"cell": "CellDate",
				"align": "right"
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
				"meta": { "actions": [{ "title": "Delete", "action": handleClickDelete }] }
			}
		];

		const controlsColumnsModal = [
			{
				"title": "Policy",
				"key": "title",
				"cell": "CellTitle",
				"unsortable": true,
				"meta": {
					"icon": "policy",
					"checkbox": { "action": checkPolicy }
					// "link": "PolicyDetail"
				}
			}, {
				"title": "Status",
				"key": "status",
				"cell": "CellStatus"
			}, {
				"title": "Last Modified",
				"key": "lastModified",
				"cell": "CellDate",
				"align": "right"
			}, {
				"title": "Date Created",
				"key": "dateCreated",
				"cell": "CellDate",
				"align": "right"
			}
		];

		const policyDocuments = ref([
			{
				"Created": 1644778085732,
				"lastModified": 1644778085732,
				"status": "draft",
				"title": "Policy2",
				"_id": "123234234"
			},
			{
				"Created": 1644778085732,
				"lastModified": 1644778085732,
				"status": "draft",
				"title": "Policy3",
				"_id": "123234234"
			},
			{
				"Created": 1644778085732,
				"lastModified": 1644778085732,
				"status": "draft",
				"title": "Policy4",
				"_id": "123234234"
			},
			{
				"Created": 1644778085732,
				"lastModified": 1644778085732,
				"status": "draft",
				"title": "Policy5",
				"_id": "123234234"
			},
			{
				"Created": 1644778085732,
				"lastModified": 1644778085732,
				"status": "draft",
				"title": "Policy6",
				"_id": "123234234"
			},
			{
				"Created": 1644778085732,
				"lastModified": 1644778085732,
				"status": "draft",
				"title": "Policy7",
				"_id": "123234234"
			}
		]);
		const addControl = () => console.debug( policyDocuments.value );

		const controlsDocuments = computed( () => document.value.controls || []);

		return {
			handleClickDelete,
			addControl,
			riskDetails,
			controlsColumns,
			controlsColumnsModal,
			controlsDocuments,
			newRiskLevel,
			editRisk,
			options,
			riskForm,
			deletePolicy,
			policyDocuments,
			isDeleteVisible
		};
	}
};
</script>

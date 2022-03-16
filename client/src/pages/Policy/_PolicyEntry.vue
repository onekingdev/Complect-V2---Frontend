<template lang="pug">
menu-container(:type="menuType")
	template(#leftmenu)
		c-button(title="New Policy" type="primary" @click="toggleNewPolicy()")
		c-modal(title="New Policy" v-model="isNewPolicyVisible")
			template(#content)
				c-field(label="Policy Name" v-model="newPolicy.title" required)
			template(#footer)
				c-button(title="Create" type="primary" @click="createPolicy()")
		draggable.policies-list(:list="documents")
			p.ind-policy(v-for="(indDoc, index) in documents" :key="indDoc._id")
				router-link(:to=" {name: 'PolicyDetail', params: { id: indDoc._id } } ") {{indDoc.title}}
	template(#content)
		page-container(:badge="{title: policyDetails.status }" :title="policyDetails.title" type="document full-width" :hasHamberger="hasHamberger")
			template(#controls)
				// c-button(title="Save Draft" type="link" @click="saveDraft()" v-if="policyDetails.status != 'archived' && profile.role != 'Basic'")
				// c-button(title="Download" @click="exportPDF()"  v-if="policyDetails.status != 'archived' && profile.role != 'Basic'")
				// c-button-modal(title="Publish" modalTitle="New Policy" type="primary"  v-if="policyDetails.status != 'archived' && profile.role != 'Basic'")
				c-button(title="Save Draft" type="link" @click="saveDraft()" v-if="policyDetails.status != 'archived'")
				c-button(title="Export" @click="exportPDF()"  v-if="policyDetails.status != 'archived' && publishPolicies.length")
				c-button(title="Publish" type="primary" @click="togglePublishPolicy()")
				c-button(type="icon" iconL="close" size="small" @click="closePolicy()")
			template(#tabs v-if="policyDetails.status != 'archived'")
				router-link.link-item(v-for="(tab, index) in tabs" :key="index" :to="{name: tab.routeName}") {{tab.title}}
				c-dropdown.action-button(title="Actions" type="transparent")
					c-button(title="Archive" type="transparent" @click="toggleArchivePolicy()")
					c-button-modal(title="Delete" type="transparent"  modalTitle="Delete Policy")
						template(#content)
							.col-1
								icon(name="error" size="huge")
							.col-5
								p Removing this policy will permanently delete all risks and tasks associated with this policy.
								p
									b Do you want to continue?
						template(#footer)
							c-button(title="Confirm" type="primary" @click="deletePolicy()")
			template(#tabs  v-if="policyDetails.status == 'archived'")
				router-link.link-item(v-for="(tab, index) in archivetabs" :key="index" :to="{name: tab.routeName}") {{tab.title}}
				c-dropdown.action-button(title="Actions" type="transparent")
					c-button(title="Unarchive" type="transparent"  @click="toggleUnarchivePolicy()")
					c-button-modal(title="Delete" type="transparent"  modalTitle="Delete Policy")
						template(#content)
							.col-1
								icon(name="error" size="huge")
							.col-5
								p Removing this policy will permanently delete all risks and tasks associated with this policy.
								p
									b Do you want to continue?
						template(#footer)
							c-button(title="Confirm" type="primary" @click="deletePolicy()")
			template(#content)
				router-view(v-model:policyDetails="policyDetails")
c-modal(title="Unsaved Change" v-model="isUnsavedVisible")
	template(#content)
		.col-1
			icon(name="warning" size="huge")
		.col-5
			p You have unsaved changes. Exiting without saving will clear all unsaved information.
			p
				b Do you want to continue?
	template(#footer)
		c-button(title="Confirm" type="primary" @click="toPoliciePage()")
c-modal(title="Publish Policy" v-model="isPublishVisible")
	template(#content)
		.col-1
			icon(name="success" size="huge")
		.col-5
			p You are publishing a policy which will make it viewable to all users. It will also be included in an official version of the compliance manual.
			p
				b Do you want to continue?
	template(#footer)
		c-button(title="Confirm" type="primary" @click="publishPolicy()")
c-modal(title="Archive Policy" v-model="isArchiveVisible")
	template(#content)
		.col-1
			icon(name="warning" size="huge")
		.col-5
			p Archiving the policy will remove it from the published compliance manual, but maintain a record of the policy and all of its linked risks and tasks.
			p
				b Do you want to continue?
	template(#footer)
		c-button(title="Confirm" type="primary" @click="archivePolicy()")
c-modal(title="Unarchive Policy" v-model="isUnarchiveVisible")
	template(#content)
		.col-1
			icon(name="warning" size="huge")
		.col-5
			p Unarchiving the policy will place it back into the compliance manual.
			p
				b Do you want to continue?
	template(#footer)
		c-button(title="Confirm" type="primary" @click="unarchivePolicy()")
</template>


<script>
import VerticalTabs from "~/components/Containers/VerticalTabs.vue";
import { onMounted, onUnmounted, inject, computed, watch, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import UseData from "~/store/Data.js";
import useProfile from "~/store/Profile.js";
import cDropdown from "~/components/Inputs/cDropdown.vue";
import { manualApi } from "~/core/api.js";
import cModal from "~/components/Misc/cModal.vue";
export default {
	"components": { VerticalTabs, cDropdown, cModal },
	"props": {
		"section": {
			"type": String,
			"default": ""
		},
		"title": {
			"type": String,
			"default": "Title"
		},
		"owner": {
			"type": String,
			"default": ""
		}
	},
	// eslint-disable-next-line
	setup () {
		const route = useRoute();
		const router = useRouter();
		const policies = new UseData( "policies" );
		const { profile } = useProfile();
		const notification = inject( "notification" );
		const menuType = ref( "" );
		const isUnsavedVisible = ref( false );
		const isNewPolicyVisible = ref( false );
		const isPublishVisible = ref( false );
		const isArchiveVisible = ref( false );
		const isUnarchiveVisible = ref( false );
		const documents = ref([]);
		const tabs = [
			{
				"title": "Detail",
				"routeName": "PolicyDetail"
			}, {
				"title": "Risks",
				"routeName": "PolicyRisks"
			}, {
				"title": "Tasks",
				"routeName": "PolicyTasks"
			}, {
				"title": "History",
				"routeName": "PolicyHistory"
			}
		];
		const archivetabs = [
			{
				"title": "Details",
				"routeName": "PolicyDetail"
			}, {
				"title": "History",
				"routeName": "PolicyHistory"
			}
		];
		const toPoliciePage = () => router.push({ "name": "Policies" });
		const policyDetails = computed( () => policies.document.value );
		const policiesDetails = computed( () => policies.documents.value.filter( document => document.status !== "archived" ) );
		const publishPolicies = computed( () => policies.documents.value.filter( document => document.status === "published" ) );
		const toggleNewPolicy = () => isNewPolicyVisible.value = !isNewPolicyVisible.value;
		const togglePublishPolicy = () => isPublishVisible.value = !isPublishVisible.value;
		const toggleArchivePolicy = () => isArchiveVisible.value = !isPublishVisible.value;
		const toggleUnarchivePolicy = () => isUnarchiveVisible.value = !isPublishVisible.value;

		const closePolicy = () => {
			const originValue = policies.documents.value.filter( document => document._id === policyDetails.value._id )[0];
			if ( originValue.title !== policies.getDocument().value.title || originValue.description !== policies.getDocument().value.description ) isUnsavedVisible.value = !isUnsavedVisible.value;
			else toPoliciePage();
		};
		const publishPolicy = async () => {
			try {
				const policyId = policies.document.value._id;
				let history;
				history = policyDetails.value.history;
				policyDetails.value.status = "published";
				if ( !history ) history = [];
				history.push({
					"version": `Version ${history.length + 1}`,
					"publishedBy": `Published By ${profile._value.firstName} ${profile._value.lastName}`,
					"lastUpdated": Date.now(),
					"title": policyDetails.value.title,
					"description": policyDetails.value.description
				});
				await policies.updateDocument( policyId, { "status": "published", "name": policyDetails.value.title, "description": policyDetails.value.description, history });
				notification({
					"type": "success",
					"title": "Success",
					"message": "Policy has been published."
				});
				togglePublishPolicy();
			} catch ( error ) {
				notification({
					"type": "error",
					"title": "Error",
					"message": "Policy has not been published. Please try again."
				});
			}
		};
		const archivePolicy = async () => {
			try {
				const policyId = policies.document.value._id;
				await policies.updateDocument( policyId, { "status": "archived", "tasks": [] });
				notification({
					"type": "success",
					"title": "Success",
					"message": "Policy has been archived."
				});
				toPoliciePage();
			} catch ( error ) {
				notification({
					"type": "error",
					"title": "Error",
					"message": "Policy has not been archived. Please try again."
				});
			}
		};
		const unarchivePolicy = async () => {
			try {
				const policyId = policies.document.value._id;
				await policies.updateDocument( policyId, { "status": "published" });
				notification({
					"type": "success",
					"title": "Success",
					"message": "Policy has been unarchived and republished."
				});
				toPoliciePage();
			} catch ( error ) {
				notification({
					"type": "error",
					"title": "Error",
					"message": "Policy has not been unarchived and republished. Please try again."
				});
			}
		};
		const deletePolicy = async () => {
			const policyId = policies.document.value._id;
			await policies.deleteDocuments( policyId );
			toPoliciePage();
		};
		const saveDraft = async () => {
			try {
				const policyId = policies.document.value._id;
				policyDetails.value.status = "draft";
				await policies.updateDocument( policyId, { "status": "draft", "title": policyDetails.value.title, "description": policyDetails.value.description });
				notification({
					"type": "success",
					"title": "Success",
					"message": "Policy has been saved."
				});
			} catch ( error ) {
				notification({
					"type": "error",
					"title": "Error",
					"message": "Policy has not been saved. Please try again."
				});
			}
		};
		const newPolicy = ref({
			"title": "",
			"createdAt": Date.now(),
			"modifiedAt": Date.now(),
			"status": "draft",
			"description": ""
		});
		const doHamberger = () => menuType.value = menuType.value ? "" : "hide-menu";
		const hasHamberger = { "action": doHamberger };
		const createPolicy = async () => {
			try {
				newPolicy.value.order = policies.getDocuments().value.length;
				const policyId = await policies.createDocuments([newPolicy.value]);
				notification({
					"type": "success",
					"title": "Success",
					"message": "New policy has been created."
				});
				router.push({
					"name": "PolicyDetail",
					"params": { "id": policyId[0] }
				});
				isNewPolicyVisible.value = false;
			} catch ( error ) {
				console.error( error );
				notification({
					"type": "error",
					"title": "Error",
					"message": "Policy has not been created. Please try again."
				});
			}
		};
		const exportPDF = async () => {
			const policyId = policies.document.value._id;
			const pdfData = {
				"collection": "policies",
				"template": "manualTemplate",
				"_id": policyId
			};
			const pdfLink = await manualApi({
				"method": "post",
				"endpoint": "/pdf",
				"newData": pdfData
			});
			window.location.href = pdfLink.data;
		};

		watch( () => route.params.id, () => policies.readDocuments( route.params.id ), { "deep": true });
		watch( () => policiesDetails.value, () => documents.value = policiesDetails.value, { "deep": true });

		onMounted( () => {
			policies.readDocuments();
			policies.readDocuments( route.params.id );
		});

		onUnmounted( () => policies.clearStore() );

		return {
			tabs,
			archivetabs,
			document,
			documents,
			newPolicy,
			closePolicy,
			publishPolicy,
			createPolicy,
			policyDetails,
			policiesDetails,
			saveDraft,
			archivePolicy,
			unarchivePolicy,
			deletePolicy,
			exportPDF,
			profile,
			menuType,
			hasHamberger,
			toPoliciePage,
			isUnsavedVisible,
			publishPolicies,
			isNewPolicyVisible,
			isPublishVisible,
			isArchiveVisible,
			isUnarchiveVisible,
			toggleNewPolicy,
			togglePublishPolicy,
			toggleArchivePolicy,
			toggleUnarchivePolicy
		};
	}
};
</script>


<style lang="stylus" scoped>
.layout
	display: flex;
	position: relative;
	.policies-list
		margin-top: 10px
		.ind-policy
			padding: 1rem
			font-size: 14px
			border-bottom: 1px solid #ddd
	.tabs
		width: 100%
		background: red
		.action-button
			margin-left: auto
			border: 1px solid #ddd
			border-radius: 5px
			margin-bottom: 5px
</style>

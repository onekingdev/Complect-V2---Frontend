<template lang="pug">
menu-container
	template(#leftmenu)
		c-button-modal(title="New Policy" modalTitle="New Policy" type="primary")
			template(#content)
				c-field(label="Policy Name" v-model="newPolicy.name" required)
			template(#footer)
				c-button(title="Create" type="primary" @click="createPolicy()")
		p.ind-policy(v-for="(indDoc, index) in policiesDetails")
			router-link(:to=" {name: 'PolicyDetail', params: { id: indDoc._id } } ") {{indDoc.name}}
	template(#content)
		page-container(:badge="{title: policyDetails.status }" :title="policyDetails.name" type="document")
			template(#controls)
				c-button(title="Save Draft" type="link" @click="saveDraft()")
				c-button(title="Download" @click="exportPDF()")
				c-button-modal(title="Publish" modalTitle="New Policy" type="primary")
					template(#content)
						.col-1
							icon(name="success" size="huge") 
						.col-5
							p You are publishing a policy which will make it viewable to all users. It will also be included in an official version of the compliance manual.
							p 
								b Do you want to continue?
					template(#footer)
						c-button(title="Confirm" type="primary" @click="publishPolicy()")
				c-button(type="icon" iconL="close" size="small" @click="closePolicy()")
			template(#tabs)
				router-link.link-item(v-for="(tab, index) in tabs" :key="index" :to="{name: tab.routeName}") {{tab.title}}
				c-dropdown.action-button(title="Actions" type="transparent")
					c-button-modal(v-if="policyDetails.status != 'Archived'" title="Archive" type="transparent" )
						template(#content)
							.col-1
								icon(name="warning" size="huge") 
							.col-5
								p Archiving the policy will remove it from the published compliance manual, but maintain a record of the policy and all of its linked risks and tasks.
								p 
									b Do you want to continue?
						template(#footer)
							c-button(title="Confirm" type="primary" @click="archivePolicy()")
					c-button-modal(v-if="policyDetails.status == 'Archived'" title="Unarchive" type="transparent" )
						template(#content)
							.col-1
								icon(name="success" size="huge") 
							.col-5
								p Archiving the policy will remove it from the published compliance manual, but maintain a record of the policy and all of its linked risks and tasks.
								p 
									b Do you want to continue?
						template(#footer)
							c-button(title="Confirm" type="primary" @click="unarchivePolicy()")
					c-button-modal(title="Delete" type="transparent" )
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
</template>


<script>
import VerticalTabs from "~/components/Containers/VerticalTabs.vue";
import { onMounted, onUnmounted, ref, inject, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import useData from "~/store/Data.js";
import useProfile from "~/store/Profile.js";
import cDropdown from "~/components/Inputs/cDropdown.vue";
export default {
	"components": { VerticalTabs, cDropdown },
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
	setup () {
		const route = useRoute();
		const router = useRouter();
		const policies = new useData( "policies" );
		const { profile } = useProfile();
		const tabs = [
			{
				"title": "Detail",
				"routeName": "PolicyDetail"
			},
			{
				"title": "Risks",
				"routeName": "PolicyRisks"
			},
			{
				"title": "Tasks",
				"routeName": "PolicyTasks"
			},
			{
				"title": "History",
				"routeName": "PolicyHistory"
			}
		];
		

		const policyDetails = computed( () => (policies.document.value) );
		const policiesDetails = computed( () => (policies.documents.value) );

		const closePolicy = () => router.push({ "name": "Policies" });
		const publishPolicy = async () => {
			const policyId = policies.document.value._id;
			let history = policyDetails._value.history;
			if(!history) history = [];
			history.push({
				version: `Version ${history.length + 1}`,
				publishedBy: `Published By ${profile._value.firstName} ${profile._value.lastName}`,
				lastUpdated: Date.now()
			});
			await policies.updateDocument( policyId, { status: "Publish", name: policyDetails._value.name, description: policyDetails._value.description, history } );
			router.push({ "name": "Policies" });
		}
		const archivePolicy = async () => {
			const policyId = policies.document.value._id;
			await policies.updateDocument( policyId, { status: "Archived" } );
			router.push({ "name": "Policies" });
		}
		const unarchivePolicy = async () => {
			const policyId = policies.document.value._id;
			await policies.updateDocument( policyId, { status: "Draft" } );
			router.push({ "name": "Policies" });
		}
		const deletePolicy = async () => {
			const policyId = policies.document.value._id;
			await policies.deleteDocuments( policyId );
			router.push({ "name": "Policies" });
		}
		const saveDraft = async () => {
			const policyId = policies.document.value._id;
			await policies.updateDocument( policyId, { status: "Draft", name: policyDetails._value.name, description: policyDetails._value.description } );
		}
		
		const createPolicy = async () => {
			const policyId = await policies.createDocuments([newPolicy.value]);
			notification({
				"type": "success",
				"title": "newPolicy Created"
			});
			router.push({
				"name": "PolicyDetail",
				"params": { "id": policyId[0] }
			});
		};
		const exportPDF = async () => {
			const policyId = policies.document.value._id;
			const pdfData = {
				collection: 'policies',
				template: 'manualTemplate',
				_id: policyId
			};
			const pdfLink = await manualApi({
				method: 'post',
				endpoint: '/pdf',
				newData: pdfData
			});
			window.location.href = pdfLink;
		};

		watch( () => route.params.id, () => policies.readDocuments( route.params.id ), { deep: true });

		onMounted( () => {
			policies.readDocuments( );
			policies.readDocuments( route.params.id );
		});

		onUnmounted( () => policies.clearStore( ) );

		return { 
			tabs,
			document,
			documents: policies.documents,
			closePolicy,
			publishPolicy,
			createPolicy,
			policyDetails,
			policiesDetails,
			saveDraft,
			archivePolicy,
			unarchivePolicy,
			deletePolicy,
			exportPDF
		};
	}
};
</script>


<style lang="stylus" scoped>
.layout
	display: flex;
	position: relative;
	.ind-policy
		padding: 1rem
		border-bottom: 1px solid #ddd
	.tabs
		width: 100%
		background: red
		.link-item
			padding: 1rem 2.5rem 0.6rem 2.5rem
		.action-button
			margin-left: auto;
</style>

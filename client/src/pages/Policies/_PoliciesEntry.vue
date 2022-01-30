<template lang="pug">
page-container(title="Policies and Procedures")
	template(#controls)
		c-button(title="Export" @click="exportPDF()")
		c-button-modal(v-if="profile.role == 'Admin' || profile.role == 'Trusted'" title="New Policy" modalTitle="New Policy" type="primary")
			template(#content)
				c-field(label="Policy Name" v-model="newPolicy.name" required)
			template(#footer)
				c-button(title="Create" type="primary" @click="createPolicy()")
	template(#tabs v-if="profile.role == 'Admin' || profile.role == 'Trusted'")
		router-link.link-item(v-for="(tab, index) in adminTabs" :key="index" :to="{name: tab.routeName}") {{tab.title}}
	template(#tabs v-if="profile.role == 'Basic'")
		router-link.link-item(v-for="(tab, index) in basicTabs" :key="index" :to="{name: tab.routeName}") {{tab.title}}
	template(#content)
		router-view
</template>


<script>
import { ref, computed, inject } from "vue";
import { useRouter } from "vue-router";
import { calcRiskLevel } from "~/core/utils.js";
import useProfile from "~/store/Profile.js";
import useData from "~/store/Data.js";
import cSelect from "~/components/Inputs/cSelect.vue";
import cLabel from "~/components/Misc/cLabel.vue";
import cBadge from "~/components/Misc/cBadge.vue";
import { manualApi } from "~/core/api.js";

export default {
	setup () {
		const notification = inject( "notification" );
		const router = useRouter();
		const policies = new useData( "policies" );
		const { profile } = useProfile();
		const adminTabs = [
			{
				"title": "Policies",
				"routeName": "Policies",
				"roles": ["Admin", "Trusted", "Basic"]
			}, {
				"title": "Archive",
				"routeName": "PoliciesArchive",
				"roles": ["Admin", "Trusted"]
			}, {
				"title": "Setup",
				"routeName": "PoliciesSetup",
				"roles": ["Admin", "Trusted"]
			}
		];
		const basicTabs = [
			{
				"title": "Policies",
				"routeName": "Policies",
				"roles": ["Admin", "Trusted", "Basic"]
			}
		];

		const newPolicy = ref({
			"name": "",
			"createdAt": Date.now(),
			"modifiedAt": Date.now(),
			"status": "Draft"
		});
		const createPolicy = async () => {
			const policyId = await policies.createDocuments([newPolicy.value]);
			notification({
				"type": "success",
				"title": "New Policy has been Created"
			});
			router.push({
				"name": "PolicyDetail",
				"params": { "id": policyId[0] }
			});
		};
		const exportPDF = async () => {
			const pdfData = {
				collection: 'policies',
				template: 'manualTemplate',
			};
			const pdfLink = await manualApi({
				method: 'post',
				endpoint: '/pdf',
				newData: pdfData
			});
			window.location.href = pdfLink;
		};
		return { 
			newPolicy,
			createPolicy,
			exportPDF,
			profile,
			basicTabs,
			adminTabs
		};
	}
};
</script>
<style lang="stylus" scoped>
	.link-item
		padding: 1rem 2.5rem 0.6rem 2.5rem;
</style>
<template lang="pug">
page-container(title="Policies and Procedures")
	template(#controls)
		c-button(title="Export" @click="exportPDF()")
		c-button-modal(title="New Policy" modalTitle="New Policy" type="primary")
			template(#content)
				c-field(label="Policy Name" v-model="newPolicy.name" required)
			template(#footer)
				c-button(title="Create" type="primary" @click="createPolicy()")
	template(#tabs)
		router-link.link-item(v-for="(tab, index) in tabs" :key="index" :to="{name: tab.routeName}") {{tab.title}}
	template(#content)
		router-view
</template>


<script>
import { ref, computed, inject } from "vue";
import { useRouter } from "vue-router";
import { calcRiskLevel } from "~/core/utils.js";
import useData from "~/store/Data.js";
import cSelect from "~/components/Inputs/cSelect.vue";
import cLabel from "~/components/Misc/cLabel.vue";
import cBadge from "~/components/Misc/cBadge.vue";

export default {
	setup () {
		const notification = inject( "notification" );
		const router = useRouter();
		const { createDocuments } = useData( "policies" );

		const tabs = [
			{
				"title": "Policies",
				"routeName": "Policies"
			}, {
				"title": "Archive",
				"routeName": "PoliciesArchive"
			}, {
				"title": "Setup",
				"routeName": "PoliciesSetup"
			}
		];
		const newPolicy = ref({
			"name": "",
			"createdAt": Date.now(),
			"modifiedAt": Date.now(),
			"status": "Draft"
		});
		const createPolicy = async () => {
			const policyId = await createDocuments([newPolicy.value]);
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

		};
		return { 
			tabs,
			newPolicy,
			createPolicy,
			exportPDF
		};
	}
};
</script>
<style lang="stylus" scoped>
	.link-item
		padding: 1rem 2.5rem 0.6rem 2.5rem;
</style>
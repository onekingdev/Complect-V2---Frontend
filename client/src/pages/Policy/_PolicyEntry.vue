<template lang="pug">
.layout
	container
		template(#content)
			c-button-modal(title="New Policy" modalTitle="New Policy" type="primary")
				template(#content)
					c-field(label="Policy Name" v-model="newPolicy.name" required)
				template(#footer)
					c-button(title="Create" type="primary" @click="createPolicy()")
			p.ind-policy
				a(href="/") Test1
			p.ind-policy
				a(href="/") Test2
			p.ind-policy
				a(href="/") Test3
	main
		page-container(section="Internal Review" title="Review" type="document")
			template(#controls)
				c-button(title="Save Draft" type="link")
				c-button(title="Download")
				c-button(title="Publish" type="primary")
				c-button(type="icon" iconL="close" size="small" @click="closePolicy()")
			template(#tabs)
				router-link.link-item(v-for="(tab, index) in tabs" :key="index" :to="{name: tab.routeName}") {{tab.title}}
			template(#content)
				router-view
</template>


<script>
import VerticalTabs from "~/components/Containers/VerticalTabs.vue";
import { useRoute, useRouter } from "vue-router";
export default {
	"components": { VerticalTabs },
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
		const lefttabs = [
			{
				"title": "General",
				"routeName": "SettingsGeneral"
			},
			{
				"title": "Users",
				"routeName": "SettingsUsersDirectory"
			},
			{
				"title": "Roles and Permissions",
				"routeName": "SettingsRoles"
			},
			{
				"title": "Security",
				"routeName": "SettingsSecurity"
			},
			{
				"title": "Subscriptions",
				"routeName": "SettingsSubscriptions"
			},
			{
				"title": "Billing",
				"routeName": "SettingsBilling"
			}
		];
		const closePolicy = () => router.push({ "name": "Policies" });

		return { 
			tabs,
			lefttabs,
			closePolicy
		};
	}
};
</script>


<style lang="stylus" scoped>
.layout
	display: grid;
	grid-template-columns: auto 1fr;
	grid-template-rows: max-content auto max-content;
	position: relative;
	.ind-policy
		padding: 1rem
		border-bottom: 1px solid #ddd 
	.link-item
		padding: 1rem 2.5rem 0.6rem 2.5rem
</style>

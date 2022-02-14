<template lang="pug">
card-container(title="Version History" v-if="policyDetail")
	template(#content)
		c-label.border-bottom(v-for="history in policyDetail.history")
			p.version-info {{ history.version }}
			p.publish-info {{ history.publishedBy }}
			p.update-info Last updated {{ formatDate(history.lastUpdated) }}
			c-button.download-button(title="Export")
</template>
<script>
import { computed } from "vue";
import definitionList from "~/components/Misc/DefinitionList.vue";
import cLabel from "~/components/Misc/cLabel.vue";
import { formatDate } from "~/core/utils";
export default {
	"components": { definitionList, cLabel },
	"props": {
		"policyDetails": {
			"type": Object,
			"required": true,
			"default": {}
		}
	},
	setup ( props ) {
		// const { document } = UseData( "policies" );
		const handleClickDelete = id => console.debug( id );
		const addControl = () => console.debug( "Add" );
		const policyDetail = computed( () => props.policyDetails || {});
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

		const controlsDocuments = [{
			"_id": "123",
			"title": "Policy",
			"status": "draft",
			"lastModified": Date.now(),
			"dateCreated": Date.now()
		}];


		return {
			handleClickDelete,
			addControl,
			controlsColumns,
			controlsDocuments,
			policyDetail,
			formatDate
		};
	}
};
</script>
<style lang="stylus" scoped>
.border-bottom
	padding: 1rem
	border-bottom: 1px solid #ddd
	position: relative
	.version-info
		font-weight: 600
		font-size: 14px
	.publish-info
		font-weight: 600
		font-size: 14px
	.update-info
		font-weight: 600
		font-size: 14px
		color: #919396
	.download-button
		position: absolute;
		top: 2rem;
		right: 1rem;
</style>


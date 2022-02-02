<template lang="pug">
card-container(title="Version History" v-if="policyDetails")
	template(#content)
		c-label.border-bottom(v-for="history in policyDetails.history")
			p {{ history.version }}
			p {{ history.publishedBy }}
			p Last updated {{ formatDate(history.lastUpdated) }}
			c-button.download-button(title="Download")
</template>
<script>
import { computed, inject } from "vue";
import useData from "~/store/Data.js";
import definitionList from "~/components/Misc/DefinitionList.vue";
import cLabel from "~/components/Misc/cLabel.vue";
import { formatDate } from "~/core/utils";
export default {
	"components": { definitionList, cLabel },
	props: {
		policyDetails: {
			required: true,
			default: {}
		}
	},
	setup (props) {
		// const { document } = useData( "policies" );
		const handleClickDelete = id => console.debug( id );
		const addControl = () => console.debug( "Add" );
		const policyDetails = computed( () => (props.policyDetails || {}) );
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
			policyDetails,
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
	.download-button
		position: absolute;
		top: 2rem;
		right: 1rem;
</style>


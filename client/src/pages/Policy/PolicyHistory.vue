<template lang="pug">
card-container(title="Version History")
	template(#content)
		c-label.border-bottom
			p Version 1
			p Published by Manuel Business
			p Last updated 01/26/2022
			c-button.download-button(title="Download")
		c-label.border-bottom
			p Version 1
			p Published by Manuel Business
			p Last updated 01/26/2022
			c-button.download-button(title="Download")
</template>
<script>
import { computed, inject } from "vue";
import useData from "~/store/Data.js";
import definitionList from "~/components/Misc/DefinitionList.vue";
export default {
	"components": { definitionList },
	setup () {
		const { document } = useData( "policies" );
		const locale = inject( "locale" );
		const handleClickDelete = id => console.debug( id );
		const addControl = () => console.debug( "Add" );

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
			controlsDocuments
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


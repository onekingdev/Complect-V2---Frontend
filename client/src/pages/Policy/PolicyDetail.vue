<template lang="pug">
card-container(title="Policy Details")
	template(#content)
		c-field( label="Name" placeholder="Name" size="small" :value="id")
		c-field( label="Description" placeholder="Description" size="small" )

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

		const policyDetails = computed( () => ({
			"name": document.value.name,
			"description": ""
		}) );

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
			policyDetails,
			controlsColumns,
			controlsDocuments
		};
	}
};
</script>

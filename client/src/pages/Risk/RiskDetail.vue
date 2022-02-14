<template lang="pug">
card-container(title="Risk Details")
	template(#controls)
		c-button(title="Edit" type="primary")
	template(#content)
		definition-list(:data="riskDetails")

card-container(title="Controls")
	template(#controls)
		c-button-modal(title="New Control" modalTitle="Select Control" type="primary")
			template(#content)
				c-table(v-bind="{columns: controlsColumns, documents: controlsDocuments}")
			template(#footer)
				c-button(title="Add" type="primary" @click="addControl()")

	template(#content)
		c-table(v-bind="{columns: controlsColumns, documents: controlsDocuments}")
</template>


<script>
import { computed, inject } from "vue";
import UseData from "~/store/Data.js";
import definitionList from "~/components/Misc/DefinitionList.vue";
export default {
	"components": { definitionList },
	setup () {
		const risks = new UseData( "risks" );
		const locale = inject( "locale" );
		const handleClickDelete = id => console.debug( id );
		const addControl = () => console.debug( "Add" );

		const riskDetails = computed( () => ({
			"title": risks.getDocument().value.title,
			"impact": locale( `risk${risks.getDocument().value.impact}` ),
			"likelihood": locale( `risk${risks.getDocument().value.likelihood}` )
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
			riskDetails,
			controlsColumns,
			controlsDocuments
		};
	}
};
</script>

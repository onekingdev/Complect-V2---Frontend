<template lang="pug">
c-table(v-bind="{columns, documents}" searchable)
</template>


<script>
import { onMounted, onUnmounted } from "vue";
import useData from "~/store/Data.js";
import cBanner from "~/components/Misc/cBanner.vue";

export default {
	"components": { cBanner },
	setup () {
		const { documents, readDocuments, deleteDocuments, clearStore } = useData( "risks" );

		const handleClickEdit = id => console.debug( "Edit", id );
		const handleClickDuplicate = id => console.debug( "Duplicate", id );
		const handleClickDelete = id => deleteDocuments( id );

		const columns = [
			{
				"title": "Name",
				"key": "title",
				"cell": "CellTitle",
				"meta": { "link": "RiskDetail" }
			},
			{
				"title": "Impact",
				"key": "impact",
				"cell": "CellText",
				"meta": {
					"locale": true,
					"prefix": "risk"
				}
			},
			{
				"title": "Likelihood",
				"key": "likelihood",
				"cell": "CellText",
				"meta": {
					"locale": true,
					"prefix": "risk"
				}
			},
			{
				"title": "Risk Level",
				"key": "riskLevel",
				"cell": "CellRiskLevel"
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
				"meta": {
					"actions": [
						{ "title": "Edit", "action": handleClickEdit }, { "title": "Duplicate", "action": handleClickDuplicate }, { "title": "Delete", "action": handleClickDelete }
					]
				}
			}
		];

		onMounted( () => readDocuments() );
		onUnmounted( () => clearStore() );


		return {
			columns,
			documents
		};
	}
};
</script>


<style lang="stylus" scoped>
.rules-block
	font-size: 0.9em
	margin: 1em 0
</style>

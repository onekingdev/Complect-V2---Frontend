<template lang="pug">
//- .controls(v-if="$slots.controls")
//- 	slot(name="controls")
.filters
	c-field.search-input(type="search" icon="search" placeholder="Search" v-model="filterQuery")
	slot(name="controls")
table(v-if="filteredRecords.length")
	thead
		tr
			th(v-for="(title, key) in options.columns")
				.column-title
					.title {{ title }}
					c-button(type="icon" icon="sort" @click="sortRows(key)")

	tbody
		tr(v-for="row in filteredRecords")
			td(v-for="(cell, key) in options.columns")
				component(
					:is="component(key)"
					:data="row[key]"
					:link="row._id")
//- icon(v-if="!records.length" name="empty-state")
</template>


<script>
import { ref, computed } from "vue";
import { sortArrayByKey } from "~/core/utils.js";
import ColumnTitle from "./Cells/ColumnTitle.vue";
import CellDefault from "./Cells/CellDefault.vue";
import CellLink from "./Cells/CellLink.vue";
import CellStatus from "./Cells/CellStatus.vue";
import CellDate from "./Cells/CellDate.vue";
import CellCollaborators from "./Cells/CellCollaborators.vue";
import CellTasks from "./Cells/CellTasks.vue";
import CellCost from "./Cells/CellCost.vue";
export default {
	"components": {
		ColumnTitle,
		CellDefault,
		CellLink,
		CellStatus,
		CellDate,
		CellCollaborators,
		CellTasks,
		CellCost
	},
	"props": {
		"options": {
			"type": Object,
			"required": true
		},
		"records": {
			"type": Array,
			"required": true
		}
	},
	setup ( props ) {
		const cellsDict = {
			"default": "CellDefault",
			"title": "CellLink",
			"collaborators": "CellCollaborators",
			"tasks": "CellTasks",
			"status": "CellStatus",
			"starts_at": "CellDate",
			"ends_at": "CellDate",
			"fixed_budget": "CellCost"
		};

		const filterQuery = ref( null );
		const filteredRecords = computed( () => {
			try {
				if ( !filterQuery.value ) return props.records;
				const query = String( filterQuery.value.toLowerCase().trim() );
				const result = props.records.filter( record => record.title.toLowerCase().includes( query ) );
				return result;
			} catch ( error ) {
				console.error( error );
				return props.records;
			}
		});


		const sortAsc = ref({});
		const sortRows = ( key ) => {
			sortAsc.value[key] = !sortAsc.value[key];
			sortArrayByKey( props.records, key, sortAsc.value[key]);
		};


		const component = key => cellsDict[key] ? cellsDict[key] : cellsDict.default;
		return {
			component,
			sortRows,
			filterQuery,
			filteredRecords
		};
	}
};
</script>


<style lang="stylus" scoped>
.controls
	margin-bottom: 2em
	display: flex
	gap: 1em
svg.icon-empty-state
	width: 8em
	height: 8em
	display: block
	margin: 3em auto
.filters
	display: flex
	align-items: center
	gap: 2em
	margin-bottom: 2em
	.search-input
		flex: 1 1 auto
		max-width: 25em
		margin-right: auto

table
	font-size: 0.85em
	width: 100%
	tr
		border-bottom: 1px solid var(--c-border)
		th, td
			padding: 0.7em 1em
			overflow: hidden
			text-overflow: ellipsis
			white-space: nowrap
		th
			text-align: right
			&:first-child
				.column-title
					justify-content: flex-start

	.column-title
		display: flex
		align-items: center
		justify-content: flex-end
		gap: 0.5em
		color: var(--c-dimmed)
		font-weight: 400
		.title
			text-align: right

</style>

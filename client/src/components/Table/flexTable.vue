<template lang="pug">
.filters
	c-field.search-input(v-if="options.searchable" type="search" icon="search" placeholder="Search" v-model="searchQuery")
	c-dropdown(v-for="filter in filters" :title="filter.title" :selected="selectedFilterTitle(activeFilters[filter.title])")
		c-button(v-for="key in filter.keys" @click="activateFilter(filter.title, filter.field, key)" :title="key.title" type="transparent" fullwidth)

	slot(name="controls")

.flex-table
	.table-head
		.table-row
			.cell(v-for="(title, key) in options.columns" :class="`cell-${key}`")
				.title {{ title }}
				c-button(type="icon" icon="sort" @click="sortRows(key)")
	.table-body
		.table-row(v-if="filteredRecords.length" v-for="record in filteredRecords")
			component(
				v-for="(cell, key) in options.columns"
				:is="component(key)"
				:class="`cell-${key}`"
				:data="record[key]"
				:link="record._id")

icon(v-if="!filteredRecords.length" name="empty-state")
</template>


<script>
import { ref, computed } from "vue";
import { sortArrayByKey } from "~/core/utils.js";

import CellDefault from "./Cells/CellDefault.vue";
import CellLink from "./Cells/CellLink.vue";
import CellDate from "./Cells/CellDate.vue";
import CellCollaborators from "./Cells/CellCollaborators.vue";
import CellTasks from "./Cells/CellTasks.vue";

import CellTitle from "./Cells/CellTitle.vue";
import CellPrice from "./Cells/CellPrice.vue";
import CellStatus from "./Cells/CellStatus.vue";

import cDropdown from "~/components/Inputs/cDropdown.vue";
export default {
	"components": {
		CellDefault,
		
		CellTitle,
		CellPrice,
		CellStatus,

		CellLink,
		CellDate,
		CellCollaborators,
		CellTasks,
		cDropdown
	},
	"props": {
		"options": {
			"type": Object,
			"required": true
		},
		"filters": {
			"type": Array,
			"required": false,
			"default": [
			]
		},
		"documents": {
			"type": Array,
			"required": true
		},
		"searchable": Boolean
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
			"fixed_budget": "CellPrice"
		};


		// filter and Search Documents
		const searchQuery = ref( null );
		const activeFilters = ref({});
		const activateFilter = ( title, field, key ) => activeFilters.value[title] = {
			"title": key.title,
			field,
			"key": key.key
		};
		const selectedFilterTitle = filter => filter ? filter.title : "";
		const filteredRecords = computed( () => {
			let documents;
			try {
				documents = props.documents;
				// filters (filter and mutate documents array)
				const activeFiltersKeys = Object.keys( activeFilters.value ); // get filters (filter = dropdown element)
				if ( activeFiltersKeys.length ) // if active filters exist
					activeFiltersKeys.forEach( ( filterKey ) => { // filter documents (rows) by every existed filter
						const filterBy = activeFilters.value[filterKey].field; // get document's field (table cell) for filtering
						const key = activeFilters.value[filterKey].key; // get filter's key (cell value) for filtering
						if ( !key ) return; // do not filter if empty key (show all)
						documents = documents.filter( document => document[filterBy] === key ); // filter documents by field/key
					});
				// search Query
				if ( !searchQuery.value ) return documents;
				const query = String( searchQuery.value.toLowerCase().trim() );
				documents = documents.filter( document => document.title.toLowerCase().includes( query ) );
				return documents;
			} catch ( error ) {
				console.error( error );
				return documents;
			}
		});

		// sort Documents
		const sortAsc = ref({});
		const sortRows = ( key ) => {
			sortAsc.value[key] = !sortAsc.value[key];
			sortArrayByKey( props.documents, key, sortAsc.value[key]);
		};


		const component = key => cellsDict[key] ? cellsDict[key] : cellsDict.default;

		return {
			component,
			sortRows,
			searchQuery,
			filteredRecords,
			activateFilter,
			activeFilters,
			selectedFilterTitle
		};
	}
};
</script>


<style lang="stylus" scoped>
.flex-table
	.table-row
		display: flex
		gap: 1em
		border-bottom: 1px solid var(--c-border)
		// overflow: hidden
		.cell
			display: flex
			justify-content: flex-end
			align-items: center
			padding: 0.5em
			line-height: 1.2
			width: 13em
			// overflow: hidden
			// min-width: 0
			// text-overflow: ellipsis
			// white-space: nowrap
			&-title
				justify-content: flex-start
				flex: 0 0 20em
			&-price
				flex: 0 0 10em
			&-status
				flex: 0 0 8em
				// max-width: 15em
				



.grid-table
	font-size: 0.85em
	display: grid
	grid-template-columns: repeat(5, auto)
	.cell
		padding: 0.5em
		line-height: 1.2
		display: flex
		align-items: center
		justify-content: flex-end
		overflow: hidden
		// display: inline-block
		min-width: 0
		text-overflow: ellipsis
		white-space: nowrap
		border-bottom: 1px solid var(--c-border)
		&.title
			justify-content: flex-start
			display: inline-block

		

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

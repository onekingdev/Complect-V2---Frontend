<template lang="pug">
.c-table
	.filters(v-if="filters.length > 0")
		c-field.search-input(v-if="searchable" type="search" iconL="search" placeholder="Search..." v-model="searchQuery")
		c-dropdown(v-for="(filter, index) in filters" :key="index" :title="filter.title" :selected="selectedFilterTitle(activeFilters[filter.title])")
			c-button(v-for="key in filter.keys" @click="activateFilter(filter.title, filter.field, key)" :title="key.title" type="transparent" fullwidth)
		slot(name="controls")

	table
		colgroup
			col(v-for="(column, index) in columns" :class="[column.type]" :key="index")
		thead
			tr
				th(v-for="(column, index) in columns" :key="index")
					.cell.column-title(:class="[column.align]")
						.title {{ column.title }}
						c-button(v-if="showSortIcon" type="icon" iconR="sort" @click="sortDocuments(column.key)")
		tbody(v-if="filteredDocuments.length")
			tr(v-for="document in filteredDocuments" :key="document._id")
				td(v-for="(column, index) in columns" :key="index")
					component.cell(
						v-if="document[column.key]"
						:is="column.type"
						:class="[column.align]"
						:meta="column.meta"
						:id="document._id"
						:data="document[column.key]")

	icon(v-if="!filteredDocuments.length" name="empty-state")
</template>


<script>
import { ref, computed, defineAsyncComponent } from "vue";
import { sortArrayByKey } from "~/core/utils.js";
import cDropdown from "~/components/Inputs/cDropdown.vue";
export default {
	"components": {
		cDropdown,
		"Checkbox": defineAsyncComponent( () => import( "./Cells/CellCheckbox.vue" ) ),
		"Title": defineAsyncComponent( () => import( "./Cells/CellTitle.vue" ) ),
		"Date": defineAsyncComponent( () => import( "./Cells/CellDate.vue" ) ),
		"Collaborators": defineAsyncComponent( () => import( "./Cells/CellCollaborators.vue" ) ),
		"Price": defineAsyncComponent( () => import( "./Cells/CellPrice.vue" ) ),
		"Status": defineAsyncComponent( () => import( "./Cells/CellStatus.vue" ) ),
		"Tasks": defineAsyncComponent( () => import( "./Cells/CellTasks.vue" ) ),
		"Progress": defineAsyncComponent( () => import( "./Cells/CellProgress.vue" ) )
	},
	"props": {
		"columns": {
			"type": Array,
			"required": true
		},
		"documents": {
			"type": Array,
			"required": true
		},
		"filters": {
			"type": Array,
			"default": () => [
			]
		},
		"showSortIcon": {
			"type": Boolean,
			"default": true
		},
		"searchable": Boolean
	},
	setup ( props ) {
		// filter and Search Documents
		const searchQuery = ref( "" );
		const activeFilters = ref({});

		const activateFilter = ( title, field, key ) => {
			activeFilters.value[title] = {
				"title": key.title,
				field,
				"key": key.key
			};
		};

		const selectedFilterTitle = filter => filter ? filter.title : "";

		const filteredDocuments = computed( () => {
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
		const sortDocuments = ( key ) => {
			sortAsc.value[key] = !sortAsc.value[key];
			sortArrayByKey( props.documents, key, sortAsc.value[key]);
		};


		return {
			sortDocuments,
			searchQuery,
			filteredDocuments,
			activateFilter,
			activeFilters,
			selectedFilterTitle
		};
	}
};
</script>


<style lang="stylus" scoped>
.c-table
	width: 100%
	.filters
		display: flex
		align-items: center
		gap: 2em
		margin-bottom: 2em
		.search-input
			flex: 1 1 auto
			max-width: 25em
			margin-right: auto

.c-table table
	font-size: 0.85em
	width: 100%
	tr
		border-bottom: 1px solid var(--c-border)
		height: 4em
		th, td
			overflow: hidden
			text-overflow: ellipsis
			white-space: nowrap
	.cell
		display: flex
		justify-content: flex-start
		align-items: center
		line-height: 1.2
		// overflow: hidden
		// text-overflow: ellipsis
		// white-space: nowrap
		padding: 0.7em 1em
		&.center
			justify-content: center
		&.right
			justify-content: flex-end
		&.column-title
			gap: 0.5em
			color: var(--c-dimmed)
			font-weight: 400
			user-select: none

svg.icon-empty-state
	width: 8em
	height: 8em
	display: block
	margin: 3em auto

</style>

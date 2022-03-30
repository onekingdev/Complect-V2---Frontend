<template lang="pug">
.c-table(v-if="!loading")
	.controls(v-if="searchable || filters.length || $slots.actions")
		c-field.search-input(v-if="searchable" type="search" iconL="search" placeholder="Search..." v-model="searchQuery")
		.actions(v-if="filters.length")
			c-dropdown(v-for="(filter, index) in filters" :key="index" :title="filter.title" :selected="selectedFilterTitle(activeFilters[filter.title])" wide)
				c-button(v-for="key in filter.keys" @click="activateFilter(filter.title, filter.field, key)" :title="key.title" type="transparent" fullwidth)
			slot(name="controls")
		.actions
			slot(name="actions")
	.container
		table
			colgroup
				col(v-for="(column, index) in columns" :class="[column.cell]" :key="index")
			thead
				tr
					th(v-for="(column, index) in columns" :key="index" v-bind:width="[column.width]")
						.cell.column-title(:class="[column.align]")
							.title(v-if="column.title") {{ column.title }}
							icon(v-if="column.icon" :name="column.icon.name" :size="column.icon.size" @click="column.icon.handleClick()")
							c-button(v-if="!column.unsortable" type="icon" iconR="sort" @click="sortDocuments(column.key)")
			tbody(v-if="filteredDocuments.length && !isdraggable")
				tr(v-for="document in filteredDocuments" :key="document._id")
					td(v-for="(column, index) in columns" :key="index")
						//- temp suspense solution
						Suspense
							component.cell(
								:is="getTableCell(column.cell)"
								:class="[column.align]"
								:key="column.key"
								:meta="column.meta"
								:id="document._id"
								:document="document"
								:data="document[column.key]"
								:isChecked="document.isChecked"
								@cellEvent="cellEvent")
			draggable.table-tbody(:list="showDocuments" @change="isdraggable.action($event)" v-if="filteredDocuments.length && isdraggable")
				tr(v-for="document in showDocuments" :key="document._id")
					td(v-for="(column, index) in columns" :key="index")
						//- temp suspense solution
						Suspense
							component.cell(
								:is="getTableCell(column.cell)"
								:class="[column.align]"
								:key="column.key"
								:meta="column.meta"
								:id="document._id"
								:data="document[column.key]")

		icon(v-if="!filteredDocuments.length" name="empty-state")
	c-pagination(v-if="documents.length > perPage" :length="documents.length" :perPage="perPage" v-model:currentPage="currentPage")
.loading(v-else)
	c-loading(size="big")
</template>


<script>
import { ref, computed, onMounted, defineAsyncComponent, watch } from "vue";
import { sortArrayByKey } from "~/core/utils.js";
import cPagination from "~/components/Misc/cPagination.vue";
import cDropdown from "~/components/Inputs/cDropdown.vue";
export default {
	"components": { cPagination, cDropdown },
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
			"default": () => []
		},
		"perPage": {
			"type": Number,
			"default": 10
		},
		"loading": {
			"type": Boolean,
			"required": false,
			"default": false
		},
		"searchable": Boolean,
		"isdraggable": {
			"type": Object,
			"default": () => {}
		}
	},
	"emits": ["cellEvent"],
	setup ( props, { emit }) {
		// filter and Search Documents
		const searchQuery = ref( "" );
		const activeFilters = ref({});
		const showDocuments = ref([]);
		const currentPage = ref(1)

		const getTableCell = cell => defineAsyncComponent( () => import( `./Cells/${cell}.vue` ) );

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
				documents.map( document => document.isChecked = false );
				// filters (filter and mutate documents array)
				const activeFiltersKeys = Object.keys( activeFilters.value ); // get filters (filter = dropdown element)
				if ( activeFiltersKeys.length ) { // if active filters exist
					activeFiltersKeys.forEach( filterKey => { // filter documents (rows) by every existed filter
						const filterBy = activeFilters.value[filterKey].field; // get document's field (table cell) for filtering
						const key = activeFilters.value[filterKey].key; // get filter's key (cell value) for filtering
						if ( !key ) return; // do not filter if empty key (show all)
						documents = documents.filter( document => document[filterBy] === key ); // filter documents by field/key
					});
				}

				// search Query
				if ( !searchQuery.value ) return Array.from(documents).splice( props.perPage * ( currentPage.value - 1 ), props.perPage );
				const query = String( searchQuery.value.toLowerCase().trim() );
				documents = documents.filter( document => document.name.toLowerCase().includes( query ) );

				// pagination
				return Array.from(documents).splice( props.perPage * ( currentPage.value - 1 ), props.perPage );
			} catch ( error ) {
				console.error( error );
				return documents;
			}
		});

		// sort Documents
		const sortAsc = ref({});
		const sortDocuments = key => {
			sortAsc.value[key] = !sortAsc.value[key];
			sortArrayByKey( props.documents, key, sortAsc.value[key]);
		};
		watch( () => filteredDocuments.value, () => showDocuments.value = filteredDocuments.value, { "deep": true });

		const cellEvent = id => {
			emit( "cellEvent", id );
		};

		onMounted( () => {
			for( let filter of props.filters )
				activateFilter( filter.title, filter.field, filter.keys[0] );
		});

		return {
			getTableCell,
			sortDocuments,
			searchQuery,
			filteredDocuments,
			activateFilter,
			activeFilters,
			selectedFilterTitle,
			cellEvent,
			currentPage,
			showDocuments
		};
	}
};
</script>


<style lang="stylus" scoped>
.c-table
	width: 100%
	min-width: 0
	.controls
		display: flex
		align-items: center
		margin-bottom: 2em
		gap: 2em
		.search-input
			flex: 1 1 auto
			max-width: 25em
			margin-right: auto
		.actions
			display: flex
			align-items: center
			gap: 1em
.c-table table
	font-size: 0.875em
	width: 100%
	tr
		border-bottom: 1px solid var(--c-border)
		height: 4em
		th, td
			white-space: nowrap
	.cell
		display: flex
		justify-content: flex-start
		align-items: center
		line-height: 1.2
		padding: 0.7em 0.715em
		&.center
			justify-content: center
		&.right
			justify-content: flex-end
			margin-left: auto
		&.column-title
			gap: 0.2em
			color: var(--c-dimmed)
			font-weight: 400
			user-select: none
			:deep(svg.icon-sort)
				fill: var(--c-grey-500)
				margin-right: -0.5em
			.c-button:hover
				:deep(svg.icon-sort)
					fill: #444
		&.c-dropdown
			padding: 0
	.table-tbody
		display: table-row-group
.c-table .c-pagination
	justify-content: flex-start
svg.icon-empty-state
	width: 8em
	height: 8em
	display: block
	margin: 3em auto
.loading
	width: 100%
	height: 100%
	display: flex
	justify-content: center
	align-items: center
</style>

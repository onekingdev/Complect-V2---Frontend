<template lang="pug">
.c-dropdown-table
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
              c-button(v-if="!column.unsortable" type="icon" iconR="sort" @click="sortDocuments(column.key)")
      tbody(v-if="filteredDocuments.length")
        template(v-for="document in filteredDocuments" :key="document._id")
          tr(:class="{'border-none': document.controls?.length && document.showSub}")
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
                  :controlLength="document.controls?.length"
                  :data="document[column.key]"
                  :showSub="document.showSub"
                  :hideShow="() => document.showSub = !document.showSub")
          template(v-if="document.showSub")
            tr(v-for="control in document.controls" :key="control._id")
              td(v-for="(column, index) in controlColumns" :key="index" :class="{'expandable-title': column.cell === 'CellTitle'}" :colspan='column.meta.colspan')
                //- temp suspense solution
                Suspense
                  component.cell(
                    :is="getTableCell(column.cell)"
                    :class="[column.align]"
                    :key="column.key"
                    :meta="column.meta"
                    :id="document._id"
                    :controlId="control._id"
                    :data="document[column.key]")

    icon(v-if="!filteredDocuments.length" name="empty-state")
</template>

<script>
import { ref, computed, onMounted, defineAsyncComponent } from 'vue'
import { sortArrayByKey } from '~/core/utils.js'
export default {
  components: { cDropdown: defineAsyncComponent(() => import('~/components/Inputs/cDropdown.vue')) },
  props: {
    columns: {
      type: Array,
      required: true
    },
    controlColumns: {
      type: Array,
      required: true
    },
    documents: {
      type: Array,
      required: true
    },
    filters: {
      type: Array,
      default: () => []
    },
    searchable: Boolean
  },
  setup (props) {
    // filter and Search Documents
    const searchQuery = ref('')
    const activeFilters = ref({})

    const getTableCell = cell => defineAsyncComponent(() => import(`./Cells/${cell}.vue`))

    const activateFilter = (title, field, key) => {
      activeFilters.value[title] = {
        title: key.title,
        field,
        key: key.key
      }
    }

    const selectedFilterTitle = filter => filter ? filter.title : ''

    const filteredDocuments = computed(() => {
      let documents
      try {
        documents = props.documents
        documents.map(document => document.showSub = false)

        // filters (filter and mutate documents array)
        const activeFiltersKeys = Object.keys(activeFilters.value) // get filters (filter = dropdown element)
        if (activeFiltersKeys.length) { // if active filters exist
          activeFiltersKeys.forEach(filterKey => { // filter documents (rows) by every existed filter
            const filterBy = activeFilters.value[filterKey].field // get document's field (table cell) for filtering
            const key = activeFilters.value[filterKey].key // get filter's key (cell value) for filtering
            if (!key) return // do not filter if empty key (show all)
            documents = documents.filter(document => document[filterBy] === key) // filter documents by field/key
          })
        }

        // search Query
        if (!searchQuery.value) return documents
        const query = String(searchQuery.value.toLowerCase().trim())
        documents = documents.filter(document => document.name.toLowerCase().includes(query))
        return documents
      } catch (error) {
        console.error(error)
        return documents
      }
    })

    // sort Documents
    const sortAsc = ref({})
    const sortDocuments = key => {
      sortAsc.value[key] = !sortAsc.value[key]
      sortArrayByKey(props.documents, key, sortAsc.value[key])
    }

    onMounted(() => {
      for (const filter of props.filters) activateFilter(filter.title, filter.field, filter.keys[0])
    })

    return {
      getTableCell,
      sortDocuments,
      searchQuery,
      filteredDocuments,
      activateFilter,
      activeFilters,
      selectedFilterTitle
    }
  }
}
</script>

<style lang="stylus" scoped>
.c-dropdown-table
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

.c-dropdown-table table
  font-size: 0.875em
  width: 100%
  tr
    border-bottom: 1px solid var(--c-border)
    height: 4em
    th, td
      white-space: nowrap
    .expandable-title
      padding-left: 50px
    &.border-none
      border-bottom: 0
  .cell
    display: flex
    justify-content: flex-start
    align-items: center
    line-height: 1.2
    padding: 0.7em 1em
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

svg.icon-empty-state
  width: 8em
  height: 8em
  display: block
  margin: 3em auto

</style>

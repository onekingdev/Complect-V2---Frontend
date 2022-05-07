<template lang="pug">
c-table(v-bind="{columns, documents, filters}")
  template(#actions)
    c-button(title="Download" type="link")
    c-button(title="Add Security" @click="addSecurity")
</template>

<script>
import { inject } from "vue"
import { securityData } from '~/data/data.js'
export default {
  setup () {
    const modal = inject('modal')
    const documents = securityData
    const updateSecurity = () => { }
    const addSecurity = () => modal({ name: 'cModalSecurity', callback: updateSecurity })
    const handleClickEdit = id => modal({ name: 'cModalSecurity', callback: updateSecurity, id })
    const handleClickDelete = id => modal({ name: 'cModalDelete', id, title: 'Security', description: 'Deleting the Security will remove it from your trade records.', callback: updateSecurity })
    const columns = [
      {
        title: 'Ticker Name',
        key: 'tickerName',
        cell: 'CellDefault'
      },
      {
        title: 'Date Created',
        key: 'createdAt',
        cell: 'CellDate'
      },
      {
        unsortable: true,
        cell: 'CellDropdown',
        meta: {
          actions: [
            { title: 'Edit', action: handleClickEdit }, { title: 'Delete', action: handleClickDelete }
          ]
        },
        align: 'right'
      }
    ]

    const filters = [{
      title: 'Sort By:',
      field: 'tickerName',
      keys: [
        {
          title: 'A-Z',
          key: ''
        },
        {
          title: 'Z-A',
          key: ''
        }
      ]
    }]

    return {
      columns,
      addSecurity,
      documents,
      filters
    }
  }
}
</script>

<style lang="stylus" scoped>
.c-table
  :deep(.controls)
    justify-content: space-between
</style>

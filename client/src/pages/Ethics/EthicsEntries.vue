<template lang="pug">
page-container(:title="title")
  template(#content)
    c-table(v-bind="{columns, documents, filters}")
</template>

<script>

import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { ethicsData } from '~/data/data.js'

export default {
  setup () {
    const route = useRoute()
    const titles = { attestation: 'Attestation', logs: 'Logs', approval: 'Pre-Approval' }
    const title = computed(() => titles[route.query.type])
    const columns = [
      {
        title: 'Name',
        key: 'name',
        cell: 'CellTitle',
        width: '35%',
        meta: { link: 'EthicsEntry' }
      },
      {
        title: 'Status',
        key: 'status',
        cell: 'CellStatus'
      },
      {
        title: 'Last Modified',
        key: 'lastModified',
        cell: 'CellDate'
      },
      {
        title: 'Last Modified By',
        key: 'lastModifiedBy',
        cell: 'CellDefault'
      },
      {
        title: 'Date Created',
        key: 'dateCreated',
        cell: 'CellDate'
      }
    ]

    const filters = [{
      title: 'Sort By:',
      field: 'status',
      keys: [
        {
          title: 'Last Modified',
          key: ''
        }, {
          title: 'Date Created',
          key: 'inprogress'
        }
      ]
    }]

    const documents = computed(() => ethicsData.filter(doc => doc.type === route.query.type))

    return { columns, documents, filters, title }
  }
}
</script>

<style lang="stylus" scoped>
.c-table
  :deep(.controls)
    margin-bottom: 0
</style>

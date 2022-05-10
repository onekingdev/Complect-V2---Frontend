<template lang="pug">
//- c-table(v-bind="{columns, documents, filters}")
c-dropdown-table(v-bind="{columns, controlColumns, documents, filters}")
  template(#controls)
    c-field(type="date" v-model="dateRange.start")
    span to
    c-field(type="date" v-model="dateRange.end")
  template(#actions)
    c-button(title="Download" type="link")
    c-button(title="Add Transaction" @click="addTransaction")
</template>

<script>
import { ref, inject, computed } from 'vue'
import { randomNumber } from '~/_devmode/generator/components/atoms/utils.js'
import { randomDatesInRange } from '~/_devmode/generator/components/molecules/randomDate.js'
import { transactionData } from '~/data/data.js'
export default {
  setup () {
    const modal = inject('modal')
    const documents = transactionData
    const dateRange = ref({
      start: randomDatesInRange({ q: 1, shift: [-50, 0] })[0],
      end: randomDatesInRange({ q: 1, shift: [-50, 0] })[0] + randomNumber(1e5, 1e10)
    })
    const updateTransaction = () => {}
    const addTransaction = () => modal({ name: 'cModalTransaction', callback: updateTransaction })
    const handleClickEdit = id => modal({ name: 'cModalTransaction', callback: updateTransaction, id })
    const handleClickDelete = id => modal({ name: 'cModalDelete', id, title: 'Transaction', description: 'Deleting the transaction will remove it from your trade records.', callback: updateTransaction })
    const ApprovedColumns = [
      {
        title: 'Employee Name',
        key: 'employeeName',
        cell: 'CellTitle',
        meta: { expandable: true }
      },
      {
        title: 'Account Number',
        key: 'accountNumber',
        cell: 'CellDefault'
      },
      {
        title: 'Ticker',
        key: 'ticker',
        cell: 'CellTransaction'
      },
      {
        title: 'CUSIP',
        key: 'cusip',
        cell: 'CellDefault'
      },
      {
        title: 'Action',
        key: 'action',
        cell: 'CellStatus'
      },
      {
        title: 'Quantity',
        key: 'quantity',
        cell: 'CellDefault'
      },
      {
        title: 'Cost',
        key: 'cost',
        cell: 'CellPrice'
      },
      {
        title: 'Date',
        key: 'date',
        cell: 'CellDate'
      },
      {
        title: 'Type',
        key: 'type',
        cell: 'CellDefault'
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

    const UnapprovedColumns = [
      {
        title: 'Date',
        key: 'date',
        cell: 'CellDate'
      },
      {
        title: 'Employee Name',
        key: 'employeeName',
        cell: 'CellTitle'
      },
      {
        title: 'Account Number',
        key: 'accountNumber',
        cell: 'CellDefault'
      },
      {
        title: 'Ticker',
        key: 'ticker',
        cell: 'CellTransaction'
      },
      {
        title: 'CUSIP',
        key: 'cusip',
        cell: 'CellDefault'
      },
      {
        title: 'Action',
        key: 'action',
        cell: 'CellStatus'
      },
      {
        title: 'Quantity',
        key: 'quantity',
        cell: 'CellDefault'
      },
      {
        title: 'Cost',
        key: 'cost',
        cell: 'CellPrice'
      },
      {
        title: 'Type',
        key: 'type',
        cell: 'CellDefault'
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

    const columns = computed(() => documents.value[0].isApproved ? ApprovedColumns : UnapprovedColumns)

    const controlColumns = ref([
      {
        title: 'Name',
        key: 'reviewDescription',
        cell: 'CellTitle',
        width: '50%',
        meta: {
          expandable: true,
          colspan: 8,
          border: false
        }
      }
    ])

    const filters = [{
      title: 'Filter By:',
      field: 'action',
      keys: [
        {
          title: 'All',
          key: ''
        },
        {
          title: 'Buy',
          key: 'buy'
        },
        {
          title: 'Sell',
          key: 'sell'
        }
      ]
    }]

    return {
      columns,
      controlColumns,
      documents,
      filters,
      addTransaction,
      dateRange
    }
  }
}
</script>

<style lang="stylus" scoped>
.c-dropdown-table
  :deep(.controls)
    justify-content: space-between
  :deep(.expandable-title)
    padding-left: 0 !important
</style>

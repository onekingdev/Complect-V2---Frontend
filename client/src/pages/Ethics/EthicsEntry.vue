<template lang="pug">
card-container(title="All Entries")
  template(#controls)
    c-button(title="New Entry" type="primary" @click="newEthicsEntry()")
  template(#content)
    c-table(v-bind="{columns, documents, filters}")
</template>

<script>
import { inject } from "vue"
import { ethicsAllEntriesData } from "~/data/data.js"
export default {
  props: {
    ethicsDetails: {
      type: String,
      required: true
    }
  },
  setup (props) {
    const modal = inject("modal")
    const updateEthics = () => {}
    const handleClickEdit = id => modal({ name: "cModalEthics", callback: updateEthics, id })
    const handleClickDelete = id => modal({ name: "cModalDelete", id, title: "Entry", description: "Deleting the entry will permanently remove it from your log.", callback: updateEthics })
    const newEthicsEntry = () => modal({ name: "cModalEthics", callback: updateEthics })

    const columns = [
      {
        title: "Date Submitted",
        key: "dateSubmitted",
        cell: "CellDate"
      },
      {
        title: "Respondent",
        key: "respondent",
        cell: "CellDefault"
      },
      {
        title: "Status",
        key: "status",
        cell: "CellStatus"
      },
      {
        title: "Date Reviewed",
        key: "dateReviewed",
        cell: "CellDate"
      },
      {
        title: "Date of Transaction",
        key: "dateOfTransaction",
        cell: "CellDate"
      },
      {
        title: "Gift Type",
        key: "giftType",
        cell: "CellDefault"
      },
      {
        title: "External Organization",
        key: "externalOrganization",
        cell: "CellDefault"
      },
      {
        title: "Cost of Transaction",
        key: "costOfTransaction",
        cell: "CellDefault"
      },
      {
        title: "Cost of Transaction",
        key: "reasonForGift",
        cell: "CellDefault"
      },
      {
        unsortable: true,
        cell: "CellDropdown",
        meta: {
          actions: [
            { title: "Edit", action: handleClickEdit }, { title: "Delete", action: handleClickDelete }
          ]
        },
        align: "right"
      }
    ]

    const filters = [{
      title: "Sort By:",
      field: "status",
      keys: [
        {
          title: "Date Submitted",
          key: ""
        }, {
          title: "Date Reviewed",
          key: "draft"
        }, {
          title: "Date of Transaction",
          key: "inprogress"
        }
      ]
    }]

    const documents = ethicsAllEntriesData.filter(doc => doc.ethics_id === props.ethicsDetails._id)

    return {
      documents,
      columns,
      filters,
      newEthicsEntry
    }
  }
}
</script>

<style lang="stylus" scoped>
.c-table
  :deep(.controls)
    margin-bottom: 0
</style>

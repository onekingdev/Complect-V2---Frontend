<template lang="pug">
.task-container
  card-container(title="Tasks")
    template(#controls)
      c-button(title="New Task" @click="openTaskModal()")
    template(#content)
      c-table(v-bind="{columns, documents}")
</template>

<script>
import { inject, onMounted } from 'vue'
import TaskService from '~/services/tasks.js'
export default {
  setup () {
    const tasks = new TaskService()
    const modal = inject('modal')

    const openTaskModal = () => modal({ name: 'cModalTask' })
    const handleClickEdit = id => modal({ name: 'cModalTask', id })
    const handleClickDelete = id => tasks.deleteDocuments(id)

    const columns = [
      {
        title: 'Name',
        key: 'name',
        cell: 'CellTask'
      },
      {
        title: 'Assignee',
        key: 'assigned',
        cell: 'CellAssigned'
      },
      {
        title: 'Start Date',
        key: 'startsAt',
        cell: 'CellDate',
        align: 'right'
      },
      {
        title: 'End Date',
        key: 'endsAt',
        cell: 'CellDate',
        align: 'right',
        meta: { overdueWarning: true }
      },
      {
        unsortable: true,
        cell: 'CellDropdown',
        meta: {
          actions: [
            { title: 'Edit', action: handleClickEdit }, { title: 'Delete', action: handleClickDelete }
          ]
        }
      }
    ]

    onMounted(() => tasks.readDocuments())

    return {
      columns,
      documents: tasks.documents,
      openTaskModal
    }
  }
}
</script>

<style lang="stylus" scoped>
.task-container
  width: 82%
  margin: auto
</style>

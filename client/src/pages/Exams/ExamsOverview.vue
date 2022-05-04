<template lang="pug">
c-table(v-bind="{columns, documents}")
</template>

<script>
import { onMounted, onUnmounted, inject, ref } from 'vue'
import { appState } from '~/store/appState'
import ExamService from '~/services/exams.js'

export default {
  setup () {
    const modal = inject('modal')
    const exams = new ExamService()

    const documents = ref([])

    const handleSuccess = updatedExam => {
      const index = documents.value.findIndex(item => item.id === updatedExam.id)

      documents.value[index] = { ...updatedExam, status: updatedExam.completed ? 'complete' : 'inprogress' }
    }

    const callBack = { handleSuccess }

    const handleClickEdit = id => modal({ name: 'cModalExam', id, callBack })
    const handleDeleteExamSuccess = id => {
      const index = documents.value.findIndex(item => item.id === id)
      if (index > -1) documents.value.splice(index, 1)
    }
    const handleDeleteExam = id => {
      modal({
        name: 'cModalDelete',
        id,
        title: 'Exam',
        description: 'Removing this exam will delete any progress and tasks associated with the file.',
        collection: 'exams',
        callback: handleDeleteExamSuccess
      })
    }

    const columns = [
      {
        title: 'Name',
        key: 'name',
        cell: 'CellTitle',
        meta: { link: 'ExamDetail' }
      },
      {
        title: 'Status',
        key: 'status',
        cell: 'CellStatus'
      },
      {
        title: 'Date Created',
        key: 'createdAt',
        cell: 'CellDate',
        align: 'right'
      },
      {
        title: 'Last Modified',
        key: 'modifiedAt',
        cell: 'CellDate',
        align: 'right'
      },
      {
        unsortable: true,
        cell: 'CellDropdown',
        meta: {
          actions: [
            { title: 'Edit', action: handleClickEdit }, { title: 'Delete', action: handleDeleteExam }
          ]
        }
      }
    ]

    onMounted(async () => {
      const userId = appState.value.userId
      await exams.readDocuments(null, { userid: userId })
      documents.value = exams.getDocuments().value.map(item => ({ ...item, status: item.completed ? 'complete' : 'inprogress' }))
    })

    onUnmounted(() => exams.clearStore())

    return {
      columns,
      documents
    }
  }
}
</script>

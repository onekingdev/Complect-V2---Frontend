<template lang="pug">
c-banner(title="Key Regulatory Developments 2021" message="New regulatory changes can have an impact on your policies and procedures.")
  template(#controls)
    a(href='https://www.sec.gov/exams' target='_blank')
      c-button(title="View" @click="viewPolicy()")
.rules-block Rule 206(4)-7 under the Advisers Act requires that you conduct a review of your compliance program no less than annually. You can document this review and other internal reviews here.
c-table(v-bind="{columns, documents}")
c-modal(title="Delete Internal Review" v-model="isDeleteVisible")
  template(#content)
    .delete-container
      .div
        icon(name="error" size="big")
      .description
        p Removing this internal review will delete any progress, tasks, and documents associated with the review.
        p.confirm Do you want to continue?
  template(#footer)
    c-button(title="Confirm" type="primary" @click="handleClickDelete()")
</template>

<script>
import { onMounted, onUnmounted, inject, ref } from 'vue'
import UseData from '~/store/Data.js'
import cBanner from '~/components/Misc/cBanner.vue'
import cModal from '~/components/Misc/cModal.vue'
import { notifyMessages } from '~/data/notifications.js'
export default {
  components: { cBanner, cModal },
  setup () {
    const reviews = new UseData('reviews')
    const notification = inject('notification')
    const modal = inject('modal')
    const isDeleteVisible = ref(false)
    let clickedId
    const toggleDeleteModal = id => {
      isDeleteVisible.value = !isDeleteVisible.value
      clickedId = id
    }
    const handleClickEdit = id => modal({ name: 'cModalReview', id })
    const handleClickDelete = async () => {
      try {
        await reviews.deleteDocuments(clickedId)
        notification({
          type: 'success',
          title: 'Success',
          message: notifyMessages.review.delete.success
        })
      } catch (error) {
        console.error(error)
        notification({
          type: 'error',
          title: 'Error',
          message: notifyMessages.review.delete.error
        })
      }
    }
    const handleClickDuplicate = async id => {
      const index = reviews.getDocuments().value.findIndex(doc => doc._id === id)
      try {
        await reviews.createDocuments([reviews.getDocuments().value[index]])
        notification({
          type: 'success',
          title: 'Success',
          message: notifyMessages.review.duplicate.success
        })
      } catch (error) {
        console.error(error)
        notification({
          type: 'error',
          title: 'Error',
          message: notifyMessages.review.duplicate.error
        })
      }
    }
    const columns = [
      {
        title: 'Name',
        key: 'name',
        cell: 'CellTitle',
        width: '25%',
        meta: { link: 'ReviewDetail' }
      },
      {
        title: 'Progress',
        key: 'progress',
        cell: 'CellProgress',
        width: '25%'
      },
      {
        title: 'Findings',
        key: 'finding',
        cell: 'CellDefault',
        align: 'right'
      },
      {
        title: 'Last Modified',
        key: 'lastModified',
        cell: 'CellDate',
        align: 'right'
      },
      {
        title: 'Date Created',
        key: 'dateCreated',
        cell: 'CellDate',
        align: 'right'
      },
      {
        unsortable: true,
        cell: 'CellDropdown',
        width: '35px',
        meta: {
          actions: [
            { title: 'Edit', action: handleClickEdit }, { title: 'Duplicate', action: handleClickDuplicate }, { title: 'Delete', action: toggleDeleteModal }
          ]
        }
      }
    ]
    const getProgress = review => {
      let current, finding
      current = 0
      finding = 0
      const max = review.categories.length + 1
      if (review.completedAt) current += 1
      review.categories.forEach(category => {
        if (category.completedAt) current += 1
        category.content.forEach(topic => {
          topic.items.forEach(item => {
            finding += item.finding.length
          })
        })
      })
      review.progress = { max, current }
      review.finding = finding
    }
    onMounted(async () => {
      await reviews.readDocuments()
      reviews.getDocuments().value.forEach(review => {
        getProgress(review)
      })
    })
    onUnmounted(() => reviews.clearStore())
    return {
      columns,
      documents: reviews.getDocuments,
      isDeleteVisible,
      handleClickDelete
    }
  }
}
</script>

<style lang="stylus" scoped>
.rules-block
  font-size: 0.9em
  margin: 1em 0
.minuse
  width: 1.5em
  height: 1.5em
  margin: 0 auto
.delete-container
  display: flex
  gap: 1.25em
  .description
    font-size: 0.875em
    .confirm
      padding-top: 0.625em
      font-weight: bold
</style>

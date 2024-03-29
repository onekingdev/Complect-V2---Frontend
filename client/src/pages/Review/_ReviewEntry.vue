<template lang="pug">
page-container(section="Internal Review" :title="document.name" type="document")
  template(#controls)
    c-button(title="Export" @click="exportReview()")
    c-button(title="Save and Exit" type="primary" @click="saveAndExit()")
    c-button(type="icon" iconL="close" size="small" @click="closeDetail()")
  template(#tabs)
    router-link(v-for="(tab, index) in tabs" :key="index" :to="{name: tab.routeName}") {{ $locale(tab.title) }}
  template(#navigation-controls)
    c-dropdown(title="Actions" wide)
      c-button(title="Edit" type="transparent" @click="editReview()")
      c-button-modal(title="Delete" type="transparent" modalTitle="Delete Internal Review")
        template(#content)
          .delete-container
            div
              icon(name="error" size="big")
            .description
              p Removing this internal review will delete any progress, tasks, and documents associated with the review.
              p.confirm Do you want to continue?
        template(#footer)
          c-button(title="Confirm" type="primary" @click="deleteReiew()")
  template(#content)
    router-view
c-modal(title="Confirm Unsaved Changes" v-model="isDeleteVisible")
  template(#content)
    .delete-container
      div
        icon(name="error" size="big")
      .description
        p You have unsaved changes. Exiting without saving will clear all unsaved information.
        p.confirm Do you want to continue?
  template(#footer)
    c-button(title="Confirm" type="primary" @click="handleUnsavedClick()")
</template>

<script>
import { onMounted, onUnmounted, inject, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ReviewService from '~/services/reviews.js'
import cDropdown from '~/components/Inputs/cDropdown.vue'
import cModal from '~/components/Misc/cModal.vue'
import cCheckbox from '~/components/Inputs/cCheckbox.vue'
import { generatePDF } from '~/services/pdf.js'
import { notifyMessages } from '~/data/notifications.js'
export default {
  components: {
    cDropdown,
    cCheckbox,
    cModal
  },
  setup () {
    const reviews = new ReviewService()
    const route = useRoute()
    const notification = inject('notification')
    const router = useRouter()
    const modal = inject('modal')
    const isDeleteVisible = ref(false)

    const tabs = [
      {
        title: 'Detail',
        routeName: 'ReviewDetail'
      }, {
        title: 'Tasks',
        routeName: 'ReviewTasks'
      }, {
        title: 'Documents',
        routeName: 'ReviewDocuments'
      }
    ]

    const editReview = () => modal({ name: 'cModalReview', id: reviews.getDocument().value.id })

    const deleteReiew = async () => {
      try {
        await reviews.deleteDocuments(route.params.id)
        notification({
          type: 'success',
          title: 'Success',
          message: notifyMessages.review.delete.success
        })
        router.push({ name: 'ReviewsOverview' })
      } catch (error) {
        console.error(error)
        notification({
          type: 'error',
          title: 'Error',
          message: notifyMessages.review.delete.error
        })
      }
    }

    const closeDetail = () => {
      if (reviews.documentJson.value === JSON.stringify(reviews.getDocument().value)) router.push({ name: 'ReviewsOverview' })
      else isDeleteVisible.value = !isDeleteVisible.value
    }

    const handleUnsavedClick = () => {
      router.push({ name: 'ReviewsOverview' })
    }

    const exportReview = async () => {
      let flag
      flag = true
      flag = flag && reviews.getDocument().value.completedAt
      reviews.getDocument().value.categories.forEach(category => {
        flag = flag && category.completedAt
      })
      if (flag) {
        const reviewId = reviews.getDocument().value.id
        const pdfData = {
          collection: 'reviews',
          template: 'internalReport',
          id: reviewId
        }
        const pdfLink = await generatePDF(pdfData)
        window.location.href = pdfLink
      } else {
        notification({
          type: 'error',
          title: 'Error',
          message: notifyMessages.review.create.validate
        })
      }
    }

    const saveAndExit = async () => {
      try {
        await reviews.updateDocument(reviews.getDocument().value.id, reviews.getDocument().value)
        notification({
          type: 'success',
          title: 'Success',
          message: notifyMessages.review.save.success
        })
        router.push({ name: 'ReviewsOverview' })
      } catch (error) {
        console.error(error)
        notification({
          type: 'error',
          title: 'Error',
          message: notifyMessages.review.save.error
        })
      }
    }

    onMounted(() => reviews.readDocuments(route.params.id))
    onUnmounted(() => reviews.clearStore())

    return {
      tabs,
      document: reviews.getDocument(),
      isDeleteVisible,
      editReview,
      exportReview,
      saveAndExit,
      closeDetail,
      handleUnsavedClick,
      deleteReiew
    }
  }
}
</script>

<style lang="stylus" scoped>
  .page-container
    :deep(.router-link-active)
      box-shadow: inset 0 -4px 0 0 var(--c-gold);
      font-weight: bold
  .delete-container
    display: flex
    gap: 1.25em
    .description
      font-size: 0.875em
      .confirm
        padding-top: 0.625em
        font-weight: bold
</style>

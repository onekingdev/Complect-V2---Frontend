<template lang="pug">
vertical-detail
  template(#list)
    .category(@click="selectGeneral()")
      .title(:class="{ active: isGeneral }") General
      icon.icon-r(name="check" v-if="!document.completedAt")
      icon.icon-r(name="success" v-else)
    .category(v-for="(category, index) in document.categories" :key="index" @click="selectCategory(index)")
      .title(:class="{ active: index == catId && !isGeneral }") {{ category.title }}
      icon.icon-r(name="check" v-if="!category.completedAt")
      icon.icon-r(name="success" v-else)
    c-button.new-category(v-if="state.isButton" title="New Category" iconL="circle_plus" @click="toggleCategory()")
    c-field(v-else type="text" @change="createCategory()" v-model="state.categoryName" fullwidth wide)
  template(#content)
    detail-container.detail-container(v-if="isGeneral" title="General")
      template(#content)
        .sub-item-container
          .sub-title Review Period
          .date-range-container
            c-field(label="Start Date" type="date" v-model="document.startsAt" fullwidth)
            c-field(label="End Date" type="date" v-model="document.endsAt" fullwidth)
        .sub-item-container
          .sub-title Material Business Changes
          p List any changes to your business processes, key vendors, and/or key employees during the Review Period
          c-textarea.business-change(label="" v-model="document.businessChanges" autosize)
        .sub-item-container
          .sub-title Material Regulatory Changes
          p List any regulatory changes that impacted you during the Review Period and how the business responded.
          .regulatory-entry(v-for="(regulatoryChange, i) in document.regulatoryChanges" :key="i")
            c-textarea(label="Change" placeholder="Describe the change" v-model="regulatoryChange.change")
            c-textarea(label="Response" placeholder="Describe the response" v-model="regulatoryChange.response")
            c-button-modal(type="transparent" icon="close" modalTitle="Delete Item")
              template(#content)
                .delete-container
                  div
                    icon(name="error" size="big")
                  .description
                    p This entry will be removed from the internal review.
                    p.confirm Do you want to continue?
              template(#footer)
                c-button(title="Confirm" type="primary" @click="deleteRegulatoryChange(document.regulatoryChanges, i)")
          c-button(title="Add Entry" iconL="circle_plus" @click="addRegulatoryChange()")
        .sub-item-container
          .sub-title Key Employees Interviewed
          p
            | Regulators interview employees to uncover potential discrepancies in a firm's policies and procedures and their day-to-day practicies.
            | It's important to interview those employees responsible for certain key tasks or have access to sensitive client in order to hear about their
            | day-to-day activities in their own words.
          .employee-label
            .label Employee Name
            .label Title/Role
            .label Department
            .empty
          .employee-entry(v-for="(interviewItem, index) in document.employeesInterviewed" :key="index")
            c-field(type="text" placeholder="Enter Name" v-model="interviewItem.name" fullwidth)
            c-field(type="text" placeholder="Enter Title" v-model="interviewItem.role" fullwidth)
            c-field(type="text" placeholder="Enter Department" v-model="interviewItem.department" fullwidth)
            icon.icon-r(name="close" @click="deleteEmployeesInterviewed(document.employeesInterviewed, j)")
          c-button(title="Add Entry" iconL="circle_plus" @click="addEmployeesInterviewed()")
      template(#footer)
        .empty
        .buttons
          c-button(title="Save" @click="updateReview()")
          c-button-modal(:title="btnTitle" type="primary" :modalTitle="completeModalTitle")
            template(#content)
              .complete-container
                div
                  icon(name="success" size="big")
                .description
                  p {{ document.completedAt ? "This will mark the category as incomplete and your progress will be updated." : "This will mark the category as complete and your progress will be updated."}}
                  p.confirm Do you want to continue?
            template(#footer)
              c-button(title="Confirm" type="primary" @click="completeReview()")
    router-view(v-else v-model:reviewCategory="reviewCategory")
</template>

<script>
import { ref, computed, inject } from 'vue'
import { useRouter } from 'vue-router'
import UseData from '~/store/Data.js'
import VerticalDetail from '~/components/Containers/VerticalDetail.vue'
export default {
  components: { VerticalDetail },
  setup () {
    const reviews = new UseData('reviews')
    const notification = inject('notification')
    const router = useRouter()
    const reviewCategory = ref({})
    const isGeneral = ref(true)
    const catId = ref(null)
    const state = ref({
      isButton: true,
      categoryName: ''
    })
    const btnTitle = computed(() => reviews.getDocument().value.completedAt ? 'Mark as Incomplete' : 'Mark as Complete')
    const completeModalTitle = computed(() => reviews.getDocument().value.completedAt ? 'Incomplete Category' : 'Complete Category')
    const selectGeneral = () => {
      isGeneral.value = true
      router.push({
        name: 'ReviewDetail',
        params: { id: reviews.getDocument().value._id }
      })
    }
    const selectCategory = id => {
      isGeneral.value = false
      catId.value = id
      reviewCategory.value = reviews.getDocument().value.categories[id]
      router.push({ name: 'ReviewCategory', params: { catId: id } })
    }
    const updateReview = async () => {
      try {
        await reviews.updateDocument(reviews.getDocument().value._id, reviews.getDocument().value)
        notification({ type: 'success', title: 'Success', message: 'Category has been updated.' })
      } catch (error) {
        console.error(error)
        notification({ type: 'error', title: 'Error', message: 'Category has not been updated. Please try again.' })
      }
    }
    const completeReview = async () => {
      const timestamp = reviews.getDocument().value.completedAt ? null : Date.now()
      try {
        await reviews.updateDocument(reviews.getDocument().value._id, { completedAt: timestamp })
        notification({
          type: 'success',
          title: 'Success',
          message: `Category has been marked as ${timestamp ? 'complete' : 'incomplete'}.`
        })
      } catch (error) {
        console.error(error)
        notification({
          type: 'error',
          title: 'Error',
          message: `Category has not been marked as ${timestamp ? 'complete' : 'incomplete'}. Please try again.`
        })
      }
    }
    const addRegulatoryChange = () => reviews.getDocument().value.regulatoryChanges.push({ change: '', response: '' })
    const addEmployeesInterviewed = () => reviews.getDocument().value.employeesInterviewed.push({ name: '', role: '', department: '' })
    const deleteRegulatoryChange = (regulatoryChange, index) => {
      regulatoryChange.splice(index, 1)
      notification({ type: 'success', title: 'Success', message: 'Entry has been deleted.' })
    }
    const deleteEmployeesInterviewed = (employeesInterviewed, index) => employeesInterviewed.splice(index, 1)
    const toggleCategory = () => state.value.isButton = !state.value.isButton
    const createCategory = async () => {
      state.value.isButton = !state.value.isButton
      reviews.getDocument().value.categories.push({ title: state.value.categoryName, content: [], completedAt: null })
      state.value.categoryName = ''
      try {
        await reviews.updateDocument(reviews.getDocument().value._id, { categories: reviews.getDocument().value.categories })
        notification({ type: 'success', title: 'Success', message: 'Category has been added.' })
        isGeneral.value = false
        catId.value = reviews.getDocument().value.categories.length - 1
        reviewCategory.value = reviews.getDocument().value.categories[catId.value]
        router.push({
          name: 'ReviewCategory',
          params: { catId: catId.value }
        })
      } catch (error) {
        console.error(error)
        notification({ type: 'error', title: 'Error', message: 'Category has not been added. Please try again.' })
      }
    }
    return {
      document: reviews.getDocument(),
      state,
      reviewCategory,
      createCategory,
      selectGeneral,
      isGeneral,
      catId,
      addRegulatoryChange,
      addEmployeesInterviewed,
      updateReview,
      completeReview,
      deleteRegulatoryChange,
      deleteEmployeesInterviewed,
      selectCategory,
      btnTitle,
      completeModalTitle,
      toggleCategory
    }
  }
}
</script>

<style lang="stylus" scoped>
.category
  display: flex
  cursor: pointer
  align-items: center
  justify-content: space-between
  margin-bottom: 1.25em
  .title
    display: inline-block
    -webkit-line-clamp: 1
    -webkit-box-orient: vertical
    overflow: hidden
    text-overflow: ellipsis
    font-size: 1em
    font-weight: 300
    color: #a2a3a9
    &:hover
      color: #2180c2
    &.active
      font-weight: 600
      color: #2180c2
  .icon
    font-size: 1.25em
    fill: #cecfd2
    &.active
      fill: #1ab27f
.sub-item-container
  border-bottom: 1px solid #dcdee4
  padding: 1.25em 0
  p
    margin-bottom: 1.14286em
    font-size: 0.875em
  .sub-title
    margin-bottom: 0.5em
    font-size: 1.25em
    font-weight: bold
  .date-range-container
    display: flex
    margin-right: -1em
    margin-left: -1em
    .c-field
      position: relative
      width: 100%
      padding-right: 1em
      padding-left: 1em
  .business-change
    :deep(.field-body)
      resize: none
      overflow: hidden
  .regulatory-entry
    display: flex
    align-items: center
    margin-left: -15px
    .c-textarea
      padding: 0 15px
      :deep(.field-body)
        overflow-y: auto
    .c-button-modal
      position: relative
      top: 8px
      cursor: pointer
      :deep(.c-button)
        padding: 0
      :deep(svg)
        font-size: 0.75em
        fill: #212529
    .icon
      top: 4.425em
      position: relative
      font-size: 0.75em
  .employee-label, .employee-entry
    display: flex
    gap: 1.5em
  .employee-label
    margin-bottom: 0.5em
    .label
      flex: 1
      font-size: 0.875em
      color: #797b7e
    .empty
      width: 0.875em
  .employee-entry
    align-items: center
    margin-bottom: 1em
    .icon
      font-size: 0.75em
      fill: #212529
      cursor: pointer
  .c-button
    margin-top: 1em
.buttons
  display: flex
  gap: 0.75em
.delete-container, .complete-container
  display: flex
  gap: 1.25em
  .description
    font-size: 0.875em
    .confirm
      padding-top: 0.625em
      font-weight: bold

</style>

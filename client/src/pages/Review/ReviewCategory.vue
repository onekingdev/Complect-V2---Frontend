<template lang="pug">
detail-container
  template(#header)
    c-field.category-title(type="text" placeholder="Enter category name" v-model="category.name" fullwidth transparent)
  template(#controls)
    c-button-modal(title="Delete" modalTitle="Delete Category")
      template(#content)
        .delete-container
          div
            icon(name="error" size="big")
          .description
            p This will remove the category from this internal review and all of its associated content.
            p.confirm Do you want to continue?
      template(#footer)
        c-button(title="Confirm" type="primary" @click="deleteCategory()")
  template(#content)
    .category-container(v-for="(topic, i) in category.content" :key="i")
      .topic-container.grid-12
        .topic-text
          c-textarea(placeholder="Add Topic" v-model="topic.topicContent" autosize)
        .topic-action
          c-dropdown.right(title="Actions")
            c-button(title="Add Items" type="transparent" @click="addItem(topic)")
            c-button(title="New Task" type="transparent" @click="newTask()")
            c-button-modal(title="Delete" type="transparent" modalTitle="Delete Topic")
              template(#content)
                .delete-container
                  div
                    icon(name="error" size="big")
                  .description
                    p This will remove the topic from this internal review and all of its associated content.
                    p.confirm Do you want to continue?
              template(#footer)
                c-button(title="Confirm" type="primary" @click="deleteTopic(category.content, i)")
      .item-container(v-for="(item, j) in topic.items" :key="j")
        .item.grid-12
          .item-checkboxes
            .reviews-checkbox
              .checkbox.checkbox-true(:class="{ checked: item.flag }" @click="selectCheck(item, true)")
                icon.icon-r(name="check_simple" size="tiny")
              .checkbox.checkbox-false(:class="{ checked: !item.flag }" @click="selectCheck(item, false)")
                icon.icon-r(name="close" size="tiny")
          .item-text
            c-textarea(placeholder="New Item" v-model="item.itemContent" autosize)
          .item-action
            c-dropdown.right(iconR="more" type="transparent")
              c-button(title="Log Finding" type="transparent" @click="addLogFinding(item)")
              c-button-modal(title="Delete" type="transparent" modalTitle="Delete Item")
                template(#content)
                  .delete-container
                    div
                      icon(name="error" size="big")
                    .description
                      p This will remove the topic from this internal review and all of its associated content.
                      p.confirm Do you want to continue?
                template(#footer)
                  c-button(title="Confirm" type="primary" @click="deleteItem(topic.items, j)")
        .finding.grid-12(v-for="(finding, k) in item.finding" :key="k")
          .finding-empty
          c-textarea(label="Finding" v-model="finding.findingContent" autosize)
          .finding-delete
            c-button-modal(type="transparent" icon="close" modalTitle="Delete Finding")
              template(#content)
                .delete-container
                  div
                    icon(name="error" size="big")
                  .description
                    p This will remove the finding from this internal review.
                    p.confirm Do you want to continue?
              template(#footer)
                c-button(title="Confirm" type="primary" @click="deleteFinding(item.finding, k)")
  template(#footer)
    c-button(title="Add Topic" iconL="circle_plus" @click="addTopic()")
    .end-buttons
      c-button(title="Save" @click="updateCategory()")
      //- c-button(:title="btnTitle" type="primary" @click="completeCategory()")
      c-button-modal(:title="btnTitle" type="primary" :modalTitle="completeModalTitle")
        template(#content)
          .complete-container
            div
              icon(name="success" size="big")
            .description
              p {{ category.completedAt ? "This will mark the category as incomplete and your progress will be updated." : "This will mark the category as complete and your progress will be updated." }}
              p.confirm Do you want to continue?
        template(#footer)
          c-button(title="Confirm" type="primary" @click="completeCategory()")
</template>

<script>
import { computed, inject } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import UseData from '~/store/Data.js'
import cDropdown from '~/components/Inputs/cDropdown.vue'
import { notifyMessages } from '~/data/notifications.js'
export default {
  components: { cDropdown },
  props: {
    reviewCategory: {
      type: Object,
      required: true
    }
  },
  emits: ['update:reviewCategory'],
  setup (props) {
    const reviews = new UseData('reviews')
    const modal = inject('modal')
    const notification = inject('notification')
    const router = useRouter()
    const route = useRoute()

    const category = computed(() => props.reviewCategory)
    const btnTitle = computed(() => category.value.completedAt ? 'Mark as Incomplete' : 'Mark as Complete')
    const completeModalTitle = computed(() => category.value.completedAt ? 'Incomplete Category' : 'Complete Category')

    const addTopic = () => category.value.content.push({ topicContent: '', items: [] })

    const addItem = topic => topic.items.push({ itemContent: '', flag: false, finding: [] })

    const addLogFinding = item => item.finding.push({ findingContent: '' })

    const newTask = () => modal({ name: 'cModalTask' })

    const selectCheck = (item, flag) => item.flag = flag

    const deleteTopic = (topicArr, index) => {
      topicArr.splice(index, 1)
      notification({
        type: 'success',
        title: 'Success',
        message: notifyMessages.review.category.topic.delete.success
      })
    }

    const deleteItem = (itemArr, index) => {
      itemArr.splice(index, 1)
      notification({
        type: 'success',
        title: 'Success',
        message: notifyMessages.review.category.item.delete.success
      })
    }

    const deleteFinding = (findingArr, index) => {
      findingArr.splice(index, 1)
      notification({
        type: 'success',
        title: 'Success',
        message: notifyMessages.review.category.finding.delete.success
      })
    }

    const deleteCategory = async () => {
      try {
        const catId = route.params.catId
        reviews.getDocument().value.categories.splice(catId, 1)
        await reviews.updateDocument(reviews.getDocument().value._id, reviews.getDocument().value)
        notification({
          type: 'success',
          title: 'Success',
          message: notifyMessages.review.category.delete.success
        })
        router.push({
          name: 'ReviewDetail',
          params: { id: reviews.getDocument().value._id }
        })
      } catch (error) {
        console.error(error)
        notification({
          type: 'error',
          title: 'Error',
          message: notifyMessages.review.category.delete.error
        })
      }
    }

    const updateCategory = async () => {
      try {
        const catId = route.params.catId
        reviews.getDocument().value.categories[catId] = category.value
        await reviews.updateDocument(reviews.getDocument().value._id, reviews.getDocument().value)
        notification({
          type: 'success',
          title: 'Success',
          message: notifyMessages.review.category.update.success
        })
      } catch (error) {
        console.error(error)
        notification({
          type: 'error',
          title: 'Error',
          message: notifyMessages.review.category.update.error
        })
      }
    }

    const completeCategory = async () => {
      const timestamp = category.value.completedAt ? null : Date.now()
      const catId = route.params.catId
      reviews.getDocument().value.categories[catId].completedAt = timestamp
      try {
        await reviews.updateDocument(reviews.getDocument().value._id, reviews.getDocument().value)
        notification({
          type: 'success',
          title: 'Success',
          message: timestamp ? notifyMessages.review.category.complete.success : notifyMessages.review.category.incomplete.success
        })
      } catch (error) {
        console.error(error)
        notification({
          type: 'error',
          title: 'Error',
          message: timestamp ? notifyMessages.review.category.complete.error : notifyMessages.review.category.incomplete.error
        })
      }
    }

    return {
      btnTitle,
      completeModalTitle,
      category,
      deleteCategory,
      addTopic,
      addItem,
      newTask,
      deleteTopic,
      addLogFinding,
      deleteItem,
      updateCategory,
      selectCheck,
      deleteFinding,
      completeCategory
    }
  }
}
</script>

<style lang="stylus" scoped>
  .category-title
    font-size: 1em
    :deep(.field-body)
      margin-right: 4em
    :deep(input)
      text-overflow: ellipsis
  .category-container
    padding: 1.25em 0
    border-bottom: 1px solid #dcdee4
    .right
      float: right
    .topic-container
      margin-bottom: 2em
    .item-container
      margin-bottom: 1em
      .item
        .item-checkboxes
          grid-column: span 2
          @media (min-width: 1200px)
            grid-column: span 1
        .item-text
          grid-column: span 7
          @media (min-width: 1200px)
            grid-column: span 9
        .item-action
          grid-column: span 3
          @media (min-width: 1200px)
            grid-column: span 2
          .c-dropdown
            :deep(.dropdown)
              border-radius: 5px
              right: 0
              min-width: 8em
      .reviews-checkbox
        display: flex
        font-size: 0.8em
        gap: 0.75em
        .checkbox
          cursor: pointer
          background-color: white
          color: black !important
          padding: 0.1em 0.8em
          border: 1px solid #dee2e6
          border-radius: 3px
          svg
            fill: black
            font-size: 1.25em
            position: relative
            top: -1px
          &.checked
            svg
              fill: white
        .checkbox-true
          &.checked
            background-color: #1ab27f
            border-color: #1ab27f
            color: white !important
        .checkbox-false
          &.checked
            background-color: #ce1938
            border-color:  #ce1938
            color: white !important
            svg
              fill: white
    .finding
      :deep(.field-body)
        resize: none
        height: 60px
        overflow: hidden
        color: #303132
        font-weight: 400
        box-shadow: 0 0 0
        border: 1px solid #ced4da
        &:focus
          color: #495057
          border-color: #80dbff
      .finding-empty
        grid-column: span 2
        min-width: 66px
        @media (min-width: 1200px)
          grid-column: span 1
          min-width: 80px
      .c-textarea
        grid-column: span 7
        @media (min-width: 1200px)
          grid-column: span 9
      .finding-delete
        display: flex
        align-items: center
        grid-column: span 3
        @media (min-width: 1200px)
          grid-column: span 2
      .c-button-modal
        top: 7px;
        position: relative;
        :deep(.c-button)
          padding: 0
        :deep(svg)
          font-size: 0.75em
          fill: #212529
  .end-buttons
    display: flex
    gap: 0.75em
  .topic-text, .item-text
    :deep(.field-body)
      resize: none
      overflow: hidden
      font-weight: 500
      border: 1px solid transparent
      box-shadow: 0 0 0
      min-height: 60px
      transition: all .2s ease-in
      &:hover
        border: 1px solid #dee2e6
  .topic-text
    grid-column: span 9
    @media (min-width: 1200px)
      grid-column: span 10
    :deep(.field-body)
      font-size: 1.125em
  .topic-action
    grid-column: span 3
    @media (min-width: 1200px)
      grid-column: span 2
  .item-text
    :deep(.field-body)
      font-size: 1em
  .delete-container, .complete-container
    display: flex
    gap: 1.25em
    .description
      font-size: 0.875em
      .confirm
        padding-top: 0.625em
        font-weight: bold
</style>

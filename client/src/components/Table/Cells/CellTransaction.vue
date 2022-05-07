<template lang="pug">
.cell-transaction
  icon(v-if="document.isReview" :name="iconName" size="medium")
  .title.review(v-if="document.isReview" @click="openTransactionModal()") {{data}}
  .title(v-if="!document.isReview") {{data}}
</template>

<script>
import { computed, inject } from 'vue'
export default {
  props: {
    id: {
      type: String,
      required: true
    },
    data: {
      type: String,
      required: true
    },
    document: {
      type: Object,
      required: true
    }
  },
  setup (props) {
    const modal = inject('modal')
    const updateTransaction = () => {}
    const openTransactionModal = () => modal({ name: 'cModalReviewTransaction', callback: updateTransaction, transaction: props.document })
    const iconName = computed(() => props.document.isApproved ? 'warning_review' : 'warning')
    return { iconName, openTransactionModal }
  }
}
</script>

<style lang="stylus" scoped>
.cell-transaction
  svg.icon
    margin-right: 0.5em
  .title
    &.review
      color: var(--c-link)
      cursor: pointer
</style>

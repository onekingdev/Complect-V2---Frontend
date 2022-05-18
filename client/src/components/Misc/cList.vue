<template lang="pug">
.c-list
  .c-item(v-for="(item, index) in data" :key="index")
    .c-item-avatar
      c-avatar(:businessName="item.name" :avatar="item.avatar" size="small")
    .c-item-content
      .c-item-name {{item.name}}
      .c-item-business {{item.business}}
      .c-item-description {{item.description}}
    .c-item-rating
      c-rating(:max="item.rating.max" v-model="item.rating.value" :readonly="true")
</template>

<script>
import cRating from '~/components/Inputs/cRating.vue'
import cAvatar from '~/components/Misc/cAvatar.vue'
export default {
  components: { cAvatar, cRating },
  props: {
    data: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="stylus" scoped>
.c-item
  display: flex
  gap: 1.25em
  padding: 1.25em 0
  border-bottom: 1px solid var(--c-border)
  .c-item-avatar
    margin-top: 0.625em
  .c-item-name
    color: var(--c-info)
    margin-bottom: 0.625em
  .c-item-business
    font-size: 0.875em
    color: var(--c-dimmed)
    margin-bottom: 1.25em
  .c-item-description
    font-size: 0.875em
  .c-item-rating
    margin-left: auto
    .c-rating
      :deep(.icon)
        width: 1.875em
        height: 1.875em
</style>

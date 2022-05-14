<template lang="pug">
.market-container
  .market-filter
    slot(name="filter")
  .market-content(v-if="$slots.content")
    slot(name="content")
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
      required: false
    }
  }
}
</script>

<style lang="stylus" scoped>
.market-container
  width: 100%
  height: 100%
  display: flex
  padding: 2em
  gap: 2em
  .market-filter
    width: 20%
  .market-content
    width: 80%
    border-top: 1px solid var(--c-border)
  @media (max-width: 1000px)
    flex-direction: column
    .market-filter, .market-content
      width: 100%
</style>

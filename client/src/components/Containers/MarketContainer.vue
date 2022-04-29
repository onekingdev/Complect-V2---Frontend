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
  display: flex
  padding: 2em
  gap: 2em
  .market-filter
    width: 20%
  .market-content
    width: 80%
    border-top: 1px solid var(--c-border)
</style>

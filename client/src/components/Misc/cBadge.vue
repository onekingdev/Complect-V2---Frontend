<template lang="pug">
.c-badge(:class="title")
  icon(v-if="icon" :name="icon")
  .title {{ $locale(title) }}
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: '',
      required: false
    },
    title: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="stylus" scoped>
.c-badge
  font-size: 0.8em
  background: #333
  color: #fff
  border-radius: 0.5em
  padding: 0.5em 1em
  line-height: 1
  width :100%
  display: flex
  align-items: center
  justify-content: center
  text-transform: capitalize
  svg
    margin-right: 0.5em
  &.draft, &.pending
    color: #797b7e
    background: #f6f6f8
  &.archived
    color: #ce1938
    background: #fddee3
  &.published
    color: #1bb380
    background: #d5fbef
  &.inprogress
    color: #2180c2
    background: #ecf4ff
  &.complete, &.available, &.active
    color: #1bb380
    background: #d5fbef
  &.new
    background: #FFF9EA
    color: #AD841D
  &.reviewed
    background: #E8FBF5
    color: #0EA472
  &.buy
    background: #E8FBF5
    color: #0EA472
  &.sell
    background: #FFE5EA
    color: #CE1938
  &.risk0
    background: #1ab27f
    color: #fff
  &.risk1
    background: #ffc900
    color: #303132
  &.risk2
    background: #ce1938
    color: #fff
</style>

<template lang="pug">
.collapse-container(:class="{'collapsed': isCollapsed}")
  .collapse-header(@click="collapseSections()")
    .collapse-title(v-if="title") {{ $locale(title) }}
    icon(name="chevron-up" size="small")
  .collapse-content
    slot(name="content")
</template>

<script>
import { ref } from 'vue'
export default {
  props: {
    title: {
      type: String,
      default: '',
      required: false
    }
  },
  setup () {
    const isCollapsed = ref(false)
    const collapseSections = () => isCollapsed.value = !isCollapsed.value
    return { collapseSections, isCollapsed }
  }
}
</script>

<style lang="stylus" scoped>
.collapse-header
  display: flex
  align-items: center
  cursor: pointer
  svg.icon-chevron-up
    margin-right: 0
    margin-left: auto
.collapse-content
  display: initial
.collapsed
  svg.icon-chevron-up
    transform: rotate(180deg)
  .collapse-content
    display: none
</style>

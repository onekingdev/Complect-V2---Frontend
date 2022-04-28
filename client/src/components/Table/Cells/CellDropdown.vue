<template lang="pug">
c-dropdown(iconR="more" type="transparent")
  c-button(v-for="(item, index) in dropdownMenus" :key="index" :title="item.title" @click="item.action(id, controlId)" type="transparent" )
</template>

<script>
import { computed } from 'vue'
import cDropdown from '~/components/Inputs/cDropdown.vue'
export default {
  components: { cDropdown },
  props: {
    id: {
      type: String,
      required: true
    },
    controlId: {
      type: String,
      default: ''
    },
    meta: {
      type: Object,
      default: () => {}
    }
  },
  setup (props) {
    const dropdownMenus = computed(() => props.meta.actions.filter(menu => {
      if (menu.canShow) return menu.canShow(props.id)
      return true
    }))

    return { dropdownMenus }
  }
}
</script>

<style lang="stylus" scoped>
.c-dropdown
  :deep(.dropdown)
    border-radius: 5px
    top: 2.5em
    right: 0
    min-width: 8em
  :deep(.c-button)
    padding: 0.6em 0.8em
    .title
      font-size: 1.2em
      color: var(--c-headers)
      font-weight: 600
  :deep(svg.icon)
    width: 1.275em
    height: 1.275em
</style>

<template lang="pug">
.tag-input(:class="[{expanded: datalistVisible}, dropdownListDirection]" ref="selectComponent")
  input(type="text" :placeholder="value.length? '' : placeholder" style="" @keydown.enter="addTag(newTag)" @keydown.prevent.tab="addTag(newTag)" v-model="newTag" :style="{'padding-left': `${paddingLeft}px`}" @input="showDropdownList()")
  .selected-items(ref="tagUI")
    .item(v-for="item in value" v-if="value.length" )
      .title {{item}}
      icon(name="close" @click="removeSelected(item)")
  .dropdown-list(v-show="datalistVisible && filteredData.length" tabindex="-1" ref="dropdownList")
    .items-section(ref="dropdownListItems" @scroll.native="dropdownListScrollEvent()")
      .item(v-for="(item, index) in filteredData" :key="index" @click="selectItem(item)") {{item}}
</template>

<script>
import { ref, onMounted, nextTick, reactive, toRefs, computed } from 'vue'
export default {
  props: {
    value: {
      type: Array,
      required: true
    },
    placeholder: {
      type: String,
      default: ''
    },
    data: {
      type: Array,
      required: true
    }
  },
  emits: ['updateValue'],
  setup (props, context) {
    const tagUI = ref(null)
    const newTag = ref('')
    const paddingLeft = ref(10)
    const selectComponent = ref(null)
    const dropdownList = ref(null)
    const dropdownListItems = ref(null)
    const dropdownListDirection = ref('drop-down')
    const params = reactive({
      query: '',
      datalistVisible: false,
      selected: false,
      offset: false
    })
    const tagChange = () => {
      const extraCushion = props.value.length ? 15 : 0
      paddingLeft.value = tagUI.value.clientWidth + extraCushion
    }
    const addTag = tag => {
      const newValue = tag.trim()
      if (!newValue) return
      newTag.value = ''
      const selected = [...props.value]
      if (selected.indexOf(tag) > -1) return
      selected.push(newValue)
      context.emit('updateValue', selected)
      nextTick(tagChange)
      hideDropdownList()
    }
    const removeSelected = value => {
      const selected = [...props.value]
      const index = selected.findIndex(item => item.value === value)
      selected.splice(index, 1)
      context.emit('updateValue', selected)
      nextTick(tagChange)
    }
    const filteredData = computed(() => {
      try {
        const query = String(newTag.value.toLowerCase().trim())
        const selected = [...props.value]
        if (params.selected || !query) return props.data
        return props.data.filter(item => item.toLowerCase().includes(query) && selected.indexOf(item) === -1)
      } catch (error) {
        console.error(error)
        return false
      }
    })
    const showDropdownList = () => {
      params.datalistVisible = true
      if (window.innerHeight - selectComponent.value.getBoundingClientRect().bottom < 300) dropdownListDirection.value = 'drop-up'
      else dropdownListDirection.value = 'drop-down'
    }
    const hideDropdownList = () => {
      params.datalistVisible = false
      params.query = ''
    }
    const dropdownListScrollEvent = () => {
      if (dropdownListItems.value.scrollTop > 5) params.offset = true
      else params.offset = false
    }

    const selectItem = item => {
      addTag(item)
      hideDropdownList()
    }
    onMounted(() => tagChange())
    return {
      removeSelected,
      addTag,
      tagUI,
      paddingLeft,
      newTag,
      ...toRefs(params),
      showDropdownList,
      hideDropdownList,
      selectItem,
      dropdownListScrollEvent,
      filteredData,
      dropdownList,
      selectComponent,
      dropdownListDirection
    }
  }
}
</script>

<style lang="stylus" scoped>
.tag-input
  position: relative
  &.expanded
    &.drop-down
      .dropdown-list
        border-radius: 0 0 var(--v-inputs-border-radius) var(--v-inputs-border-radius)
        top: calc(100% + 0.05em)
        .search-section
          &.offset
            border-bottom: 1px solid var(--c-border)
    &.drop-up
      .dropdown-list
        border-radius: var(--v-inputs-border-radius) var(--v-inputs-border-radius) 0 0
        bottom: calc(100% - 1.4em)
        .search-section
          order: 2
          &.offset
            border-top: 1px solid var(--c-border)
  input
    color: #000
    background: transparent
    border: none
    outline: none
    padding: 0
    margin: 0
  .selected-items
    display: flex
    flex: 1 0 auto
    flex-wrap: wrap
    gap: 0.5em
    line-height: 1.3
    position: absolute
    top: 0
    .item
      display: flex
      align-items: baseline
      font-size: 0.8em
      padding: 0.3em 0.4em 0.4em
      line-height: 1
      background: var(--c-bg-light-active)
      color: var(--c-link)
      border-radius: var(--v-border-radius)
      overflow: hidden
      .title
        text-overflow: ellipsis
        white-space: nowrap
        overflow: hidden
      svg.icon
        cursor: pointer
        width: 0.6em
        height: 0.6em
        margin-left: 0.6em
        fill: var(--c-link)
  .dropdown-list
    position: absolute
    z-index: 1
    left: 0
    width: 100%
    max-height: 10em
    min-height: 0
    display: flex
    flex-direction: column
    color: #ccc
    background: #fff
    box-shadow: 0 0 0 1px var(--c-border)
    transition: max-height .25s ease-in-out, box-shadow .25s
    .search-section
      flex: 1
      padding: 0.5em
      background: var(--c-bg-z2)
      :deep(.c-field)
        .field-body
          border-radius: var(--v-inputs-border-radius)
    .items-section
      flex: 1
      overflow-y: auto
      font-size: 0.9em
      .item
        display: flex
        align-items: center
        padding: 0.8em 0.8em
        line-height: 1.3
        transition: background .25s
        font-size: 0.9em
        color: var(--c-text)
        cursor: pointer
        &:hover
          background: #F0F6FE
        &.active
          background: #F0F6FE
        &.checked
          background: #F0F6FE
</style>

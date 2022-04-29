<template lang="pug">
card-container.c-modal-review.wide(title="Select File" ref="modalWindow")
  template(#controls)
    c-button(type="icon" iconL="close" size="small" @click="closeModal()")
  template(#content)
    .tab-container
      .tab-names
        .tab-item-name(v-for="(tab, index) in tabs" :class="{ 'active': isActiveTab(tab.value)}" :key="index" @click="tab.handleClick(tab.value)") {{ tab.name }}
      .tab-content
        div(v-if="isActiveTab('records')")
          h4 All Documents
          c-table(v-bind="{columns, documents: bookDocuments}")
  template(#footer)
    .count 1 Items Selected
    .controls
      c-button(title="Cancel" type="link" @click="closeModal()")
      c-button(title="Add" type="primary")
</template>

<script>
import { ref } from 'vue'
import useModals from '~/store/Modals.js'
import { onClickOutside } from '@vueuse/core'

export default {
  props: {
    modalId: {
      type: String,
      required: true
    },
    id: {
      type: String,
      default: '',
      required: false
    }
  },
  setup (props) {
    const modalWindow = ref(null)
    const { deleteModal } = useModals()
    const closeModal = () => deleteModal(props.modalId)
    onClickOutside(modalWindow, () => closeModal())
    const activeTab = ref('records')

    const selectTab = tabName => {
      activeTab.value = tabName
    }

    const isActiveTab = tabName => activeTab.value === tabName

    const tabs = [
      { name: 'Book and Records', handleClick: selectTab, value: 'records' }, { name: 'Polices', handleClick: selectTab, value: 'polices' }
    ]

    const checkBookAndRecords = id => id

    const bookDocuments = [{
      isChecked: true,
      id: 1,
      name: 'typescript-handbook.pdf',
      owner: 'David',
      size: '600KB',
      last_modified: new Date()
    }]

    const columns = [
      {
        title: 'Name',
        key: 'name',
        cell: 'CellTitle',
        width: '50%',
        unsortable: true,
        meta: {
          icon: 'policy',
          checkbox: { action: checkBookAndRecords }
        }
      }, {
        title: 'Owner',
        key: 'owner',
        cell: 'CellDefault'
      }, {
        title: 'Size',
        key: 'size',
        cell: 'CellDefault'
      }, {
        title: 'Last Modified',
        key: 'last_modified',
        cell: 'CellDate'
      }
    ]

    return {
      columns,
      bookDocuments,
      tabs,
      activeTab,
      isActiveTab,
      modalWindow,
      closeModal
    }
  }
}
</script>

<style lang="stylus" scoped>
:deep(.card-footer)
  justify-content: space-between !important
  .count
    font-size: 0.9em
  .controls
    display: flex
.tab-container
  border: 1px solid var(--c-border);
  border-radius: 5px
  padding: 1em 0
  .tab-names
    padding-left: 2em
    display: flex
    border-bottom: 1px solid var(--c-border);
    .tab-item-name
      cursor: pointer
      margin-right: 1em
      padding-bottom: 0.7em
      &.active
        box-shadow: inset 0 -4px 0 0 var(--c-gold)
        font-weight: bold
  .tab-content
    padding-left: 2em
</style>

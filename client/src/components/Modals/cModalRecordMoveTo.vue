<template lang="pug">
card-container.c-modal-review(title="Move To" ref="modalWindow")
  template(#controls)
    c-button(type="icon" iconL="close" size="small" @click="closeModal()")
  template(#content)
    .grid-6
      c-select(label="Destination" v-model="selectedId" :errors="errors.dir" :data="items" required)
  template(#footer)
    c-button(title="Cancel" type="link" @click="closeModal()")
    c-button(title="Confirm" type="primary" @click="MoveToRecord()")
</template>

<script>
import { ref, inject, onMounted } from 'vue'
import cSelect from '~/components/Inputs/cSelect.vue'
import useModals from '~/store/Modals.js'
import { onClickOutside } from '@vueuse/core'
import { manualApi } from '~/core/api.js'
import { validates } from '~/core/utils.js'
import { required } from '@vuelidate/validators'
import UseData from '~/store/Data.js'

export default {
  components: { cSelect },
  props: {
    modalId: {
      type: String,
      required: true
    },
    id: {
      type: String,
      default: '',
      required: false
    },
    folderId: {
      type: String,
      default: '',
      required: false
    },
    callback: {
      type: Function,
      default: () => 1,
      required: false
    }
  },
  setup (props) {
    const records = new UseData('records')
    const notification = inject('notification')
    const modalWindow = ref(null)
    const errors = ref({})
    const { deleteModal } = useModals()
    const selectedId = ref(null)
    const items = ref([])
    const selectedStatus = ref(null)
    const closeModal = () => deleteModal(props.modalId)
    onClickOutside(modalWindow, () => {
      closeModal()
    })
    const rule = { dir: { required } }
    const MoveToRecord = async () => {
      errors.value = await validates(rule, { dir: selectedId.value })
      if (Object.keys(errors.value).length > 0) return
      try {
        await records.updateDocument(props.id, { folderId: selectedId.value })
        notification({
          type: 'success',
          title: 'Success',
          message: `${selectedStatus.value} has been moved`
        })
        props.callback()
      } catch (error) {
        console.error(error)
        notification({
          type: 'error',
          title: 'Error',
          message: `${selectedStatus.value} has not been moved. Please try again.`
        })
      } finally {
        closeModal()
      }
    }
    const getDirectories = async () => {
      const res = await manualApi({ method: 'GET', url: 'records/movetoDirs' })
      if (res.dirs.length) items.value = [{ value: 'root', title: '.root', name: '' }]
      items.value = [
        ...items.value, ...res.dirs
      ]
      items.value.forEach(item => {
        for (let i = 0; i < item.name.split('/').length - 1; i++) item.title = `-- ${item.title}`
      })
    }
    onMounted(async () => {
      await records.readDocuments(props.id)
      selectedStatus.value = records.getDocument().value.status === 'folder' ? 'Folder' : 'File'
      await getDirectories()
    })
    return { modalWindow, closeModal, errors, selectedId, items, MoveToRecord }
  }
}
</script>

<template lang="pug">
card-container.c-modal-review(:title="modalTitle" ref="modalWindow")
  template(#controls)
    c-button(type="icon" iconL="close" size="small" @click="closeModal()")
  template(#content)
    .grid-6
      c-field(label="Name" v-model="form.name" :errors="errors.name" required)
  template(#footer)
    c-button(title="Cancel" type="link" @click="closeModal()")
    c-button(:title="btnTitle" type="primary" @click="saveRecord()")
</template>

<script>
import { ref, inject, computed, onMounted } from 'vue'
import useProfile from '~/store/Profile.js'
import UseData from '~/store/Data.js'
import useModals from '~/store/Modals.js'
import { validates } from '~/core/utils.js'
import { required } from '@vuelidate/validators'
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
    },
    callback: {
      type: Function,
      default: () => 1,
      required: false
    },
    folderId: {
      type: String,
      default: 'root',
      required: false
    },
    folderKey: {
      type: String,
      default: '',
      required: false
    }
  },
  setup (props) {
    const notification = inject('notification')
    const modalWindow = ref(null)
    const records = new UseData('records')
    const { profile } = useProfile()
    const { deleteModal } = useModals()
    const modalTitle = ref('')
    const errors = ref({})
    const btnTitle = computed(() => props.id ? 'Save' : 'Create')
    const form = ref({
      name: '',
      status: 'folder',
      owner: `${profile.value.firstName} ${profile.value.lastName}`,
      ownerId: profile.value._id,
      size: 0,
      dateCreated: Date.now(),
      lastModified: Date.now(),
      folderId: props.folderId,
      key: ''
    })
    const rule = { name: { required } }
    const closeModal = () => deleteModal(props.modalId)
    onClickOutside(modalWindow, () => closeModal())

    const createRecord = async () => {
      try {
        if (form.value.status === 'folder') form.value.key = `${props.folderKey}${form.value.name}/`
        await records.createDocuments([form.value])
        notification({
          type: 'success',
          title: 'Success',
          message: 'Folder has been created.'
        })
        props.callback()
      } catch (error) {
        console.error(error)
        notification({
          type: 'error',
          title: 'Error',
          message: 'Folder has not been created. Please try again.'
        })
      }
    }

    const updateRecord = async () => {
      const title = form.value.status
      try {
        if (form.value.status === 'folder') form.value.key = `${props.folderKey}${form.value.name}`
        await records.updateDocument(form.value._id, form.value)
        notification({
          type: 'success',
          title: 'Success',
          message: `${title} has been updated`
        })
        props.callback()
      } catch (error) {
        console.error(error)
        notification({
          type: 'error',
          title: 'Error',
          message: `${title} has not been updated. Please try again.`
        })
      }
    }

    const saveRecord = async () => {
      errors.value = await validates(rule, form.value)
      if (Object.keys(errors.value).length > 0) return
      try {
        if (!props.id) await createRecord()
        else if (props.id) await updateRecord()
      } catch (error) {
        console.error(error)
      } finally {
        closeModal()
      }
    }

    onMounted(async () => {
      if (props.id) {
        await records.readDocuments(props.id)
        form.value = records.getDocument().value
        modalTitle.value = form.value.status === 'folder' ? 'Edit Folder Name' : 'Edit File Name'
      } else modalTitle.value = 'New Folder'
    })

    return { modalWindow, modalTitle, btnTitle, errors, saveRecord, form, closeModal }
  }
}
</script>

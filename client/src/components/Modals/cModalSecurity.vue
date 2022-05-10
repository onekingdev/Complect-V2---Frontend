<template lang="pug">
card-container.c-modal-review(:title="modalTitle" ref="modalWindow")
  template(#controls)
    c-button(type="icon" iconL="close" size="small" @click="closeModal()")
  template(#content)
    .grid-6
      c-field(label="Ticker Name" v-model="form.tickerName" :errors="errors.tickerName" required)
  template(#footer)
    c-button(title="Cancel" type="link" @click="closeModal()")
    c-button(title="Submit" type="primary" @click="saveSecurity()")
</template>

<script>
import { ref, inject, onMounted } from 'vue'
import useModals from '~/store/Modals.js'
import { validates } from '~/core/utils.js'
import { required } from '@vuelidate/validators'
import { onClickOutside } from '@vueuse/core'
import { securityData } from '~/data/data.js'
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
    }
  },
  setup (props) {
    const notification = inject('notification')
    const modalWindow = ref(null)
    const { deleteModal } = useModals()
    const modalTitle = ref('')
    const errors = ref({})
    const form = ref({
      tickerName: '',
      createdAt: Date.now()
    })
    const rule = { tickerName: { required } }
    const closeModal = () => deleteModal(props.modalId)
    onClickOutside(modalWindow, () => closeModal())

    const createSecurity = () => {
      try {
        notification({
          type: 'success',
          title: 'Success',
          message: 'Security has been created.'
        })
        props.callback()
      } catch (error) {
        console.error(error)
        notification({
          type: 'error',
          title: 'Error',
          message: 'Security has not been created. Please try again.'
        })
      }
    }

    const updateSecurity = () => {
      try {
        notification({
          type: 'success',
          title: 'Success',
          message: 'Security has been updated.'
        })
        props.callback()
      } catch (error) {
        console.error(error)
        notification({
          type: 'error',
          title: 'Error',
          message: 'Security has not been updated. Please try again.'
        })
      }
    }

    const saveSecurity = async () => {
      errors.value = await validates(rule, form.value)
      if (Object.keys(errors.value).length > 0) return
      try {
        if (!props.id) await createSecurity()
        else if (props.id) await updateSecurity()
      } catch (error) {
        console.error(error)
      } finally {
        closeModal()
      }
    }

    onMounted(() => {
      if (props.id) {
        form.value = securityData.value.find(doc => doc._id === props.id)
        modalTitle.value = 'Edit Security'
      } else modalTitle.value = 'Add Security'
    })

    return { modalWindow, modalTitle, errors, saveSecurity, form, closeModal }
  }
}
</script>

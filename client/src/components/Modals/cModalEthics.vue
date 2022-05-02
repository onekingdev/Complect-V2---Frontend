<template lang="pug">
card-container.c-modal-review(:title="modalTitle" ref="modalWindow")
  template(#controls)
    c-button(type="icon" iconL="close" size="small" @click="closeModal()")
  template(#content)
    .grid-6
      c-field(label="1. Date of Transaction" type="date" v-model="form.dateOfTransaction" :errors="errors.dateOfTransaction" required)
      c-field(label="2. Gift Type" v-model="form.giftType" :errors="errors.giftType" required)
      c-field(label="3. External Organization" v-model="form.externalOrganization" :errors="errors.externalOrganization" required)
      c-field(label="4. Cost of Transaction" type="number" v-model="form.costOfTransaction" :errors="errors.costOfTransaction" required)
      c-textarea(label="5. Reason for Gift" v-model="form.reasonForGift" :errors="errors.reasonForGift" required)
  template(#footer)
    c-button(title="Cancel" type="link" @click="closeModal()")
    c-button(title="Submit" type="primary" @click="saveEthics()")
</template>

<script>
import { ref, inject, onMounted } from "vue"
import useModals from "~/store/Modals.js"
import { validates } from "~/core/utils.js"
import { required } from "@vuelidate/validators"
import { onClickOutside } from "@vueuse/core"
import { ethicsAllEntriesData } from "~/data/data.js"
export default {
  props: {
    modalId: {
      type: String,
      required: true
    },
    id: {
      type: String,
      default: "",
      required: false
    },
    callback: {
      type: Function,
      default: () => 1,
      required: false
    }
  },
  setup (props) {
    const notification = inject("notification")
    const modalWindow = ref(null)
    const { deleteModal } = useModals()
    const modalTitle = ref("")
    const errors = ref({})
    const form = ref({
      dateOfTransaction: Date.now(),
      giftType: "",
      externalOrganization: "",
      costOfTransaction: 0,
      reasonForGift: ""
    })
    const rule = {
      dateOfTransaction: { required },
      giftType: { required },
      externalOrganization: { required },
      costOfTransaction: { required },
      reasonForGift: { required }
    }
    const closeModal = () => deleteModal(props.modalId)
    onClickOutside(modalWindow, () => closeModal())

    const createEthics = () => {
      try {
        notification({
          type: "success",
          title: "Success",
          message: "Entry has been created."
        })
        props.callback()
      } catch (error) {
        console.error(error)
        notification({
          type: "error",
          title: "Error",
          message: "Entry has not been created. Please try again."
        })
      }
    }

    const updateEthics = () => {
      try {
        notification({
          type: "success",
          title: "Success",
          message: "Entry has been updated."
        })
        props.callback()
      } catch (error) {
        console.error(error)
        notification({
          type: "error",
          title: "Error",
          message: "Entry has not been updated. Please try again."
        })
      }
    }

    const saveEthics = async () => {
      errors.value = await validates(rule, form.value)
      if (Object.keys(errors.value).length > 0) return
      try {
        if (!props.id) await createEthics()
        else if (props.id) await updateEthics()
      } catch (error) {
        console.error(error)
      } finally {
        closeModal()
      }
    }

    onMounted(() => {
      if (props.id) {
        form.value = ethicsAllEntriesData.find(doc => doc._id === props.id)
        modalTitle.value = "Edit Entry"
      } else modalTitle.value = "New Entry"
    })

    return { modalWindow, modalTitle, errors, saveEthics, form, closeModal }
  }
}
</script>

<style lang="stylus" scoped>
.card-container
  width: 37.5em !important
</style>

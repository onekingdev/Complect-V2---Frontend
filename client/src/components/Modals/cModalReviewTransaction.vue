<template lang="pug">
card-container.c-modal-review(title="Review Transaction" ref="modalWindow")
  template(#controls)
    c-button(type="icon" iconL="close" size="small" @click="closeModal()")
  template(#content)
    .grid-12
      c-banner.col-12(type="review" icon="warning" title="Monitor List Violation" message="A security in your monitor list was found in your organization’s transactions. Please review the transaction to continue.")
      c-field.col-4(label="Date" type="date" v-model="form.date" disabled)
      c-field.col-4(label="Employee Name" v-model="form.employeeName" disabled)
      c-field.col-4(label="Account Number" v-model="form.accountNumber" disabled)
      c-field.col-6(label="Ticker" v-model="form.ticker" disabled)
      c-field.col-6(label="CUSIP" v-model="form.cusip" disabled)
      c-select.col-3(label="Action" :data="actionValues" v-model="form.action" disabled)
      c-field.col-3(label="Quantity" v-model="form.quantity" disabled)
      c-field.col-3(label="Cost" v-model="form.cost" disabled)
      c-field.col-3(label="Type" v-model="form.type" disabled)
      c-textarea.col-12(label="Additional Notes" placeholder="Enter note" v-model="form.additionalNotes")
  template(#footer)
    c-button(title="Cancel" type="link" @click="closeModal()")
    c-button.deny(title="Deny" type="default" @click="denyTransaction()")
    c-button(title="Approve" type="primary" @click="approveTransaction()")
</template>

<script>
import { ref, inject, onMounted } from 'vue'
import useModals from '~/store/Modals.js'
import { onClickOutside } from '@vueuse/core'
import cSelect from '~/components/Inputs/cSelect.vue'
import cBanner from '~/components/Misc/cBanner.vue'
export default {
  components: { cBanner, cSelect },
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
    transaction: {
      type: Object,
      required: true
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
    const form = ref({})
    const { deleteModal } = useModals()
    const closeModal = () => deleteModal(props.modalId)
    onClickOutside(modalWindow, () => closeModal())

    const actionValues = [
      { title: 'Buy', value: 'buy' }, { title: 'Sell', value: 'sell' }
    ]

    const approveTransaction = () => {
      try {
				// eslint-disable-next-line
        props.transaction.isApproved = true
				// eslint-disable-next-line
        props.transaction.controls = [{ name: '' }]
        notification({
          type: 'success',
          title: 'Success',
          message: 'Transaction has been approved.'
        })
        props.callback()
      } catch (error) {
        console.error(error)
        notification({
          type: 'error',
          title: 'Error',
          message: 'Transaction has not been approved. Please try again.'
        })
      } finally {
        closeModal()
      }
    }

    const denyTransaction = () => {
      try {
				// eslint-disable-next-line
        props.transaction.isApproved = false
				// eslint-disable-next-line
        props.transaction.controls = []
        notification({
          type: 'success',
          title: 'Success',
          message: 'Transaction has been denied.'
        })
        props.callback()
      } catch (error) {
        console.error(error)
        notification({
          type: 'error',
          title: 'Error',
          message: 'Transaction has not been denied. Please try again.'
        })
      } finally {
        closeModal()
      }
    }

    onMounted(() => form.value = props.transaction)

    return { modalWindow, denyTransaction, approveTransaction, actionValues, form, closeModal }
  }
}
</script>

<style lang="stylus" scoped>
.card-container
  width: 60em !important
.deny
  :deep(.primary-title)
    color: #CE1938
</style>

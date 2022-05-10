<template lang="pug">
card-container.c-modal-review(:title="modalTitle" ref="modalWindow")
  template(#controls)
    c-button(type="icon" iconL="close" size="small" @click="closeModal()")
  template(#content)
    .grid-6
      c-field.col-3(label="Account Number" placeholder="Enter ticker" type="number" v-model="form.accountNumber" :errors="errors.accountNumber" required)
      c-field.col-3(label="Date of Transaction" type="date" v-model="form.date" :errors="errors.date" required)
      c-field.col-3(label="CUSIP" placeholder="Enter CUSIP" type="number" v-model="form.cusip" :errors="errors.cusip" required)
      c-field.col-3(label="Ticker" placeholder="Enter ticker" v-model="form.ticker" :errors="errors.ticker" required)
      c-select.col-3(label="Action" placeholder="Select action" :data="actionValues" v-model="form.action" required)
      c-field.col-3(label="Quantity" placeholder="Enter quantity" type="number" v-model="form.quantity" :errors="errors.quantity" required)
  template(#footer)
    c-button(title="Cancel" type="link" @click="closeModal()")
    c-button(title="Submit" type="primary" @click="saveTransaction()")
</template>

<script>
import { ref, inject, onMounted } from 'vue'
import useModals from '~/store/Modals.js'
import { validates } from '~/core/utils.js'
import { required } from '@vuelidate/validators'
import { onClickOutside } from '@vueuse/core'
import { transactionData } from '~/data/data.js'
import cSelect from '~/components/Inputs/cSelect.vue'
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
    const actionValues = [
      { title: 'Buy', value: 'buy' }, { title: 'Sell', value: 'sell' }
    ]
    const form = ref({
      date: Date.now(),
      employeeName: '',
      accountNumber: '',
      ticker: '',
      cusip: '',
      action: 'buy',
      quantity: '',
      cost: '',
      type: ''
    })
    const rule = {
      accountNumber: { required },
      date: { required },
      cusip: { required },
      ticker: { required },
      action: { required },
      quantity: { required }
    }
    const closeModal = () => deleteModal(props.modalId)
    onClickOutside(modalWindow, () => closeModal())

    const createTransaction = () => {
      try {
        notification({
          type: 'success',
          title: 'Success',
          message: 'Transaction has been created.'
        })
        props.callback()
      } catch (error) {
        console.error(error)
        notification({
          type: 'error',
          title: 'Error',
          message: 'Transaction has not been created. Please try again.'
        })
      }
    }

    const updateTransaction = () => {
      try {
        notification({
          type: 'success',
          title: 'Success',
          message: 'Transaction has been updated.'
        })
        props.callback()
      } catch (error) {
        console.error(error)
        notification({
          type: 'error',
          title: 'Error',
          message: 'Transaction has not been updated. Please try again.'
        })
      }
    }

    const saveTransaction = async () => {
      errors.value = await validates(rule, form.value)
      if (Object.keys(errors.value).length > 0) return
      try {
        if (!props.id) await createTransaction()
        else if (props.id) await updateTransaction()
      } catch (error) {
        console.error(error)
      } finally {
        closeModal()
      }
    }

    onMounted(() => {
      if (props.id) {
        form.value = transactionData.value.find(doc => doc._id === props.id)
        modalTitle.value = 'Edit Transaction'
      } else modalTitle.value = 'Add Transaction'
    })

    return { modalWindow, modalTitle, errors, saveTransaction, form, closeModal, actionValues }
  }
}
</script>

<style lang="stylus" scoped>
.card-container
  width: 37.5em !important
</style>

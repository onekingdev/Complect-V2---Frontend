<template lang="pug">
card-container(title="Billing")
  template(#content)
    template(v-if="isBusiness")
      div.grid-6.sub-header
        h3.col-3 Payment Method
        div.col-2
        c-button.col-1.buttons(title="Add Payment" @click="toggleNewMethod()")
      div.payment-content.grid-6(v-for="(payment, index) in payments")
        div.col-1.icon-content
          icon(name="creditcard" size="huge")
        div.col-3
          h4(v-if="payment.object == 'card'")
            b Credit Card
            b(v-if="customer?.invoice_settings?.default_payment_method == payment.id") (Primary)
          h4(v-else) Bank Account
          h4 **** **** **** {{ payment.last4 }} {{ payment.brand }}
        c-button.col-1(title="Make Primary" v-if="customer?.invoice_settings?.default_payment_method != payment.id" @click="makePrimary(payment.id)")
        div.col-1(v-else)
        c-button.col-1(title="Delete"  @click="deletePayment(payment.id)")
      div.grid-6.sub-header
        h3.col-3 Invoices
        c-table(v-bind="{columns, documents: invoices}")
    template(v-else)
      div.grid-6.sub-header
        h3.col-3 Clinet Billing
        div.col-2
        c-button.col-1.buttons(title="Add Bank Account" @click="clientBilling()")
      //- template(v-if="linkaccount.account")
      //-   div.payment-content.grid-6(v-for="(account, index) in linkaccount.account")
      //-     div.col-1.icon-content
      //-       icon(name="creditcard" size="huge")
      //-     div.col-3
      //-       h4 Bank account
      //-       h4 ******** {{ account.last4 }}
      //-     // c-button.col-1(title="Make Primary" v-if="!account.primary" @click="makeAccountPrimary(account.accountId)")
      //-     c-button.col-1(title="Edit")
      //-     c-button.col-1(title="Remove")
      div.grid-6.sub-header
        h3.col-3 Payment Method
        div.col-2
        c-button.col-1.buttons(title="Add Payment" @click="toggleNewMethod()")
      div.payment-content.grid-6(v-for="(payment, index) in payments")
        div.col-1.icon-content
          icon(name="creditcard" size="huge")
        div.col-3
          h4(v-if="payment.object == 'card'") Credit Card
          h4(v-else) Bank Account
          h4 **** **** **** {{ payment.last4 }} {{ payment.brand }}
        c-button.col-1(title="Make Primary" v-if="customer?.invoice_settings?.default_payment_method != payment.id && payments.length > 1" @click="makePrimary(payment.id)")
        div.col-1(v-else)
        c-button.col-1(title="Delete")
      div.grid-6.sub-header
        h3.col-3 Invoices
        c-table(v-bind="{columns, documents: invoices}")
c-modal(title="Add Billing Method" v-model="isNewMethodVisible")
  template(#content)
    .card-billing(@click="setBillingType(1)" v-if="billingType == 0")
      plaid-link(clientName="Complect" :env="plaidenv" :webhook="plaidwebhook" :public_key="plaidkey" :products="['auth','transactions']" :onSuccess="plaidSuccess" :onLoad="plaidLoad" :onExit="plaidExit" :onEvent="plaidEvent")
        .grid-6
          .col-1.billing-icon
            icon(name="bank" size="huge")
          .col-4
            h1 Bank account
            h4 Use your bank account for future payments
          .col-1.billing-icon
            icon(name="chevron-right")
    .card-billing.grid-6(@click="setBillingType(2)" v-if="billingType == 0")
      .col-1.billing-icon
        icon(name="card" size="huge")
      .col-4
        h1 Credit Card
        h4 Add a card for future payments
      .col-1.billing-icon
        icon(name="chevron-right")
    div.stripe-content(v-if="stripeLoaded && billingType == 2")
      stripe-elements(ref="elms" v-slot="{ elements, instance }" :stripe-key="publishkey" :instance-option="instanceOptions" :element-options="elementOptions")
        stripe-element(ref="card" :elements="elements" :options="cardOptions")
  template(#footer v-if="billingType == 2")
    c-button(title="Save" type="primary" @click="addPayment()")
</template>
<script>
import { ref, onMounted, onBeforeMount, inject } from 'vue'
import cSelect from '~/components/Inputs/cSelect.vue'
import { loadStripe } from '@stripe/stripe-js'
import { StripeElements, StripeElement } from 'vue-stripe-js'
import PlaidLink from 'vue-plaid-link2'
import cLabel from '~/components/Misc/cLabel.vue'
import cBadge from '~/components/Misc/cBadge.vue'
import useProfile from '~/store/Profile.js'
import useBusiness from '~/store/Business.js'
import cModal from '~/components/Misc/cModal.vue'
import { useRouter } from 'vue-router'
import { manualApi } from '~/core/api.js'
import { notifyMessages } from '~/data/notifications.js'

export default {
  components: { cSelect, cLabel, cBadge, StripeElements, StripeElement, cModal, PlaidLink },
  setup () {
    const { profile, linkaccount } = useProfile()
    const { isBusiness } = useBusiness()
    const router = useRouter()
    const notification = inject('notification')
    const publishkey = import.meta.env.VITE_STRIPE
    const plaidkey = import.meta.env.VITE_PLAID_PK
    const plaidwebhook = import.meta.env.VITE_PLAID_WH
    const plaidenv = import.meta.env.VITE_PLAID_ENV

    const tokenCreated = token => console.debug(token)
    const elementRef = ref()
    const payments = ref([])
    const customer = ref({})
    const billingType = ref(0)
    const getPayments = async () => {
      const response = await manualApi({
        method: 'get',
        url: `payment/method/${isBusiness ? profile.value.businessId : profile.value.specialistId}`
      })
      payments.value = response.data
    }
    const getCustomer = async () => {
      const customres = await manualApi({
        method: 'get',
        url: `payment/customer/${isBusiness ? profile.value.businessId : profile.value.specialistId}`
      })
      customer.value = customres
    }
    const makePrimary = async id => {
      try {
        await manualApi({
          method: 'put',
          url: `payment/customer/${isBusiness ? profile.value.businessId : profile.value.specialistId}`,
          data: JSON.stringify({ invoice_settings: { default_payment_method: id } })
        })
        await getCustomer()
        notification({
          type: 'success',
          title: 'Success',
          message: notifyMessages.payment.primary.success
        })
      } catch (error) {
        notification({
          type: 'error',
          title: 'Error',
          message: notifyMessages.payment.primary.error
        })
      }
    }
    const instanceOptions = ref({ })
    const elementsOptions = ref({ })
    const cardOptions = ref({ value: { postalCode: '' } })
    const stripeLoaded = ref(false)
    const isNewMethodVisible = ref(false)
    const toggleNewMethod = () => {
      isNewMethodVisible.value = !isNewMethodVisible.value
      billingType.value = 0
    }
    const card = ref()
    const elms = ref()
    const addPayment = () => {
      const cardElement = card.value.stripeElement
      elms.value.instance.createToken(cardElement).then(async result => {
        const stripeToken = result.token.id
        try {
          await manualApi({
            method: 'post',
            url: `payment/method/${isBusiness ? profile.value.businessId : profile.value.specialistId}`,
            data: JSON.stringify({ stripeToken })
          })
          notification({
            type: 'success',
            title: 'Success',
            message: notifyMessages.payment.add.success
          })
          isNewMethodVisible.value = !isNewMethodVisible.value
          await getPayments()
        } catch (error) {
          notification({
            type: 'error',
            title: 'Error',
            message: notifyMessages.payment.add.error
          })
        }
      })
    }
    const plaidSuccess = (publicToken, metadata) => console.debug(publicToken, metadata)
    const plaidLoad = () => {}
    const plaidExit = (err, metadata) => console.debug(err, metadata)
    const plaidEvent = (eventName, metadata) => console.debug(eventName, metadata)
    const clientBilling = () => router.push({ name: 'ClientBill' })
    const setBillingType = value => {
      billingType.value = value
      if (value === 1) isNewMethodVisible.value = !isNewMethodVisible.value
    }
    const deletePayment = async id => {
      try {
        if (payments.value.length === 1) {
          notification({
            type: 'error',
            title: 'Error',
            message: notifyMessages.payment.delete.validate
          })
        } else {
          await manualApi({
            method: 'delete',
            url: `payment/method/${isBusiness ? profile.value.businessId : profile.value.specialistId}/${id}`
          })
          notification({
            type: 'success',
            title: 'Success',
            message: notifyMessages.payment.delete.success
          })
          await getPayments()
        }
      } catch (error) {
        notification({
          type: 'error',
          title: 'Error',
          message: notifyMessages.payment.delete.error
        })
      }
    }

    const handleDownload = id => console.debug(id)

    const columns = [
      {
        title: 'Date',
        key: 'date',
        cell: 'CellDate'
      },
      {
        title: 'Name',
        key: 'title',
        cell: 'CellTitle'
      },
      {
        title: 'Type',
        key: 'type',
        cell: 'CellTitle'
      },
      {
        title: 'Price',
        key: 'price',
        cell: 'CellPrice',
        align: 'right'
      },
      {
        unsortable: true,
        cell: 'CellDropdown',
        meta: { actions: [{ title: 'Download', action: handleDownload }] },
        align: 'right'
      }
    ]

    const invoices = [
      {
        id: '1234567890',
        date: 1648688166644,
        title: '1 × Business Plan (at $2,520.00 / year)',
        type: 'Plan',
        price: '2520'
      },
      {
        id: '16234567890',
        date: 1648688166644,
        title: '1 × Business Plan (at $2,520.00 / year)',
        type: 'Plan',
        price: '-2520'
      },
      {
        id: '15234567890',
        date: 1648688166644,
        title: '1 × Business Plan (at $250.00 / month)',
        type: 'Plan',
        price: '-250'
      },
      {
        id: '14234567890',
        date: 1648688166644,
        title: '1 × Business Plan (at $250.00 / month)',
        type: 'Plan',
        price: '250'
      },
      {
        id: '13234567890',
        date: 1648688166644,
        title: '1 × Business Plan (at $1,500.00 / year)',
        type: 'Plan',
        price: '-1500'
      },
      {
        id: '12234567890',
        date: 1648688166644,
        title: '1 × Business Plan (at $120.00 / year)',
        type: 'Plan',
        price: '120'
      },
      {
        id: '11234567890',
        date: 1648688166644,
        title: '1 × Business Plan (at $1,500.00 / year)',
        type: 'Plan',
        price: '1500'
      }
    ]

    onBeforeMount(() => {
      const stripePromise = loadStripe(publishkey.value)
      stripePromise.then(() => stripeLoaded.value = true)
    })
    onMounted(() => {
      getPayments()
      getCustomer()
    })
    return {
      publishkey,
      linkaccount,
      tokenCreated,
      addPayment,
      elementRef,
      payments,
      makePrimary,
      customer,
      instanceOptions,
      elementsOptions,
      cardOptions,
      card,
      elms,
      stripeLoaded,
      isNewMethodVisible,
      toggleNewMethod,
      isBusiness,
      clientBilling,
      billingType,
      setBillingType,
      deletePayment,
      columns,
      invoices,
      plaidSuccess,
      plaidLoad,
      plaidExit,
      plaidEvent,
      plaidkey,
      plaidenv,
      plaidwebhook
    }
  }
}
</script>
<style lang="stylus" scoped>
.sub-header
  h3
    font-weight: bold
    font-size: 1.25em
  .buttons
    display: flex;
    justify-content: center;
.payment-content
  border: 1px solid var(--c-border)
  border-radius: 5px
  padding: 1.25em
  .icon-content
    display: flex
    align-items: center
    justify-content: center
.stripe-content
  box-sizing: border-box
  height: 2.5em
  padding: 0.7em
  border: 1px solid transparent
  border-radius: 5px
  background-color: white
  box-shadow: 0 1px 3px 0 var(--c-border)
  -webkit-transition: box-shadow 150ms ease
  transition: box-shadow 150ms ease
.card-billing
  cursor: pointer
  border: 1px solid var(--c-border)
  border-radius: 5px;
  padding: 2em 1.25em
  .billing-icon
    align-items: center
    justify-content: center
    display: flex
  h4
    font-size: 0.875em
</style>

<template lang="pug">
.page-checkout
  main
    c-button(title="Back" @click="goBack()")
    header
      .title Time to power up
      .intro Review and confirm your subsctiption
    section
      .title_container
        .title_plan Plan
        c-switcher(id="payment1" v-if="isBusiness" :options="paymentOptions" v-model="form.annually" type="primary")
      .content
        .plan
          .plan-name {{plan.title}}
          .plan-description {{plan.intro}}
        template(v-if="plan.price")
          template(v-if="isBusiness")
            template(v-if="form.annually")
              .plan
                .plan-price ${{plan.price[0] * 12}}/year
                .plan-description(v-if="plan.users") {{plan.users[0]}}
            template(v-else)
              .plan
                .plan-price ${{plan.price[1]}}/mo
                .plan-description(v-if="plan.users") {{plan.users[1]}}
          template(v-else)
            .plan
              .plan-price ${{plan.price[0]}}/year
    section(v-if="isBusiness")
      .content
        .plan
          .plan-name Users
          .plan-description Enter the number of users (this is often your employee headcount)
        .plan
          .user_input
            input(v-model="users" type="number")
    section
      .content
        .plan
          .plan-name Payment Method
        c-button(title="Add Bank Account" v-if="isAddButtonVisible" type="primary" @click="toggleBankModal()")
      stripe-elements.stripe(v-if="stripeLoaded && isAddButtonVisible" ref="elms" v-slot="{ elements, instance }" :stripe-key="publishkey" :instance-option="instanceOptions" :element-options="elementOptions")
        stripe-element(ref="card" :elements="elements" :options="cardOptions")
      c-button.add-button(title="Add" type="primary" @click="addPayment()" v-if="isAddButtonVisible")
      div.grid-6(v-if="!isAddButtonVisible")
        template(v-for="cardresult in cardresults")
          .col-3 Credit Card (primary)
          .col-2(v-if="cardresult.card") **** **** **** {{ cardresult.card.last4 }}
          .col-2(v-else) **** **** **** {{ cardresult.last4 }}
          .col-1
            c-button(title="Remove" type="link" @click="removePayment(cardresult.id)")
  card-container.summary(title="Purchase Summary")
    template(#sub-header)
      c-field.col-5(label="Promo Code" v-model="promocode")
      c-button.col-1.apply-promo(title="Apply" type="primary" @click="applyPromo()")
    template(#content)
      .plan_content
        .plan_item
          .price {{plan.title}} plan
          template(v-if="plan.price")
            template(v-if="isBusiness")
              template(v-if="form.annually")
                .price ${{plan.price[0] * 12}}/year
              template(v-else)
                .price ${{plan.price[1]}}/mo
            template(v-else)
              .plan
                .plan-price ${{plan.price[0]}}/year
        .plan_item(v-if="isBusiness")
          .title {{users}} Users ({{plan.freeUsers}} Free)
          template(v-if="users > plan.freeUsers")
            template(v-if="form.annually")
              .price +${{(users - plan.freeUsers) * 120}}
            template(v-else)
              .price +${{(users - plan.freeUsers) * 15}}
        .plan_item.save(v-if="isBusiness")
          template(v-if="form.annually && plan.price")
            .title Billed Annually
            .save_price You saved ${{ (plan.price[1] - plan.price[0]) * 12 }}
      .item(v-if="promoInfo.percent_off")
        .title Discount
        .price {{promoInfo.percent_off}}%
      .item(v-if="promoInfo.amount_off")
        .title Discount
        .price -${{promoInfo.amount_off}}
      .total
        .title Total
        .price(v-if="promoInfo.percent_off") ${{plan.price * ( 100 - promoInfo.percent_off ) / 100}}
        .price(v-else-if="promoInfo.amount_off") ${{plan.price - promoInfo.amount_off}}
        .price(v-else)
          template(v-if="plan.price")
            template(v-if="isBusiness")
              template(v-if="users > plan.freeUsers")
                template(v-if="form.annually")
                  .price ${{plan.price[0] * 12 + (users - plan.freeUsers) * 120}}
                template(v-else)
                  .price ${{plan.price[1] + (users - plan.freeUsers) * 15}}
              template(v-else)
                template(v-if="form.annually")
                  .price ${{plan.price[0] * 12}}
                template(v-else)
                  .price ${{plan.price[1]}}
            template(v-else)
              .price ${{plan.price[0]}}
      c-button.purchase-button(title="Complete Purchase" type="primary" :disabled="!isAddButtonVisible" @click="onBoard()")
c-modal(title="Add Bank Account" v-model="isBankMethodVisible")
  template(#content)
    .card-billing
      plaid-link(clientName="Complect" :env="plaidenv" :webhook="plaidwebhook" :public_key="plaidkey" :products="['auth','transactions']" :onSuccess="plaidSuccess" :onLoad="plaidLoad" :onExit="plaidExit" :onEvent="plaidEvent")
        .grid-6
          .col-1.billing-icon
            icon(name="bank" size="huge")
          .col-4
            h1 Bank account
            h4 Use your bank account for future payments
          .col-1.billing-icon
            icon(name="chevron-right")
</template>

<script>
import { useRouter } from 'vue-router'
import useProfile from '~/store/Profile.js'
import useBusiness from '~/store/Business.js'
import useForm from '~/store/Form.js'
import useAuth from '~/core/auth.js'
import { loadStripe } from '@stripe/stripe-js'
import { StripeElements, StripeElement } from 'vue-stripe-js'
import PlaidLink from 'vue-plaid-link2'
import { onBeforeMount, onMounted, ref, inject } from 'vue'
import BusinessService from '~/services/business.js'
import ProfileService from '~/services/profile.js'
import { getStripePayments, addStripePayment, deleteStripePayment, upgradeSubsciption } from '~/services/payments.js'

import cSwitcher from '~/components/Inputs/cSwitcher.vue'
import cModal from '~/components/Misc/cModal.vue'
import { manualApi } from '~/core/api.js'
import { notifyMessages } from '~/data/notifications.js'
import { plans } from '~/data/plans.js'
export default {
  components: { StripeElements, StripeElement, cSwitcher, PlaidLink, cModal },
  setup () {
    const { profile } = useProfile()
    const { isBusiness } = useBusiness()
    const userType = isBusiness ? 'business' : 'specialist'
    const { form, resetForm } = useForm('onboarding')
    const { restoreSession } = useAuth()
    const notification = inject('notification')
    const plan = ref({})
    const router = useRouter()
    const goBack = () => router.go(-1)
    const isAddButtonVisible = ref(true)
    const publishkey = ref(import.meta.env.VITE_STRIPE)
    const instanceOptions = ref({ })
    const elementsOptions = ref({ })
    const cardOptions = ref({ value: { postalCode: '' } })
    const stripeLoaded = ref(false)
    const card = ref()
    const elms = ref()
    const users = ref(0)
    const cardresults = ref([])
    const promocode = ref()
    const promoInfo = ref({ })
    const plaidkey = import.meta.env.VITE_PLAID_PK
    const plaidwebhook = import.meta.env.VITE_PLAID_WH
    const plaidenv = import.meta.env.VITE_PLAID_ENV
    const plaidSuccess = (publicToken, metadata) => console.debug(publicToken, metadata)
    const plaidLoad = () => {}
    const plaidExit = (err, metadata) => console.debug(err, metadata)
    const plaidEvent = (eventName, metadata) => console.debug(eventName, metadata)
    const isBankMethodVisible = ref(false)
    const toggleBankModal = () => isBankMethodVisible.value = !isBankMethodVisible.value
    const paymentOptions = ref([
      {
        title: 'Billed Annually',
        value: true
      }, {
        title: 'Billed Monthly',
        value: false
      }
    ])
    const addPayment = () => {
      const cardElement = card.value.stripeElement
      elms.value.instance.createToken(cardElement).then(async result => {
        const stripeToken = result.token.id
        cardresults.value[0] = result.token
        try {
          await addStripePayment({ stripeToken })
          notification({
            type: 'success',
            title: 'Success',
            message: notifyMessages.payment.add.success
          })
          isAddButtonVisible.value = true
        } catch (error) {
          notification({
            type: 'error',
            title: 'Error',
            message: notifyMessages.payment.add.error
          })
        }
      })
    }
    const removePayment = async id => {
      try {
        await deleteStripePayment(id)
        cardresults.value = cardresults.value.filter(cardresult => cardresult.id !== id)
        if (!cardresults.value || cardresults.value.length === 0) isAddButtonVisible.value = true
        notification({
          type: 'success',
          title: 'Success',
          message: notifyMessages.payment.delete.success
        })
      } catch (error) {
        notification({
          type: 'error',
          title: 'Error',
          message: notifyMessages.payment.delete.error
        })
      }
    }
    const onBoard = async () => {
      try {
        if (isBusiness) {
          const businessService = new BusinessService()
          await businessService.updateDocument(form.value)
        } else {
          const specialistService = new ProfileService()
          await specialistService.updateDocument(form.value)
        }

        let planName
        if (form.value.annually) planName = plan.value.name[0]
        else planName = plan.value.name[1]
        const upgradeInfo = {
          upgrade: {
            plan: planName,
            seats_count: users.value
          }
        }
        await upgradeSubsciption(upgradeInfo)

        await restoreSession()
        await resetForm()
        router.push({ name: 'Dashboard' })
      } catch (error) {
        console.error(error)
      }
    }
    const applyPromo = async () => {
      try {
        if (promocode.value) {
          const response = await manualApi({
            method: 'post',
            url: 'payment/promocode',
            data: JSON.stringify({ promocode: promocode.value })
          })
          promoInfo.value = response.data
        }
      } catch (error) {
        notification({
          type: 'error',
          title: 'Error',
          message: notifyMessages.payment.input.error
        })
      }
    }
    onBeforeMount(() => {
      const stripePromise = loadStripe(publishkey.value)
      stripePromise.then(() => stripeLoaded.value = true)
    })
    onMounted(async () => {
      plan.value = plans[userType].find(item => item.key === form.value.plan)
      cardresults.value = await getStripePayments()
      if (cardresults.value && cardresults.value.length > 0) isAddButtonVisible.value = false
    })

    return {
      userType,
      isBusiness,
      plan,
      paymentOptions,
      users,
      goBack,
      profile,
      form,
      onBoard,
      publishkey,
      instanceOptions,
      elementsOptions,
      cardOptions,
      card,
      elms,
      stripeLoaded,
      addPayment,
      removePayment,
      isAddButtonVisible,
      cardresults,
      promoInfo,
      promocode,
      applyPromo,
      plaidkey,
      plaidenv,
      plaidwebhook,
      plaidSuccess,
      plaidLoad,
      plaidExit,
      plaidEvent,
      isBankMethodVisible,
      toggleBankModal
    }
  }
}
</script>

<style lang="stylus" scoped>
.page-checkout
  display: flex
  align-items: center
  gap: 2em
  overflow: auto
  min-height: 100%
  @media (max-width: 800px)
    flex-direction: column
  main
    flex: 3 0 auto
    background: var(--c-bg-z2)
    align-self: stretch
    padding: 2em
    border-top: 1px solid var(--c-border)
    border-right: 1px solid var(--c-border)
    @media (max-width: 950px)
      flex: initial
    @media (max-width: 575px)
      padding: 2em 1em
    .title
      font-size: 1.6em
    header
      line-height: 1.3
      margin: 2.5em 0
    section
      .title_container
        display: flex
        justify-content: space-between
        margin-bottom: 2em
      .title_plan
        font-size: 1.5em
      .title
        margin-bottom: 1em
      .content
        padding: 1.5em 0
        display: flex
        gap: 2em
        align-items: center
        justify-content: space-between
        border-top: 1px solid var(--c-border)
        .user_input
          background: var(--c-bg-z2);
          box-shadow: 0 0 0 1px var(--c-border);
          border-radius: var(--v-inputs-border-radius);
          overflow: hidden;
          display: flex;
          align-items: center;
          gap: 0.3em;
          padding: 0.35em 0.5em;
          width: 4em;
          min-height: 2em;
          input
            font-size: 0.9em;
            flex: 1 0 auto;
            width: 1em;
            color: #000;
            background: transparent;
            border: none;
            outline: none;
            line-height: 1.3;
            padding: 0;
            margin: 0;
      .plan-name, .plan-price
        font-weight: bold
        font-size: 1.3em
        line-height: 1.2
      .plan-price
        display: flex
        justify-content: end
      .plan-description
        margin-top: 0.5em
        color: #797b7e
        font-size: 0.9em
        line-height: 1.3
      .stripe
        box-sizing: border-box;
        padding: 0.625em 0.75em;
        border-radius: 4px;
        background-color: white;
        box-shadow: 0 1px 3px 0 #e6ebf1;
        -webkit-transition: box-shadow 150ms ease;
        transition: box-shadow 150ms ease;
    .item
      .title
        font-weight: bold
        font-size: 1.3em

    .add-button
      margin-top: 2em
      margin-left: auto

  .summary
    margin-right: 2em
    flex: 1 3 20em
    min-width: 20em
    // max-width: 28em
    @media (max-width: 575px)
      margin-right: 0
    .apply-promo
      align-self: end
    .plan_content
      display: flex
      flex-direction: column
      gap: 0.4em
      padding-bottom: 1.5em
      border-bottom: 1px solid var(--c-border)
      font-size: 0.875em
      .plan_item
        display: flex
        justify-content: space-between
    .save
      color: var(--c-green)
    .item
      border-bottom: 1px solid var(--c-border)
      padding-bottom: 2em
      line-height: 1.3
    .item, .total
      display: flex
      gap: 1em
      justify-content: space-between
    .price, .total
      font-weight: bold
    .total
      font-size: 1.3em
    .purchase-button
      margin-top: 2em
.card-billing
  cursor: pointer
  .billing-icon
    align-items: center
    justify-content: center
    display: flex
  h4
    font-size: 0.875em
</style>

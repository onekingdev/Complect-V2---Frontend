<template lang="pug">
card-container(title="Create Proposal")
  template(#content)
    .proposal-content.col-3
      .proposal-info-content.grid-6
        p.proposal-title Terms
        c-field.col-3(label="Start Date" type="date" v-model="form.startsAt"  :errors="errors.startsAt" required)
        c-field.col-3(label="Due Date" type="date" v-model="form.endsAt"  :errors="errors.endsAt" required)
        c-field(v-if="job.priceType === 'fixed'" label="Bid Price" v-model="form.budget"  :errors="errors.budget" required)
        c-field(v-else label="Hourly Rate" v-model="form.hourlyRate"  :errors="errors.hourlyRate" required)
        c-select(v-if="job.priceType === 'fixed'" label="Payment Schedule" :data="fieldsOptions.fixedPaymentSchedule" v-model="form.paymentSchedule"  :errors="errors.paymentSchedule" required)
        c-select(v-else label="Payment Schedule" :data="fieldsOptions.hourlyPaymentSchedule" v-model="form.paymentSchedule"  :errors="errors.paymentSchedule" required)
      hr
      .proposal-info-content
        p.proposal-title Role
        c-textarea(label="Role Details" v-model="form.roleDetails"  :errors="errors.roleDetails" required)
        c-textarea(label="Key Deliverables" v-model="form.keyDeliverables"  :errors="errors.keyDeliverables" required)
      hr
      .proposal-info-content
        p.proposal-title Attachments
        c-dropzone
      .proposal-actions
        c-button.right-button(title="ReSubmit" type="primary" @click="submitProposal()" v-if="proposals && proposals.length > 0")
        c-button.right-button(title="Submit Proposal" type="primary" @click="submitProposal()" v-else)
        c-button.right-button(title="Save Draft" type="default" @click="saveProposal()" v-else)
        c-button.right-button(title="Exit" type="link" @click="gotoJobBoard()")
    .job-content.col-3
      .job-detail-content
        p.proposal-title TestTest
        .job-info-content.grid-6
          .col-1.job-info-title Start Date
          div.col-1
          .col-1.job-info-value {{ formatDate(job.startsAt) }}
        .job-info-content.grid-6
          .col-1.job-info-title End Date
          div.col-1
          .col-1.job-info-value {{ formatDate(job.endsAt) }}
        .job-info-content.grid-6
          .col-1.job-info-title Location
          div.col-1
          .col-1.job-info-value {{ locationType[job.locationType] }}
        .job-info-content.grid-6
          .col-1.job-info-title Industry
          div.col-1
          .col-1.job-info-value {{ job.industries?.map( ind => industriesMap[ind] ).join(',  ') }}
        .job-info-content.grid-6
          .col-1.job-info-title Min. Expereince
          div.col-1
          .col-1.job-info-value {{ minExperience[job.minExperience] }}
        .job-info-content.grid-6
          .col-1.job-info-title Description
          div.col-1
          .col-1.job-info-value {{ job.description }}
        .job-info-content.grid-6
          .col-1.job-info-title Role Details
          div.col-1
          .col-1.job-info-value {{ job.roleDetail }}
        div.grid-6.job-info
          div.col-2.job-info-ind
            icon(name="money" size="small")
            .detail
              label(v-if="job.priceType !== 'fixed'")
                span Hourly Rate
                p ${{ job.hourlyRate }} ~ ${{ job.maxHourlyRate }}
              label(v-else)
                span Fixed Budget
                p ${{ job.budget }}
          div.col-2.border-left.job-info-ind
            icon(name="money" size="small")
            .detail
              span PAYMENT SCHEDULE
              p {{ paymentType[job.paymentSchedule] }}
          div.col-2.border-left.job-info-ind
            icon(name="world" size="small")
            .detail
              span EXPEREINCE
              p {{ minExperience[job.minExperience] }}
      hr
      .skill-content
        p.skill-title Skills
        .skill-ind(v-for="skill in job.skills") {{ skill }}
      hr
      .client-content
        .client-info
          .client-name-content
            c-avatar(avatar="avatar.jpg" :firstName="business.first_name" :lastName="business.last_name" )
            div
              p.client-name(@click="toggleChatModal" ) {{ business.firstName }} {{ business.lastName }}
              p.client-location {{ business.city }}, {{ business.state }}, {{ business.country }}
          .client-details-content
            .client-detail-content.grid-6
              .col-1.client-info-title Industry
              div.col-1
              .col-1.client-info-value {{ business.industry }}
            .client-detail-content.grid-6
              .col-1.client-info-title Jurisdictions
              div.col-1
              .col-1.client-info-value {{ business.jurisdictions }}
            .client-detail-content.grid-6
              .col-1.client-info-title AUM
              div.col-1
              .col-1.client-info-value {{ business.AUM }}
            .client-detail-content.grid-6
              .col-1.client-info-title Accouonts
              div.col-1
              .col-1.client-info-value {{ business.accounts }}
            .client-detail-content.grid-6
              .col-1.client-info-title Employees
              div.col-1
              .col-1.client-info-value {{ business.employee }}
c-modal(:title="`Message with ${business.firstName} ${business.lastName}`" v-model="isChatVisible")
  template(#content)
    c-chat(:comments="comments")
</template>

<script>
import { ref, inject, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { formatDate, validates } from '~/core/utils.js'
import useProfile from '~/store/Profile.js'
import { industries, jurisdictions, minExperience, paymentType, locationType } from '~/data/static.js'
import { required, requiredUnless } from '@vuelidate/validators'
import { requireDate } from '~/core/customValidates.js'
import UseData from '~/store/Data.js'
import cSelect from '~/components/Inputs/cSelect.vue'
import cLabel from '~/components/Misc/cLabel.vue'
import cBadge from '~/components/Misc/cBadge.vue'
import cAvatar from '~/components/Misc/cAvatar.vue'
import cChat from '~/components/Misc/cChat.vue'
import cModal from '~/components/Misc/cModal.vue'
import cDropzone from '~/components/Inputs/cDropzone.vue'
const business = ref({
  id: '3234234029384209384',
  firstName: 'Manuel',
  lastName: 'Perez',
  city: 'New York',
  state: 'NY',
  industry: 'Banking',
  jurisdictions: 'USA',
  AUM: '234234234',
  accounts: 10,
  employee: 2,
  country: 'United State'
})
export default {
  components: { cSelect, cLabel, cBadge, cAvatar, cChat, cModal, cDropzone },
  // eslint-disable-next-line max-lines-per-function
  setup () {
    const jobs = new UseData('jobs')
    const proposals = new UseData('proposals')
    const { profile } = useProfile()
    const errors = ref({})
    const notification = inject('notification')
    const isChatVisible = ref(false)
    const router = useRouter()
    const route = useRoute()
    const form = ref({
      startsAt: '',
      endsAt: '',
      hourlyRate: '',
      budget: '',
      priceType: '',
      paymentSchedule: '',
      roleDetails: '',
      keyDeliverables: '',
      document: '',
      ownerid: profile.value.id,
      jobid: route.params.id
    })
    const validateInfor = computed(() => ({
      rules: {
        startsAt: { required: requireDate },
        endsAt: { required: requireDate },
        hourlyRate: { required: requiredUnless(form.value.priceType === 'fixed') },
        budget: { required: requiredUnless(form.value.priceType !== 'fixed') },
        roleDetails: { required },
        paymentSchedule: { required },
        keyDeliverables: { required }
      },
      data: {
        startsAt: form.value.startsAt,
        endsAt: form.value.endsAt,
        hourlyRate: form.value.hourlyRate,
        budget: form.value.budget,
        roleDetails: form.value.roleDetails,
        paymentSchedule: form.value.paymentSchedule,
        keyDeliverables: form.value.keyDeliverables
      }
    }))

    const stepValidate = async () => {
      const step = validateInfor.value
      errors.value = await validates(step.rules, step.data)
      return Object.keys(errors.value).length === 0
    }

    const fieldsOptions = {
      fixedPaymentSchedule: [
        {
          title: 'Upfront',
          value: 'upfront'
        }, {
          title: '50/50',
          value: '50'
        }, {
          title: 'Upon Completion',
          value: 'uponCompletion'
        }
      ],
      hourlyPaymentSchedule: [
        {
          title: 'Upon Completion',
          value: 'uponCompletion'
        }, {
          title: 'Monthly',
          value: 'monthly'
        }, {
          title: 'Bi-weekly',
          value: 'biweekly'
        }
      ]
    }
    // eslint-disable-next-line no-sequences
    const juristdictionMap = jurisdictions.reduce((jur, cur) => (jur[cur.value] = cur.title, jur), {})
    // eslint-disable-next-line no-sequences
    const industriesMap = industries.reduce((ind, cur) => (ind[cur.value] = cur.title, ind), {})
    const toggleChatModal = () => isChatVisible.value = !isChatVisible.value
    const gotoJobBoard = () => router.push({ name: 'JobBoard' })
    const saveProposal = async () => {
      try {
        form.value.status = 'draft'
        await proposals.createDocuments(form.value)
        notification({
          type: 'success',
          title: 'Success',
          message: 'Proposal has been saved'
        })
        gotoJobBoard()
      } catch (error) {
        notification({
          type: 'error',
          title: 'Error',
          message: 'Proposal has not been saved. Please try again.'
        })
      }
    }
    const submitProposal = async () => {
      try {
        form.value.status = 'pending'
        const isValidate = await stepValidate()
        if (isValidate) {
          // eslint-disable-next-line max-depth
          if (!proposals.getDocuments().value || proposals.getDocuments().value.length === 0) {
            await proposals.createDocuments(form.value)
            notification({
              type: 'success',
              title: 'Success',
              message: 'Proposal has been submitted.'
            })
          } else {
            await proposals.updateDocument(form.value.id, form.value)
            notification({
              type: 'success',
              title: 'Success',
              message: 'Proposal has been submitted.'
            })
          }
          gotoJobBoard()
        }
      } catch (error) {
        notification({
          type: 'error',
          title: 'Error',
          message: 'Proposal has not been submitted. Please try again.'
        })
      }
    }
    onMounted(async () => {
      await jobs.readDocuments(route.params.id)
      await proposals.readDocuments('', { jobid: route.params.id, ownerid: profile.value.id })
      if (!proposals.getDocuments().value || proposals.getDocuments().value.length === 0) {
        form.value.startsAt = jobs.getDocument().value.startsAt
        form.value.endsAt = jobs.getDocument().value.endsAt
        form.value.priceType = jobs.getDocument().value.priceType
      } else form.value = proposals.getDocuments().value[0]
    })
    return {
      job: jobs.getDocument(),
      proposals: proposals.getDocuments(),
      business,
      formatDate,
      toggleChatModal,
      isChatVisible,
      fieldsOptions,
      form,
      locationType,
      paymentType,
      minExperience,
      juristdictionMap,
      industriesMap,
      gotoJobBoard,
      saveProposal,
      submitProposal,
      errors
    }
  }
}
</script>
<style lang="stylus" scoped>
.card-container
  width: 90%;
  margin: auto;
  margin-top: 2em
  background: white
  .proposal-title
    font-size: 1.25em
    margin-bottom: 1em
  hr
    border: 1px solid var(--c-border)
  .proposal-content
    .proposal-info-content
      margin-top: 1.25em
      margin-bottom: 1.25em;
    .proposal-actions
      display: flex
      flex-direction: row-reverse
      gap: 1em
  .job-content
    border: 1px solid var(--c-border)
    border-radius: 5px
    .job-detail-content
      padding: 1.25em 3em
      .job-info-content
        .job-info-title
          color: var(--c-grey)
          font-size: 0.875em
        .job-info-value
          color: var(--c-headers)
          font-size: 1em
      .job-info
        margin-top: 2em
        .border-left
          border-left: 1px solid var(--c-border)
          padding-left: 1.25em
        .job-info-ind
          svg
            margin-top: 0.375em
          display: flex
          flex-direction: row
          gap: 1em
          .detail
            font-weight: 700
          span
            color: var(--c-grey-500)
            font-weight: 500
    .skill-content
      padding: 2em 3em
      .skill-title
        font-size: 1.25em
        font-weight: 700
        margin-bottom: 1.25em
      .skill-ind
        border: 1px solid var(--c-border)
        border-radius: 5px
        display: inline-block
        padding: 0.125em 0.3em
        margin-right: 0.7em
        font-size: 0.875em
    .client-content
      padding: 2em 3em
      .client-title
        font-size: 1.25em
        font-weight: 700
      .client-info
        margin-top: 1rem
        border: 1px solid var(--c-border)
        border-radius: 5px
        .client-name-content
          display: flex
          gap: 2em
          border-bottom: 1px solid var(--c-border)
          padding: 2rem;
          .client-name
            color: var(--c-selected);
          .client-location
            color: var(--c-grey-500)
        .client-details-content
          padding: 2rem;
          .client-info-title
            color: var(--c-grey)
            font-size: 0.875em
</style>

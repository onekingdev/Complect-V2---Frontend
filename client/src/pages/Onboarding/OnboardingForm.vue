<template lang="pug">
.onboarding-form.medium-card
  card-container(title="Set Up Your Account")
    template(#content)
      //- Business
      c-form-wizard(v-if="isBusiness" :steps="wizardSteps.business")
        template(#step1)
          section
            .header.crd-header Do you have a CRD number?
              .crd-info
                .tooltip You can find your CRD number on the&nbsp;
                  router-link(to="https://adviserinfo.sec.gov" target="_blank") IAPD site
                icon(name="info-black" size="small")
            .intro The CRD number will be used to auto-populate information about your business
            .inputs.grid-6
              c-radios.crd-radio(id="crd" :data="radioOptions" v-model="form.crd")
              c-field.col-3(id="crdValue" label="What is your CRD number?" v-if="form.crd" v-model="form.crdValue" @change="updateFieldsFromCRD()")
        template(#step2)
          c-field(label="Company Name" type="text" :errors="errors.company" required v-model="form.company")
          c-field.sub-col.col-3(label="AUM" type="currency" v-model="form.aum")
          c-field.sub-col.col-3(label="Number of Accounts" type="number" v-model="form.accounts")
          c-select.sub-col.col-3(label="Industry" placeholder="Select Industry" :errors="errors.industry_ids" :data="industries" v-model="form.industry_ids" searchable multiple required)
          c-select.sub-col.col-3(label="Sub-Industry" placeholder="Select Sub-Industry" :data="filteredSubIndustries" v-model="form.subIndustry_id" searchable multiple)
          c-select.sub-col.col-3(label="Jurisdiction" placeholder="Select Jurisdiction" :errors="errors.jurisdiction_ids" :data="jurisdictions" v-model="form.jurisdiction_ids" searchable multiple required)
          c-select.sub-col.col-3(label="Time Zone" placeholder="Select Time Zone" :errors="errors.time_zone" :data="timezones" v-model="form.time_zone" searchable required)
          c-field.sub-col.col-3(label="Phone Number" type="tel" v-model="form.phone_number")
          c-field.sub-col.col-3(label="Company Website" type="url" v-model="form.website")
          .divider
          c-address.business-col.col-5(label="Business Address" :errors="errors.address" :value="form.address" @update="updateAddressChange" required)
          c-field.apt-col.col-1(label="Apt/Unit" type="text" v-model="form.apt")
          c-field.city-col.col-2(label="City" type="text" :errors="errors.city" v-model="form.city" required)
          c-field.state-col.col-2(label="State" type="text" :errors="errors.state" v-model="form.state")
          c-field.zip-col.col-2(label="Zip Code" type="number" :errors="errors.zip" v-model="form.zip" required)
        template(#step3)
          .plan-header
            .title Choose Your Plan
            c-switcher(id="payment" :options="formOptions.payments" v-model="form.annually" type="primary" fullwidth)
          c-plans(:plans="plans[userType]" :annually="form.annually" v-model="form.plan" @checkout="goToCheckout()")

      //- Specialist
      c-form-wizard(v-else :steps="wizardSteps.specialist")
        template(#step1)
          section
            .header What jurisdiction does your expertise extend to?
            .intro Providing your jurisdiction(s) will help find clients within your domain of expertise. Select all that apply.
            .inputs.grid-6
              c-select.col-3(label="Jurisdiction" placeholder="Select Jurisdiction" :errors="errors.jurisdiction_ids" :data="jurisdictions" v-model="form.jurisdiction_ids" searchable multiple required)
              c-select.col-3(label="Time Zone" placeholder="Select Time Zone" :errors="errors.time_zone" :data="timezones" v-model="form.time_zone" searchable required)
          section
            .header What industries do you serve?
            .inputs.grid-6
              c-select.col-3(label="Industry" placeholder="Select Industry" :errors="errors.industry_ids" :data="industries" v-model="form.industry_ids" searchable multiple required)
              c-select.col-3(label="Sub-Industry" placeholder="Select Sub-Industry" :data="filteredSubIndustries" v-model="form.subIndustry_id" searchable multiple)
          section
            .header Are you a former regulator?
            .inputs
              c-radios(id="regulator" :data="radioOptions" v-model="form.regulator")
            .inputs
              c-field(v-if="form.regulator" type="tag" label="Regulator" placeholder="Select Regulators" :data="formOptions.regulators" v-model="form.regulators" searchable)
        template(#step2)
          section
            .header Tell us more about yourself:
            .intro Enter any relevant skills to better match you with suitable projects.
            .inputs
              c-field(type="tag" label="Skills" placeholder="Select Skills" :data="formOptions.skills" v-model="form.skills" searchable)
          section
            .header Your Hourly Rate
            .inputs
              c-field(label="Hourly Rate" type="currency" :errors="errors.hourly_rate" v-model="form.hourly_rate")
          section
            .header What's your experience?
            .intro Select one that best matches your level of your expertise.
            .inputs
              c-radio-cards(id="experience" :data="formOptions.experience" :errors="errors.experience" v-model="form.experience")
          section
            .header (Optional) Upload your resume:
            c-dropzone
        template(#step3)
          .plan-header
            .title Choose Your Membership Plan
            .subtitle Want to skip selecting a plan?
            c-button(title="Continue With Free Plan" type="plan" @click="goToCheckout(true)")
          c-plans(:type="userType" :plans="plans[userType]" :annually="true" v-model="form.plan" @checkout="goToCheckout()")
</template>

<script>

import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import useProfile from '~/store/Profile.js'
import useBusiness from '~/store/Business.js'
import useForm from '~/store/Form.js'
import cFormWizard from '~/components/FormWizard/cFormWizard.vue'
import cRadios from '~/components/Inputs/cRadios.vue'
import cRadioCards from '~/components/Inputs/cRadioCards.vue'
import cSelect from '~/components/Inputs/cSelect.vue'
import cDropzone from '~/components/Inputs/cDropzone.vue'
import cSwitcher from '~/components/Inputs/cSwitcher.vue'
import cPlans from '~/components/Misc/cPlans.vue'

import BusinessService from '~/services/business.js'
import ProfileService from '~/services/profile.js'
import { getMisc, getSkills } from '~/services/tags.js'
import { upgradeSubsciption } from '~/services/payments.js'

import useAuth from '~/core/auth.js'
import cAddress from '~/components/Inputs/cAddress.vue'

// import { industries, jurisdictions, timezones } from '~/data/static.js'
import { plans } from '~/data/plans.js'

import { validates } from '~/core/utils.js'
import { required, requiredUnless } from '@vuelidate/validators'
import { requireForArray, numberGreaterThanZero } from '~/core/customValidates.js'

const radioOptions = [
  { title: 'No', value: false }, { title: 'Yes', value: true }
]

const formOptions = {
  skills: [
    'HTML', 'CSS', 'Javascript', 'Python', 'Django', 'Flask', 'PHP', 'Vue.js', 'Angular'
  ],
  regulators: [
    'Test', 'Smile'
  ],
  experience: [
    { value: 0, title: 'Junior', description: 'Beginner consultant with some industry experience.' }, { value: 1, title: 'Intermediate', description: 'Good experience and solid knowledge of the industry.' }, { value: 2, title: 'Expert', description: 'Deep understanding of industry with varied experience.' }
  ],
  payments: [
    {
      title: 'Billed Annually',
      value: true
    }, {
      title: 'Billed Monthly',
      value: false
    }
  ]
}

const baseForm = {
  specialist: {
    regulator: false,
    annually: true,
    plan: 'standard'
  },
  business: {
    crd: false,
    annually: true,
    plan: 'starter'
  }
}

export default {
  components: {
    cFormWizard,
    cRadios,
    cAddress,
    cRadioCards,
    cSelect,
    cDropzone,
    cSwitcher,
    cPlans
  },
  setup () {
    const router = useRouter()
    const { profile } = useProfile()
    const { isBusiness } = useBusiness()
    const userType = isBusiness ? 'business' : 'specialist'
    const { form, resetForm } = useForm('onboarding', baseForm[userType])
    const errors = ref({})
    const { restoreSession } = useAuth()
    const businessService = new BusinessService()
    const specialistService = new ProfileService()
    const misc = ref({})
    const skills = ref({})
    const industries = computed(() => {
      if (!misc.value.industries) return []
      const parentIndustries = misc.value.industries.filter(industry => !industry.parent_id)
      return parentIndustries.map(industry => ({ value: industry.id, title: industry.name }))
    })
    const jurisdictions = computed(() => {
      if (!misc.value.jurisdictions) return []
      return misc.value.jurisdictions.map(jurisdiction => ({ value: jurisdiction.id, title: jurisdiction.name }))
    })
    const timezones = computed(() => {
      if (!misc.value.timezones) return []
      return misc.value.timezones.map(timezone => ({ value: timezone[0], title: timezone[1] }))
    })

    const validateInfor = computed(() => ({
      specialist: {
        1: {
          rules: {
            jurisdiction_ids: { required: requireForArray },
            industry_ids: { required: requireForArray },
            time_zone: { required: requireForArray }
          },
          data: {
            jurisdiction_ids: form.value.jurisdiction_ids,
            time_zone: form.value.time_zone,
            industry_ids: form.value.industry_ids
          }
        },
        2: {
          rules: {
            hourly_rate: { validateRate: numberGreaterThanZero },
            experience: { required: requiredUnless(form.value.experience >= 0) }
          },
          data: {
            hourly_rate: form.value.hourly_rate,
            experience: form.value.experience
          }
        }
      },
      business: {
        2: {
          rules: {
            company: { required },
            industry_ids: { required: requireForArray },
            jurisdiction_ids: { required: requireForArray },
            time_zone: { required: requireForArray },
            address: { required },
            city: { required },
            zip: { required }
          },
          data: {
            company: form.value.company,
            industry_ids: form.value.industry_ids,
            jurisdiction_ids: form.value.jurisdiction_ids,
            time_zone: form.value.time_zone,
            address: form.value.address,
            city: form.value.city,
            zip: form.value.zip
          }
        }
      }
    }))

    const stepValidate = async currentStep => {
      const step = validateInfor.value[userType][currentStep]
      errors.value = await validates(step.rules, step.data)
      return Object.keys(errors.value).length === 0
    }

    const wizardSteps = {
      business: [
        { title: 'CRD Number' }, { title: 'Company Information', validates: stepValidate }, { title: 'Choose Plan' }
      ],
      specialist: [
        { title: 'Background', validates: stepValidate }, { title: 'Skills and education', validates: stepValidate }, { title: 'Choose plan' }
      ]
    }

    const goToCheckout = async isStandard => {
      try {
        if (isStandard) form.value.plan = plans.specialist[0].key
        const newForm = form.value
        if (isBusiness && form.value.plan === plans.business[0].key) {
          newForm.industry_ids = newForm.industry_ids.concat(newForm.subIndustry_id)
          delete newForm.subIndustry_id
          await businessService.updateDocument(newForm)
          await restoreSession()
          await resetForm()
          const upgradeInfo = {
            upgrade: {
              plan: 'free',
              seats_count: 0
            }
          }
          await upgradeSubsciption(upgradeInfo)
          router.push({ name: 'Dashboard' })
        } else if (!isBusiness && form.value.plan === plans.specialist[0].key) {
          newForm.industry_ids = newForm.industry_ids.concat(newForm.subIndustry_id)
          delete newForm.subIndustry_id
          delete newForm.company
          await specialistService.updateDocument(newForm)
          const upgradeInfo = {
            upgrade: {
              plan: 'free',
              seats_count: 0
            }
          }
          await upgradeSubsciption(upgradeInfo)
          await restoreSession()
          await resetForm()
          router.push({ name: 'Dashboard' })
        } else {
          form.value.email = profile.value.email
          if (!isBusiness) form.value.company = `${profile.value.firstName} ${profile.value.lastName}`
          router.push({ name: 'OnboardingCheckout' })
        }
      } catch (error) {
        console.error(error)
      }
    }

    const updateAddressChange = data => {
      const { address, city, state, zip } = data
      form.value.address = address
      if (city) form.value.city = city
      if (state) form.value.state = state
      if (zip) form.value.zip = zip
    }

    const filteredSubIndustries = computed(() => {
      if (!misc.value.industries) return []
      if (!form.value.industry_ids) return []
      const childIndustries = misc.value.industries.filter(industry => form.value.industry_ids.indexOf(industry.parent_id) > -1)
      return childIndustries.map(industry => ({ value: industry.id, title: industry.name }))
    })

    const updateFieldsFromCRD = async () => {
      await businessService.updateDocument({ business: { crd: form.value.crdValue } })
      const crdResult = businessService.getDocument().value
      if (!crdResult) return
      form.value.company = crdResult.business_name
      form.value.website = crdResult.website
      form.value.aum = crdResult.aum
      form.value.accounts = crdResult.accounts
      form.value.tel = crdResult.phone_number
      form.value.address = crdResult.address
      form.value.apt = crdResult.apt_unit
      form.value.city = crdResult.city
      form.value.state = crdResult.state
      form.value.zip = crdResult.zipcode
      form.value.time_zone = crdResult.time_zone
    }
    watch(() => form.value.industryids, () => {
      if (!form.value.subIndustry_id) return
      form.value.subIndustry_id = form.value.subIndustry_id.filter(subId => {
        if (!misc.value.industries) return false
        const subIndustry = misc.value.industries.find(industry => industry.id === subId)
        if (!subIndustry) return false
        if (!form.value.industry_ids) return false
        if (form.value.industry_ids.indexOf(subIndustry.parent_id) === -1) return false
        return true
      })
    })
    onMounted(async () => {
      misc.value = await getMisc()
      skills.value = await getSkills()
    })

    return {
      errors,
      userType,
      isBusiness,
      radioOptions,
      wizardSteps,
      form,
      formOptions,
      industries,
      filteredSubIndustries,
      jurisdictions,
      timezones,
      plans,
      goToCheckout,
      updateAddressChange,
      updateFieldsFromCRD
    }
  }
}
</script>

<style lang="stylus" scoped>
.onboarding-form
  .m-container
    max-width: 30em
  .plan-header
    text-align: center
    margin: 0 auto 2em
    .title
      font-size: 2em
      font-weight: 700
    .subtitle
      margin-top: 1.5em
      color: #797b7e
    .c-button, .c-switcher
      margin: 1em auto 0
section
  + section
    margin-top: 1.5em
  .header
    font-size: 1.3em
    line-height: 1.2
  .crd-header
    display: flex
    align-items: center
    gap: 0.5em
    .crd-info
      display: flex
      align-items: center
      position: relative
      .tooltip
        visibility: hidden
        width: 13em
        background: var(--c-tooltip-bgColor)
        text-align: center
        padding: 0.34em 0.68em
        color: var(--c-tooltip-color)
        position: absolute
        bottom: 140%
        left: -7.8em
        opacity: 0
        transition: opacity 0.3s
        font-size: 0.577em
        border-radius: 0.3em
        box-shadow: 0 1rem 1rem -0.5rem rgba(0, 0, 0, 0.35)
        @media (max-width: 450px)
          left: -14em;
        &:after
          content: ""
          position: absolute
          top: 100%
          left: 50%
          margin-left: -5px
          border-width: 5px
          border-style: solid
          border-color: var(--c-tooltip-bgColor) transparent transparent transparent
          @media (max-width: 450px)
            left: 86%
      &:hover .tooltip
        visibility: visible
        opacity: 1
  .intro
    font-size: 0.9em
    margin-top: 0.3em
    line-height: 1.3
    color: #797b7e
  .inputs
    margin-top: 1em
  .crd-radio
    font-size: 0.875em
.c-switcher
  margin: 0 auto 1em
.c-form-wizard
  @media (max-width: 1000px)
    .business-col
      grid-column: 1 / -1
    .apt-col
      grid-column: 1 / -1
    .city-col
      grid-column: 1 / -1
    .state-col
      grid-column: 1 / -1
    .zip-col
      grid-column: 1 / -1
  @media (max-width: 575px)
    .sub-col
      grid-column: 1 / -1

</style>

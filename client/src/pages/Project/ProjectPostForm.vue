<template lang="pug">
page-container(:title="pageTitle")
  template(#content)
    c-form-wizard(section="Projets" title="Post Job" :steps="wizardSteps" :onSubmit="onSubmit")

      template(#step1)
        c-field(label="Job Name" :errors="errors.name" v-model="form.name" required)
        c-field.col-3(label="Start Date" type="date" :errors="errors.startsAt" v-model="form.startsAt" required)
        c-field.col-3(label="Due Date" type="date" :errors="errors.endsAt" v-model="form.endsAt" required)
        c-textarea(label="Description" :errors="errors.description" v-model="form.description" required)
        c-textarea(label="Role Details" :errors="errors.roleDetails" v-model="form.roleDetails" required)
        c-select(label="Location Type" placeholder="Remote" :data="fieldsOptions.locationType" :errors="errors.locationType" v-model="form.locationType" required)
        template(v-if="form.locationType !== 'remote'")
          c-select(label="Location" :data="fieldsOptions.location" :errors="errors.location" v-model="form.location" required)
        c-select(label="Industry" :data="fieldsOptions.industries" :errors="errors.industries" v-model="form.industries" searchable multiple required)
        c-select(label="Jurisdiction" :data="fieldsOptions.jurisdictions" :errors="errors.jurisdictions" v-model="form.jurisdictions" searchable multiple required)

      template(#step2)
        c-select(label="Minimum Experience" :data="fieldsOptions.minExperience" :errors="errors.minExperience" v-model="form.minExperience" required)
        c-checkbox(label="Only former regulators" v-model="form.formerRegulators")
        c-select(label="Skills" :data="fieldsOptions.skills" :errors="errors.skills" v-model="form.skills" searchable multiple required)

      template(#step3)
        c-radio-cards(:data="fieldsOptions.priceType" :errors="errors.priceType" v-model="form.priceType")
        template(v-if="form.priceType === 'fixed'")
          c-field(label="Estimated Budget" :errors="errors.budget" v-model="form.budget" required)
        template(v-else)
          c-field.col-3(label="Estimated Hourly Rate" :errors="errors.hourlyRate" v-model="form.hourlyRate" required)
          c-field.col-3(label="Upper Hourly Rate" :errors="errors.maxHourlyRate" v-model="form.maxHourlyRate" required)
        c-select(v-if="form.priceType === 'fixed'" label="Payment Schedule" :data="fieldsOptions.fixedPaymentSchedule" :errors="errors.paymentSchedule" v-model.value="form.paymentSchedule" required)
        c-select(v-else label="Payment Schedule" :data="fieldsOptions.hourlyPaymentSchedule" :errors="errors.paymentSchedule" v-model.value="form.paymentSchedule" required)

      template(#controls)
        c-button-modal(title="Exit" modalTitle = "Unsaved Change" type="link")
          template(#content)
            .col-1
              icon(name="warning" size="huge")
            .col-5
              p You have unsaved changes. Exiting without saving will clear all unsaved information.
              p
                b Do you want to continue?
          template(#footer)
            c-button(title="Confirm" type="primary" @click="closeWizard()")
        c-button(title="Save as Draft" @click="saveDraft()")
</template>

<script>
import { ref, watch, computed, inject, onMounted, onUnmounted } from 'vue'
import UseData from '~/store/Data.js'
import useProfile from '~/store/Profile.js'
import { useRouter, useRoute } from 'vue-router'
import cFormWizard from '~/components/FormWizard/cFormWizard.vue'
import cCheckbox from '~/components/Inputs/cCheckbox.vue'
import cSelect from '~/components/Inputs/cSelect.vue'
import cRadioCards from '~/components/Inputs/cRadioCards.vue'
import { industries, jurisdictions } from '~/data/static.js'
import { validates } from '~/core/utils.js'
import { required, requiredUnless } from '@vuelidate/validators'
import { requireForArray, requireDate } from '~/core/customValidates.js'
import { notifyMessages } from '~/data/notifications.js'

const fieldsOptions = {
  locationType: [
    {
      title: 'Remote',
      value: 'remote'
    }, {
      title: 'Remote + Travel',
      value: 'travel'
    }, {
      title: 'Onsite',
      value: 'onsite'
    }
  ],
  location: [{
    title: 'USA',
    value: 'usa'
  }],
  industries,
  jurisdictions,
  minExperience: [
    {
      title: 'Junior',
      value: '1'
    }, {
      title: 'Intermediate',
      value: '2'
    }, {
      title: 'Expert',
      value: '3'
    }
  ],
  skills: [
    {
      title: 'HTML',
      value: 'html'
    }, {
      title: 'CSS',
      value: 'css'
    }, {
      title: 'Vue.js',
      value: 'vue.js'
    }
  ],
  priceType: [
    {
      title: 'Fixed Price',
      value: 'fixed',
      icon: 'tag',
      description: 'Budget-friendly approach for scoped projects.'
    }, {
      title: 'Hourly Price',
      value: 'hourly',
      icon: 'time',
      description: 'Pay by the hour. Provides more flexibility.'
    }
  ],
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

export default {
  components: {
    cFormWizard,
    cCheckbox,
    cSelect,
    cRadioCards
  },
  // eslint-disable-next-line max-lines-per-function
  setup () {
    const router = useRouter()
    const route = useRoute()
    const projects = new UseData('projects')
    const jobs = new UseData('jobs')
    const errors = ref({})
    const { profile } = useProfile()
    const notification = inject('notification')
    const pageTitle = computed(() => route.params.id && projects.getDocument().value.jobId ? 'Edit Job' : 'Post Job')

    const form = ref({
      name: '',
      startsAt: Date.now(),
      endsAt: Date.now() + 864e5,
      description: '',
      roleDetails: '',
      locationType: 'remote',
      location: '',
      industries: [],
      jurisdictions: [],
      minExperience: '',
      formerRegulators: false,
      skills: ['html'],

      priceType: 'fixed',
      budget: '',
      hourlyRate: '',
      maxHourlyRate: '',
      paymentSchedule: '',
      owner_id: profile.value._id,
      business_id: profile.value.businessId
    })
    const validateInfor = computed(() => ({
      1: {
        rules: {
          name: { required },
          startsAt: { required: requireDate },
          endsAt: { required: requireDate },
          description: { required },
          roleDetails: { required },
          locationType: { required },
          location: { required: requiredUnless(form.value.locationType === 'remote') },
          industries: { required: requireForArray },
          jurisdictions: { required: requireForArray }
        },
        data: {
          name: form.value.name,
          startsAt: form.value.startsAt,
          endsAt: form.value.endsAt,
          description: form.value.description,
          roleDetails: form.value.roleDetails,
          locationType: form.value.locationType,
          location: form.value.location,
          industries: form.value.industries,
          jurisdictions: form.value.jurisdictions
        }
      },
      2: {
        rules: {
          minExperience: { required },
          skills: { required: requireForArray }
        },
        data: {
          minExperience: form.value.minExperience,
          skills: form.value.skills
        }
      },
      3: {
        rules: {
          budget: { required: requiredUnless(form.value.priceType !== 'fixed') },
          hourlyRate: { required: requiredUnless(form.value.priceType === 'fixed') },
          maxHourlyRate: { required: requiredUnless(form.value.priceType === 'fixed') },
          paymentSchedule: { required }
        },
        data: {
          budget: form.value.budget,
          hourlyRate: form.value.hourlyRate,
          maxHourlyRate: form.value.maxHourlyRate,
          paymentSchedule: form.value.paymentSchedule
        }
      }
    }))

    const stepValidate = async currentStep => {
      const step = validateInfor.value[currentStep]
      errors.value = await validates(step.rules, step.data)
      return Object.keys(errors.value).length === 0
    }

    const closeWizard = () => {
      if (route.params.id) router.push({ name: 'ProjectDetail', params: { id: route.params.id } })
      else router.push({ name: 'ProjectsOverview' })
    }
    const saveDraft = async () => {
      try {
        const jobForm = { ...form.value, status: 'draft' }
        let jobIds
        if (projects.getDocument().value.jobId) {
          await jobs.updateDocument(projects.getDocument().value.jobId, jobForm)
          jobIds = [projects.getDocument().value.jobId]
        } else jobIds = await jobs.createDocuments([form.value])
        if (route.params.id) projects.updateDocument(route.params.id, { status: 'draft', jobId: jobIds[0] })
        else {
          const newProjectForm = {
            name: form.value.name,
            startsAt: form.value.startsAt,
            endsAt: form.value.endsAt,
            description: form.value.description,
            collaborators: [],
            tasks: [],
            fixedBudget: 0,
            status: 'draft',
            jobId: jobIds[0]
          }
          projects.createDocuments([newProjectForm])
        }
        notification({
          type: 'success',
          title: 'Success',
          message: notifyMessages.job.save.success
        })
        if (route.params.id) router.push({ name: 'ProjectDetail', params: { id: route.params.id } })
        else router.push({ name: 'ProjectsOverview' })
      } catch (error) {
        notification({
          type: 'error',
          title: 'Error',
          message: notifyMessages.job.save.error
        })
      }
    }
    const postProject = async () => {
      try {
        const isValidate = await stepValidate(3)
        if (isValidate) {
          const jobForm = { ...form.value, status: 'published' }
          let jobIds
          // eslint-disable-next-line max-depth
          if (projects.getDocument().value.jobId) {
            await jobs.updateDocument(projects.getDocument().value.jobId, jobForm)
            jobIds = [projects.getDocument().value.jobId]
          } else jobIds = await jobs.createDocuments([form.value])
          // eslint-disable-next-line max-depth
          if (route.params.id) projects.updateDocument(route.params.id, { status: 'pending', jobId: jobIds[0] })
          else {
            const newProjectForm = {
              name: form.value.name,
              startsAt: form.value.startsAt,
              endsAt: form.value.endsAt,
              description: form.value.description,
              collaborators: [],
              tasks: [],
              fixedBudget: 0,
              status: 'pending',
              jobId: jobIds[0]
            }
            await projects.createDocuments([newProjectForm])
          }
          notification({
            type: 'success',
            title: 'Success',
            message: notifyMessages.job.post.success
          })
          // eslint-disable-next-line max-depth
          if (route.params.id) router.push({ name: 'ProjectDetail', params: { id: route.params.id } })
          else router.push({ name: 'ProjectsOverview' })
        }
      } catch (error) {
        notification({
          type: 'error',
          title: 'Error',
          message: notifyMessages.job.post.error
        })
      }
    }

    const wizardSteps = [
      { title: 'Job Details', validates: stepValidate }, { title: 'Expertise', validates: stepValidate }, { title: 'Budget', validates: stepValidate }
    ]

    const onSubmit = computed(() => ({
      title: route.params.id && projects.getDocument().value.jobId ? 'Resubmit' : 'Submit',
      action: postProject
    }))
    onMounted(async () => {
      if (route.params.id) {
        await projects.readDocuments(route.params.id)
        if (projects.getDocument().value.jobId) {
          await jobs.readDocuments(projects.getDocument().value.jobId)
          form.value = jobs.getDocument().value
          delete form.value._id
        } else {
          form.value.name = projects.getDocument().value.name
          form.value.startsAt = projects.getDocument().value.startsAt
          form.value.endsAt = projects.getDocument().value.endsAt
          form.value.description = projects.getDocument().value.description
        }
      }
    })
    onUnmounted(() => projects.clearStore())

    // cleanUp fields if hidden
    watch(() => form.value.priceType, () => {
      form.value.budget = ''
      form.value.hourlyRate = ''
      form.value.maxHourlyRate = ''
      form.value.paymentSchedule = ''
    })

    return {
      errors,
      form,
      fieldsOptions,
      wizardSteps,
      closeWizard,
      saveDraft,
      postProject,
      onSubmit,
      pageTitle
    }
  }
}
</script>

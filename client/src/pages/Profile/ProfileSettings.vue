<template lang="pug">
section.grid-6
  h3 Your Hourly Rate
  c-field.col-full(label="Hourly Rate" type="number" placeholder="Hourly Rate" :errors="errors.rate" v-model="form.rate" required)
  div.perhour Per hour
  .divider
  h3 Experience Level
  c-radio-cards(id="experience" :data="experienceOptions" v-model="form.experience")
  .divider
  h3 Name Settings
  c-radios(id="regulator" :data="radioOptions" v-model="form.showFullName")
  .controls
    c-button(type="primary" title="Save" @click="saveInformation('company')")
</template>

<script>
import { ref, inject } from 'vue'
import cRadioCards from '~/components/Inputs/cRadioCards.vue'
import cRadios from '~/components/Inputs/cRadios.vue'
import useAuth from '~/core/auth.js'
import useProfile from '~/store/Profile.js'
import { validates } from '~/core/utils.js'
import { numberGreaterThanZero } from '~/core/customValidates.js'
import { notifyMessages } from '~/data/notifications.js'

export default {
  components: {
    cRadios,
    cRadioCards
  },
  setup () {
    const experienceOptions = [
      { value: 0, title: 'Junior', description: 'Beginner consultant with some industry experience.' }, { value: 1, title: 'Intermediate', description: 'Good experience and solid knowledge of the industry.' }, { value: 2, title: 'Expert', description: 'Deep understanding of industry with varied experience.' }
    ]

    const radioOptions = [
      { title: 'Show my full name (ex. John Doe)', value: true }, { title: 'Show my first name and first letter of my last (ex. John D.)', value: false }
    ]

    const { onboarding } = useAuth()
    const notification = inject('notification')
    const { profile, updateProfile } = useProfile()
    const form = ref({ ...profile.value })
    const errors = ref({})

    const rules = { rate: { validateRate: numberGreaterThanZero } }

    const saveInformation = async () => {
      errors.value = await validates(rules, form.value)
      if (Object.keys(errors.value).length > 0) return

      const data = {
        rate: form.value.rate,
        experience: form.value.experience,
        showFullName: form.value.showFullName
      }

      try {
        await onboarding(data)
        updateProfile(data)
        notification({
          title: 'Success',
          message: notifyMessages.profile.save.success
        })
      } catch (error) {
        notification({
          type: 'error',
          title: 'Error',
          message: notifyMessages.profile.save.error
        })
        console.error(error)
      }
    }

    return {
      errors,
      form,
      experienceOptions,
      radioOptions,
      saveInformation
    }
  }
}
</script>

<style lang="stylus" scoped>
.perhour
  margin-top: -0.7em;
  font-size: 0.7em;
.controls
  grid-column: 1 / -1
  justify-content: flex-end
  display: flex
</style>

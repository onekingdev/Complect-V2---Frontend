<template lang="pug">
card-container(title="General")
  template(#content)
    form.form-container.width-50(@submit.prevent)
      h3 Location
      c-select(label="Time Zone" :data="timezones" :errors="errors.timezone" v-model="profile.timezone" required searchable)
      c-select(label="Country" :data="countries" v-model="profile.country" searchable)
      c-field(label="State" v-model.trim="profile.state")
      c-field(label="City" v-model.trim="profile.city")
      c-field(label="Phone Number" type="number" v-model="profile.tel")
      .actions
        c-button(title="Cancel" type="link" @click="clearData()")
        c-button(title="Save" type="primary" @click="saveInformation()")
</template>

<script>
import { ref, inject } from 'vue'
import cSelect from '~/components/Inputs/cSelect.vue'
import { timezones, countries } from '~/data/static.js'

import useProfile from '~/store/Profile.js'
import useAuth from '~/core/auth.js'

import { validates } from '~/core/utils.js'
import { required } from '@vuelidate/validators'

const INIT_FORM = {
  timezone: '',
  country: '',
  state: '',
  city: '',
  tel: ''
}

export default {
  components: { cSelect },
  setup () {
    const { profile, updateProfile } = useProfile()
    const { onboarding } = useAuth()
    const notification = inject('notification')
    const errors = ref({})

    const rules = { timezone: { required } }

    const clearData = () => updateProfile(INIT_FORM)

    const saveInformation = async () => {
      const newData = {}

      Object.keys(INIT_FORM).forEach(field => {
        newData[field] = profile.value[field]
      })

      errors.value = await validates(rules, newData)
      if (Object.keys(errors.value).length > 0) return

      try {
        await onboarding(newData)
        notification({
          title: 'Success',
          message: 'Information has been saved.'
        })
      } catch (error) {
        notification({
          type: 'error',
          title: 'Error',
          message: 'Information has not been saved.'
        })
        console.error(error)
      }
    }

    return {
      errors,
      profile,
      countries,
      timezones,
      clearData,
      saveInformation
    }
  }
}
</script>

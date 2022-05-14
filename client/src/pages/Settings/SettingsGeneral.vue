<template lang="pug">
card-container(title="General")
  template(#content)
    .width-50.grid-6
      h3 Location
      c-address.col-3(label="Business Address" v-model="profile.address" required)
      c-field.col-3(label="Apt/Unit" v-model="profile.apt_unit" required)
      c-field.col-3(label="City" v-model.trim="profile.city" required)
      c-field.col-3(label="State" v-model.trim="profile.state" required)
      c-select.col-3(label="Time Zone" :data="timezones" v-model="profile.time_zone" searchable required)
      c-field.col-3(label="Phone Number" type="number" v-model="profile.phone_number" required)
      .actions
        c-button(title="Cancel" type="link" @click="clearData()")
        c-button(title="Save" type="primary" @click="saveInformation()")
</template>

<script>
import { ref, inject } from 'vue'
import cSelect from '~/components/Inputs/cSelect.vue'
import cAddress from '~/components/Inputs/cAddress.vue'
import { timezones, countries } from '~/data/static.js'

import useProfile from '~/store/Profile.js'
import useAuth from '~/core/auth.js'

import { validates } from '~/core/utils.js'
import { required } from '@vuelidate/validators'
import { notifyMessages } from '~/data/notifications.js'

const INIT_FORM = {
  address: '',
  apt_unit: '',
  city: '',
  state: '',
  country: '',
  time_zone: '',
  phone_number: ''
}

export default {
  components: { cSelect, cAddress },
  setup () {
    const { profile, updateProfile } = useProfile()
    const { onboarding } = useAuth()
    const notification = inject('notification')
    const errors = ref({})

    const rules = { time_zone: { required } }

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
      profile,
      countries,
      timezones,
      clearData,
      saveInformation
    }
  }
}
</script>

<style lang="stylus" scoped>
.card-container
  min-height: 100%
  h3
    font-size: 1.25em
    font-weight: bold
</style>

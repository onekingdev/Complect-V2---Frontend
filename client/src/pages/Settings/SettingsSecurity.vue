<template lang="pug">
card-container(title="Security")
  template(#content)
    .security-section.width-50
      h3 Change Email
      c-field.current-email(label="Current Email" v-model="profile.email" disabled)
      c-field(label="New Email" v-model.trim="emailForm.newEmail" :errors="errors.newEmail" required)
      .actions
        c-button.save-btn(title="Save" type="primary" :class="{ 'none': errors.newEmail }" :disabled="!emailForm.newEmail" @click="update('Email')")
    .security-section.width-50
      h3.reset-password Reset Password
      c-field(label="Old Password" type="password" :errors="errors.password" v-model="passwordForm.password" required)
      .new-password
        c-field(label="New Password" type="password" :errors="errors.newPassword" v-model="passwordForm.newPassword" required)
        .min-password Minimum 6 characters
      c-field(label="Confirm Password" type="password" :errors="errors.confirmPassword" v-model="passwordForm.confirmPassword" required)
      .actions
        c-button(title="Cancel" type="link" @click="clearData('Password')")
        c-button(title="Save" type="primary" @click="update('Password')" :disabled="!passwordForm.password || !passwordForm.newPassword || !passwordForm.confirmPassword")
    .divider
    .security-section.width-50
      h3 Delete Account
      p.notice
        | By deleting your account,
        | you will purge all information and saved
        | documents associated with this account. This deletion cannot be reversed. Please take appropriate steps to save down to your own storage devices  any records you need to access after the deletion of this account.
      c-button.delete-btn(title="Delete")
</template>

<script>
import { ref, inject, computed } from 'vue'
import useProfile from '~/store/Profile.js'
import useAuth from '~/core/auth.js'
import { validates } from '~/core/utils.js'
import { sameAsWith } from '~/core/customValidates.js'
import { required, email, minLength } from '@vuelidate/validators'
import { notifyMessages } from '~/data/notifications.js'

export default {
  setup () {
    const { profile } = useProfile()
    const { updateAuthenticationInfor } = useAuth()
    const notification = inject('notification')
    const errors = ref({})
    const emailForm = ref({ type: 'email' })
    const passwordForm = ref({ type: 'password' })

    const clearData = type => {
      if (type === 'Email') emailForm.value = {}
      else passwordForm.value = {}
    }

    const hasErrors = computed(() => Object.keys(errors.value).length > 0)

    const validateEmail = { newEmail: { email, required } }

    const validatePasswordChange = {
      password: { required },
      newPassword: { required, minLength: minLength(6) },
      confirmPassword: { required, sameAsPassword: sameAsWith('newPassword') }
    }

    const update = async type => {
      const isUpdateEmail = type === 'Email'
      const rules = isUpdateEmail ? validateEmail : validatePasswordChange
      const data = isUpdateEmail ? emailForm.value : passwordForm.value
      errors.value = await validates(rules, data)

      if (hasErrors.value) return

      try {
        await updateAuthenticationInfor(data)
        if (isUpdateEmail) profile.value.email = emailForm.value.newEmail

        clearData(type)

        notification({
          title: 'Success',
          message: notifyMessages.profile[type.toLowerCase()].success
        })
      } catch (error) {
        notification({
          type: 'error',
          title: 'Error',
          message: notifyMessages.profile[type.toLowerCase()].error
        })
        console.error(error)
        errors.value[type.toLowerCase()] = [error]
      }
    }

    return {
      errors,
      emailForm,
      passwordForm,
      profile,
      clearData,
      update
    }
  }
}
</script>

<style lang="stylus" scoped>
.security-section
  display: flex
  flex-direction: column
  gap: 1em
  h3
    font-size: 1.25em
    font-weight: bold
  .reset-password
    margin-top: 1em
  .actions
    justify-content: flex-end
  .notice
    font-size: 0.875em
  .min-password
    font-size: 0.75em
    color: var(--c-grey)
  :deep(.c-button.delete-btn)
    width: 5em
    color: #f00
  :deep(.current-email)
    .field-body
      background: #e9ecef !important
  .notice
    font-size: 0.875em
</style>

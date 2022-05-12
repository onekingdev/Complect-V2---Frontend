<template lang="pug">
card-container.reset-password
  template(#content)
    h1 Reset Password
    p Please enter the email address used to log into your account to receive a link to reset your password. If you no longer have access to that email account, please contact us at&nbsp;
      a(href="mailto:help@complect.com") help@complect.com&nbsp;
      | for assistance.
    .form.grid-6
      c-field(label="Email" :errors="errors.resetEmail" v-model="resetEmail" fullwidth required)
      c-button(title="Reset" type="primary" @click="resetPassword()" fullwidth)
  template(#footer)
    c-button(title="Cancel" type="link" @click="goToSignIn()")
</template>

<script>
import { ref } from 'vue'
import useAuth from '~/core/auth'
import { required, email } from '@vuelidate/validators'
import { validates } from '~/core/utils.js'
import { useRouter } from 'vue-router'

export default {
  setup () {
    const router = useRouter()
    const resetEmail = ref('')
    const { reset } = useAuth()
    const errors = ref({})
    const rules = { resetEmail: { required, email } }
    const goToSignIn = () => router.push({ name: 'AuthSignIn' })
    const resetPassword = async () => {
      errors.value = await validates(rules, { resetEmail: resetEmail.value })
      if (Object.keys(errors.value).length) return

      try {
        await reset(resetEmail.value)
      } catch (error) {
        Object.assign(errors.value, { resetEmail: ['Invalid email address'] })
        console.error(error)
      }
    }

    return {
      errors,
      resetEmail,
      goToSignIn,
      resetPassword
    }
  }
}
</script>

<style lang="stylus" scoped>
.reset-password p
  font-size: 0.875em
  text-align: center
.card-container
  :deep(.card-footer) .c-button
    font-size: 1em
</style>

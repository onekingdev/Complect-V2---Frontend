<template lang="pug">
card-container
  template(#content v-if="step === 1")
    h1 Let's get you started!
    .form.grid-6(@keypress.enter="signIn()")
      c-field(label="Email" type="email" :errors="errors.email" v-model="form.email" fullwidth required)
      c-field(label="Password" type="password" :errors="errors.password" v-model="form.password" fullwidth required)
      c-button(title="Sign In" type="primary" @click="signIn()" fullwidth)
      router-link.forgot-password(:to="{name: 'AuthResetPassword'}") Forgot Password
  template(#content v-if="step === 2")
    h1 Confirm Your Email
    h3 We sent a 6 digit code to {{form.email}}. Please enter it below.
    icon(name="mail")
    .confirmation-code(@keypress.enter="submitCode(form.email, form.password, otp)")
      input(v-for="i in 6" @paste="onPaste" @paste.prevent :key="i" type="number" :ref="el => { if (el) inputs[i-1] = el }" v-model="numbers[i-1]" @keyup="event => keyupHandler(event, i)" @input="event => inputHandler(event, i)" required)
    .error {{ errorMessage }}
    c-button(title="Submit" type="primary" @click="submitCode(form.email, form.password, otp)" fullwidth)
  template(#footer)
    p(v-if="step !== 2") Don't have an account yet?&nbsp;
      router-link.sign-up(:to="{name: 'AuthSignUp'}") Sign Up
    c-button(v-else title="Send new code" type="link" @click="signIn()")
</template>

<script>
import { ref } from 'vue'
import useAuth from '~/core/auth'
import useSignInOtp from '~/core/signInOtp'

import { validates } from '~/core/utils.js'
import { required, email } from '@vuelidate/validators'

export default {
  setup () {
    const { authentication } = useAuth()
    const form = ref({})
    const errors = ref({})
    const step = ref(1)
    const toStepTwo = () => step.value = 2
    const rules = {
      email: { required, email },
      password: { required }
    }

    const signIn = async () => {
      errors.value = await validates(rules, form.value)
      if (Object.keys(errors.value).length) return

      try {
        await authentication(form.value)
        sessionStorage.setItem('email', JSON.stringify(form.value.email)) // will be changed to sessionID
      } catch (error) {
        // eslint-disable-next-line consistent-return
        if (error === 'Missing OTP') return toStepTwo()
        if (error.includes('email')) Object.assign(errors.value, { email: [error] })
        if (error.includes('password')) Object.assign(errors.value, { password: [error] })
        Object.assign(errors.value, { password: [error] })
        console.error(error)
      }
    }
    // step 2
    const {
      inputs,
      numbers,
      otp,
      errorMessage,
      submitCode,
      keyupHandler,
      inputHandler
    } = useSignInOtp()

    const onPaste = event => {
      const paste = (event.clipboardData || window.clipboardData).getData('text').slice(0, 6)
      numbers.value = [...paste]
    }

    return {
      errors,
      form,
      onPaste,
      signIn,

      step,
      submitCode,
      keyupHandler,
      inputHandler,
      errorMessage,
      otp,
      inputs,
      numbers
    }
  }
}
</script>

<style lang="stylus" scoped>
.forgot-password
  font-size: 0.875em
.forgot-password, .sign-up
  &:hover
    text-decoration: underline

.error
  font-size: 0.8em
  height: 1em
  color: red
  text-align: center
svg.icon
  flex: 1
  display: block
  width: 12em
  height: 8em
  margin: 2em auto
.confirmation-code
  margin: 1em
  margin-bottom: 0
  display: flex
  gap: 0.5em
  font-size: 1.6em
  input
    flex: 1 1 0
    width: 0
    min-width: 0
    padding: 1em 0
    text-align: center
    border: 1px solid var(--c-border)
    border-radius: var(--v-border-radius)
    &:focus
      border-color: var(--c-selected)
</style>

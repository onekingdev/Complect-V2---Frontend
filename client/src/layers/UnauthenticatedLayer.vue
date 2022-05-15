<template lang="pug">
.view.auth-view
  .top-bar
    .logo
      icon(name="logo")
      icon(name="brandname")
    c-button(title="Sign Up" type="primary" @click="goToSignUp()" v-if="isSignIn")
    c-button(title="Sign In" type="primary" @click="goToSignIn()" v-else)
  .container
    router-view
</template>

<script>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
export default {
  setup () {
    const router = useRouter()
    const route = useRoute()
    const isSignIn = computed(() => route.name === 'AuthSignIn')
    const goToSignIn = () => router.push({ name: 'AuthSignIn' })
    const goToSignUp = () => router.push({ name: 'AuthSignUp' })
    return { goToSignIn, isSignIn, goToSignUp }
  }
}
</script>

<style lang="stylus" scoped>
.view.auth-view
  min-height: 100%
  display: flex
  flex-direction: column

.top-bar
  width: 100%
  display: flex
  height: 5em
  background: var(--c-bg-z2, #fff)
  align-items: center
  justify-content: space-between
  .logo
    margin: 0 1.25em
    svg.icon-logo
      width: 2em
      height: 2em
    svg.icon-brandname
      width: 8em
      height: 1.8em
      margin-left: 0.5em
      fill: #000
  .c-button
    margin: 0 1.1em

.container
  background: #f6f6f8
  flex: 1
  display: flex
  padding: 2em
  @media (max-width: 575px)
    padding: 2em 0
  :deep(.card-container)
    max-width: 35em
    margin: auto
    .card-content
      padding: 2em
      @media (max-width: 575px)
        padding: 1em
      h1, h2
        text-align: center
        width: 100%
        line-height: 1
      h1
        font-size: 2em
        font-weight: 600
        @media (max-width: 575px)
          font-size: 1.25em
      h2
        font-size: 1.25em
        @media (max-width: 575px)
          font-size: 0.875em
      .form
        margin: 1em 0 0
    .card-footer
      font-size: 0.875em
      justify-content: center
</style>

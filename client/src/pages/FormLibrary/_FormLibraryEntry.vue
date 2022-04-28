<template lang="pug">
page-container(:title="title" :class="{'bg-white': isNewForm}")
  template(#quick-access)
    span.home-tab(@click="goToHome()") Form Library
    span.separator &nbsp;/&nbsp;
    span.sub-tab {{ title }}
  template(#controls)
    c-button(v-if="!isNewForm" title="New Form" type="primary" @click="createNewForm()")
  template(#content)
    router-view(:type="type" :title="title")
</template>

<script>
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'

export default {
  setup () {
    const route = useRoute()
    const router = useRouter()
    const isNewForm = computed(() => route.name === 'FormLibraryNew')
    const type = computed(() => route.query.type ? route.query.type : 'attestation')
    const title = computed(() => route.query.title ? route.query.title : 'Attestation Forms')
    const goToHome = () => router.push({ name: 'FormLibrary' })
    const createNewForm = () => router.push({
      name: 'FormLibraryNew',
      query: {
        type: route.query.type,
        title: route.query.title
      }
    })
    return { type, title, createNewForm, goToHome, isNewForm }
  }
}
</script>

<style lang="stylus" scoped>
.page-container
  :deep(.page-name)
    flex-direction: column
    align-items: flex-start !important
  :deep(.quick-access)
    font-size: 0.58333333em
  .sub-tab
    font-weight: bold
  .separator
    color: var(--c-gold)
.page-container.bg-white
  :deep(.container-header)
    background: white
</style>

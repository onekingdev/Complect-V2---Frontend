<template lang="pug">
page-container(:badge="{title: formDetails.status }" :title="formDetails.name" type="document full-width" :hasHamberger="hasHamberger")
  template(#controls)
    c-button(title="Save Draft" type="link" @click="saveDraft()" v-if="formDetails.status != 'archived'")
    c-button(title="Publish" type="primary" @click="publishFormLibrary()")
    c-button(type="icon" iconL="close" size="small" @click="closeFormLibrary()")
  template(#tabs)
    router-link.link-item(v-for="(tab, index) in tabs" :key="index" :to="{name: tab.routeName}") {{tab.title}}
  template(#navigation-controls)
    c-dropdown(title="Actions")
      c-button(title="Archive" type="transparent" @click="archiveForm()")
      c-button(title="Delete" type="transparent" @click="deleteForm()")
  template(#content)
    router-view(v-model:formDetails="formDetails")
</template>

<script>
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'
import cDropdown from '~/components/Inputs/cDropdown.vue'
import { formLibraryData, formCards } from '~/data/data.js'
export default {
  components: { cDropdown },
  setup () {
    const tabs = [
      {
        title: 'Form Builder',
        routeName: 'FormBuilder'
      }, {
        title: 'Preview',
        routeName: 'FormPreview'
      }, {
        title: 'Setting',
        routeName: 'FormSetting'
      }
    ]
    const documents = formLibraryData
    const route = useRoute()
    const router = useRouter()
    const formDetails = computed(() => documents.find(document => document._id === route.params.id))
    const saveDraft = () => {}
    const publishFormLibrary = () => {}
    const closeFormLibrary = () => router.push({
      name: 'FormLibraryEntry',
      query: {
        type: formDetails.value.type,
        title: formCards.find(card => card.type === formDetails.value.type)
      }
    })
    const archiveForm = () => {}
    const deleteForm = () => {}
    const doHamberger = () => {}
    const hasHamberger = { action: doHamberger }
    return {
      saveDraft,
      publishFormLibrary,
      closeFormLibrary,
      archiveForm,
      deleteForm,
      hasHamberger,
      tabs,
      formDetails
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>

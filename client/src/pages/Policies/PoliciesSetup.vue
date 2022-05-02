<template lang="pug">
div.setup-div
  div.logo-setting
    h2 Logo
    p.setting-text Upload the logo that will show up on the cover page of your compliance manual(Logo visible on white recommended)
    c-upload(v-model:modelValue="policyForm.fileName")
  div.display-setting
    h2 Display Settings
    p.setting-text Select what you want to display on the cover page
    c-checkbox.checkboxes(v-for="(checkbox, index) in arrayCheckboxes" :key="index" :label="checkbox.label" :value="checkbox.value" v-model="policyForm.checkedValues" multiple)
    c-textarea.text-area(placeholder="Enter Something" v-model="policyForm.discluserValue")
    c-button.action-buttons(title="Save" type="primary inline-button" @click="saveSettings()")
    c-button.action-buttons(title="Reset" @click="resetSettings()" type="inline-button default")
</template>

<script>
import { onMounted, onUnmounted, ref, inject } from 'vue'
import UseData from '~/store/Data.js'
import cBanner from '~/components/Misc/cBanner.vue'
import cModal from '~/components/Misc/cModal.vue'
import cUpload from '~/components/Inputs/cUpload.vue'

export default {
  components: { cBanner, cModal, cUpload },
  setup () {
    const policySetting = new UseData('policy_settings')
    const notification = inject('notification')
    const arrayCheckboxes = ref([
      { label: 'Address', value: 'address' }, { label: 'Phone Number', value: 'phone' }, { label: 'Contact Email', value: 'email' }, { label: 'Disclouser', value: 'disclouser' }
    ])

    // const policyForm = computed( () => policySetting.value.filter.( document => document.policyId ==  ) );
    const policyForm = ref({
      fileName: '',
      checkedValues: [],
      disclouser: ''
    })

    const resetSettings = () => {
      policyForm.value.fileName = ''
      policyForm.value.checkedValues = []
      policyForm.value.disclouser = ''
    }
    const saveSettings = async () => {
      try {
        await policySetting.createDocuments(policyForm.value)
        notification({
          type: 'success',
          title: 'Success',
          message: 'Setting has been updated.'
        })
      } catch (error) {
        notification({
          type: 'error',
          title: 'Error',
          message: 'Setting has not been updated. Please try again.'
        })
      }
    }

    onMounted(() => policySetting.readDocuments())
    onUnmounted(() => policySetting.clearStore())

    return {
      arrayCheckboxes,
      resetSettings,
      saveSettings,
      policyForm
    }
  }
}
</script>

<style lang="stylus" scoped>
.setup-div
  width: 60%
  .logo-setting
    margin-top: 10px
  .setting-text
    font-size: 0.875em
    margin-bottom: 1rem
  .display-setting
    margin-top: 30px
    .checkboxes
      margin-bottom: 1rem
    .action-buttons
      margin-top: 1rem
      float: right
</style>

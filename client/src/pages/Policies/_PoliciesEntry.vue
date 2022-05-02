<template lang="pug">
page-container(title="Policies and Procedures")
  template(#controls)
    c-button.export-button(title="Export" @click="exportPDF()" v-if="!documents.length")
    // c-button-modal(v-if="profile.role == 'Admin' || profile.role == 'Trusted'" title="New Policy" modalTitle="New Policy" type="primary")
    c-button-modal(title="New Policy" modalTitle="New Policy" type="primary")
      template(#content)
        c-field(label="Policy Name" v-model="newPolicy.name" required)
      template(#footer)
        c-button(title="Create" type="primary" @click="createPolicy()")
  // template(#tabs v-if="profile.role == 'Admin' || profile.role == 'Trusted'")
  //   router-link.link-item(v-for="(tab, index) in adminTabs" :key="index" :to="{name: tab.routeName}") {{tab.title}}
  // template(#tabs v-if="profile.role == 'Basic'")
  //   router-link.link-item(v-for="(tab, index) in basicTabs" :key="index" :to="{name: tab.routeName}") {{tab.title}}
  template(#tabs)
    router-link.link-item(v-for="(tab, index) in adminTabs" :key="index" :to="{name: tab.routeName}") {{tab.title}}
  template(#content)
    router-view
</template>

<script>
import { ref, inject } from 'vue'
import { useRouter } from 'vue-router'
import useProfile from '~/store/Profile.js'
import PolicyService from '~/services/policies.js'
import { generatePDF } from '~/services/pdf.js'

export default {
  setup () {
    const notification = inject('notification')
    const router = useRouter()
    const policies = new PolicyService()
    const { profile } = useProfile()
    const adminTabs = [
      {
        title: 'Policies',
        routeName: 'Policies',
        roles: [
          'Admin', 'Trusted', 'Basic'
        ]
      }, {
        title: 'Archive',
        routeName: 'PoliciesArchive',
        roles: [
          'Admin', 'Trusted'
        ]
      }, {
        title: 'Setup',
        routeName: 'PoliciesSetup',
        roles: [
          'Admin', 'Trusted'
        ]
      }
    ]
    const basicTabs = [{
      title: 'Policies',
      routeName: 'Policies',
      roles: [
        'Admin', 'Trusted', 'Basic'
      ]
    }]

    const newPolicy = ref({
      name: '',
      createdAt: Date.now(),
      modifiedAt: Date.now(),
      status: 'draft',
      description: ''
    })
    const createPolicy = async () => {
      try {
        newPolicy.value.order = policies.getDocuments().value.length
        const policyId = await policies.createDocuments(newPolicy.value)
        notification({
          type: 'success',
          title: 'Success',
          message: 'New policy has been created.'
        })
        router.push({
          name: 'PolicyDetail',
          params: { id: policyId[0] }
        })
      } catch (error) {
        console.error(error)
        notification({
          type: 'error',
          title: 'Error',
          message: 'Policy has not been created. Please try again.'
        })
      }
    }
    const exportPDF = async () => {
      const pdfData = {
        collection: 'policies',
        template: 'manualTemplate'
      }
      const pdfLink = await generatePDF(pdfData)
      window.location.href = pdfLink
    }
    return {
      newPolicy,
      createPolicy,
      exportPDF,
      profile,
      basicTabs,
      adminTabs,
      documents: policies.getDocuments()
    }
  }
}
</script>

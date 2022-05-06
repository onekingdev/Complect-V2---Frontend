<template lang="pug">
page-container(title="Risk Register")
  template(#controls)
    c-button-modal(title="New Risk" modalTitle="New Risk" type="primary")
      template(#content)
        c-field(label="Risk Name" v-model="newRisk.name" required)
        c-select.col-3(label="Impact" :data="options" v-model="newRisk.impact")
        c-select.col-3(label="Likelihood" :data="options" v-model="newRisk.likelihood")
        c-label.col-2(label="Risk Level")
          c-badge(icon="warning-light" :title="`risk${newRiskLevel}`")
      template(#footer)
        c-button(title="Create" type="primary" @click="createRisk()")
  template(#content)
    router-view
</template>

<script>
import { ref, computed, inject } from 'vue'
import { useRouter } from 'vue-router'
import { calcRiskLevel } from '~/core/utils.js'
import UseData from '~/store/Data.js'
import cSelect from '~/components/Inputs/cSelect.vue'
import cLabel from '~/components/Misc/cLabel.vue'
import cBadge from '~/components/Misc/cBadge.vue'
import useProfile from '~/store/Profile.js'
import { notifyMessages } from '~/data/notifications.js'
export default {
  components: { cSelect, cLabel, cBadge },
  setup () {
    const notification = inject('notification')
    const router = useRouter()
    const risks = new UseData('risks')
    const { profile } = useProfile()

    const options = [
      { title: 'Low', value: 0 }, { title: 'Medium', value: 1 }, { title: 'High', value: 2 }
    ]
    const newRisk = ref({
      name: '',
      impact: 0,
      likelihood: 0,
      dateCreated: Date.now()
    })

    const newRiskLevel = computed(() => calcRiskLevel(newRisk.value.impact, newRisk.value.likelihood))

    const createRisk = async () => {
      try {
        newRisk.value.riskLevel = newRiskLevel.value
        newRisk.value.creator = `${profile.value.firstName} ${profile.value.lastName}`
        newRisk.value.controls = [
          {
            _id: '2342343',
            name: 'Policy1',
            dateCreated: Date.now(),
            lastModified: Date.now(),
            status: 'draft'
          }, {
            _id: '23423433434',
            name: 'Policy2',
            dateCreated: Date.now(),
            lastModified: Date.now(),
            status: 'published'
          }, {
            _id: '234234234213',
            name: 'Policy3',
            dateCreated: Date.now(),
            lastModified: Date.now(),
            status: 'draft'
          }
        ]
        const riskId = await risks.createDocuments([newRisk.value])
        notification({
          type: 'success',
          title: 'Success',
          message: notifyMessages.risk.create.success
        })
        router.push({
          name: 'RiskDetail',
          params: { id: riskId[0] }
        })
      } catch (error) {
        notification({
          type: 'error',
          title: 'Error',
          message: notifyMessages.risk.create.error
        })
      }
    }

    return {
      options,
      newRiskLevel,
      newRisk,
      createRisk
    }
  }
}
</script>

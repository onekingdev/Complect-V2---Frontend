<template lang="pug">
page-container(section="Risk Register" :title="document.name" :badge="{icon:'warning-light', title: `risk${riskLevel}`}" type="document")
  template(#controls)
    c-button-modal(title="Delete" modalTitle="Delete Risk" type="primary")
      template(#content)
        .delete-container
          div
            icon(name="error" size="big")
          .description
            p This risk will be deleted from the Risk Register and all policy controls will be unlinked.
            p.confirm Do you want to continue?
      template(#footer)
        c-button(title="Delete" type="primary" @click="deleteRisk()")
    c-button(type="icon" iconL="close" size="small" @click="closeRisk()")
  template(#content)
    router-view
</template>

<script>
import { computed, onMounted, onUnmounted, inject } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import UseData from '~/store/Data.js'
import { calcRiskLevel } from '~/core/utils.js'
import cDropdown from '~/components/Inputs/cDropdown.vue'
import { notifyMessages } from '~/data/notifications.js'
export default {
  components: { cDropdown },
  setup () {
    const risks = new UseData('risks')
    const route = useRoute()
    const router = useRouter()
    const notification = inject('notification')

    const riskLevel = computed(() => calcRiskLevel(risks.getDocument().value.impact, risks.getDocument().value.likelihood))

    const closeRisk = () => router.push({ name: 'RisksOverview' })

    const deleteRisk = async () => {
      try {
        await risks.deleteDocuments(risks.getDocument().value._id)
        notification({
          type: 'success',
          title: 'Success',
          message: notifyMessages.risk.delete.success
        })
        closeRisk()
      } catch (error) {
        notification({
          type: 'error',
          title: 'Error',
          message: notifyMessages.risk.delete.error
        })
      }
    }

    onMounted(() => risks.readDocuments(route.params.id))
    onUnmounted(() => risks.clearStore())

    return {
      document: risks.getDocument(),
      riskLevel,
      closeRisk,
      deleteRisk
    }
  }
}
</script>

<style lang="stylus" scoped>
.delete-container
  display: flex
  gap: 1.25em
  .description
    font-size: 0.875em
    .confirm
      padding-top: 0.625em
      font-weight: bold
</style>

<template lang="pug">
card-container(title="Risks")
  template(#controls v-if="policyDetail.status != 'archived'")
    // c-button-modal(title="New Risk" modalTitle="New Risk" type="primary" v-if="profile.role != 'Basic'")
    c-button(title="New Risk" type="primary" @click="toggleNewRisk()")
  template(#content)
    c-table(v-bind="{columns, documents}" v-if="policyDetail.status != 'archived'")
    c-table(v-bind="{columns: archivecolumns, documents}" v-else)
c-modal(title="New Risk" v-model="isRiskVisible")
  template(#content)
    c-field(label="Risk Name" v-model="newRisk.name" required)
    c-select.col-3(label="Impact" :data="options" v-model="newRisk.impact")
    c-select.col-3(label="Likelihood" :data="options" v-model="newRisk.likelihood")
    c-label.col-2(label="Risk Level")
      c-badge(icon="warning-light" :title="`risk${newRiskLevel}`")
  template(#footer)
    c-button(title="Add" type="primary" @click="createRisk()")
c-modal(title="New Risk" v-model="isRiskEditVisible")
  template(#content)
    c-field(label="Risk Name" v-model="editRisk.name" required)
    c-select.col-3(label="Impact" :data="options" v-model="editRisk.impact")
    c-select.col-3(label="Likelihood" :data="options" v-model="editRisk.likelihood")
    c-label.col-2(label="Risk Level")
      c-badge(icon="warning-light" :title="`risk${editRiskLevel}`")
  template(#footer)
    c-button(title="Edit" type="primary" @click="editRiskValue()")
c-modal(title="New Risk" v-model="isRiskDeleteVisible")
  template(#content)
    .delete-container
      div
        icon(name="error" size="big")
      .description
        p This risk will be deleted from the Risk Register and all policy controls will be unlinked.
        p.confirm Do you want to continue?
  template(#footer)
    c-button(title="Delete" type="primary" @click="deleteRiskValue()")
</template>

<script>
import { onMounted, onUnmounted, computed, ref, inject } from 'vue'
import cBanner from '~/components/Misc/cBanner.vue'
import cSelect from '~/components/Inputs/cSelect.vue'
import cLabel from '~/components/Misc/cLabel.vue'
import cBadge from '~/components/Misc/cBadge.vue'
import { calcRiskLevel } from '~/core/utils.js'
import cModal from '~/components/Misc/cModal.vue'
import useProfile from '~/store/Profile.js'
import RiskService from '~/services/risks.js'
import { notifyMessages } from '~/data/notifications.js'

export default {
  components: { cBanner, cSelect, cLabel, cBadge, cModal },
  props: {
    policyDetails: {
      type: Object,
      required: true
    }
  },
  emits: ['update:policyDetails'],
  setup (props) {
    const risks = new RiskService()
    const editRisk = ref({
      name: '',
      impact: 0,
      likelihood: 0
    })
    const isRiskEditVisible = ref(false)
    const isRiskDeleteVisible = ref(false)
    const clickId = ref('')
    const handleClickEdit = async id => {
      isRiskEditVisible.value = !isRiskEditVisible.value
      await risks.readDocuments(id)
      editRisk.value = risks.getDocument().value
    }
    const editRiskLevel = computed(() => calcRiskLevel(editRisk.value.impact, editRisk.value.likelihood))
    const handleClickDelete = id => {
      clickId.value = id
      isRiskDeleteVisible.value = !isRiskDeleteVisible.value
    }
    const notification = inject('notification')
    const policyDetail = computed(() => props.policyDetails)
    const { profile } = useProfile()
    const isRiskVisible = ref(false)
    const toggleNewRisk = () => isRiskVisible.value = !isRiskVisible.value
    const newRisk = ref({
      name: '',
      impact: 0,
      likelihood: 0,
      dateCreated: Date.now()
    })
    const newRiskLevel = computed(() => calcRiskLevel(newRisk.value.impact, newRisk.value.likelihood))
    const options = [
      { title: 'Low', value: 0 }, { title: 'Medium', value: 1 }, { title: 'High', value: 2 }
    ]
    const columns = [
      {
        title: 'Name',
        key: 'name',
        width: '50%',
        cell: 'CellTitle',
        meta: { link: 'RiskDetail' }
      },
      {
        title: 'Impact',
        key: 'impact',
        cell: 'CellText',
        meta: {
          locale: true,
          prefix: 'risk'
        }
      },
      {
        title: 'Likelihood',
        key: 'likelihood',
        cell: 'CellText',
        meta: {
          locale: true,
          prefix: 'risk'
        }
      },
      {
        title: 'Risk Level',
        key: 'riskLevel',
        cell: 'CellRiskLevel'
      },
      {
        title: 'Date Created',
        key: 'dateCreated',
        cell: 'CellDate',
        align: 'right'
      },
      {
        unsortable: true,
        cell: 'CellDropdown',
        meta: {
          actions: [
            { title: 'Edit', action: handleClickEdit }, { title: 'Delete', action: handleClickDelete }
          ]
        }
      }
    ]
    const archivecolumns = [
      {
        title: 'Name',
        key: 'name',
        cell: 'CellTitle',
        meta: { link: 'RiskDetail' }
      },
      {
        title: 'Impact',
        key: 'impact',
        cell: 'CellText',
        meta: {
          locale: true,
          prefix: 'risk'
        }
      },
      {
        title: 'Likelihood',
        key: 'likelihood',
        cell: 'CellText',
        meta: {
          locale: true,
          prefix: 'risk'
        }
      },
      {
        title: 'Risk Level',
        key: 'riskLevel',
        cell: 'CellRiskLevel'
      },
      {
        title: 'Date Created',
        key: 'dateCreated',
        cell: 'CellDate',
        align: 'right'
      }
    ]
    const createRisk = async () => {
      try {
        newRisk.value.riskLevel = newRiskLevel.value
        newRisk.value.controls = {
          id: policyDetail.value.id,
          name: policyDetail.value.name,
          status: policyDetail.value.status,
          lastModified: policyDetail.value.lastModified,
          dateCreated: policyDetail.value.dateCreated
        }
        await risks.createDocuments(newRisk.value)
        notification({
          type: 'success',
          title: 'Success',
          message: notifyMessages.risk.create.success
        })
        toggleNewRisk()
      } catch (error) {
        console.error(error)
        notification({
          type: 'error',
          title: 'Error',
          message: notifyMessages.risk.create.error
        })
      }
    }
    const editRiskValue = async () => {
      try {
        newRisk.value.riskLevel = editRiskLevel.value
        await risks.updateDocuments(newRisk.value.id, [editRisk.value])
        notification({
          type: 'success',
          title: 'Success',
          message: notifyMessages.risk.update.success
        })
        isRiskEditVisible.value = !isRiskEditVisible.value
      } catch (error) {
        console.error(error)
        notification({
          type: 'error',
          title: 'Error',
          message: notifyMessages.risk.update.error
        })
      }
    }
    const deleteRiskValue = async () => {
      try {
        await risks.deleteDocuments(clickId.value)
        notification({
          type: 'success',
          title: 'Success',
          message: notifyMessages.risk.delete.success
        })
        isRiskDeleteVisible.value = !isRiskDeleteVisible.value
      } catch (error) {
        notification({
          type: 'error',
          title: 'Error',
          message: notifyMessages.risk.delete.error
        })
      }
    }

    onMounted(() => risks.readDocuments())
    onUnmounted(() => risks.clearStore())
    return {
      columns,
      documents: risks.getDocuments(),
      createRisk,
      newRisk,
      options,
      newRiskLevel,
      policyDetail,
      archivecolumns,
      profile,
      isRiskVisible,
      toggleNewRisk,
      editRiskLevel,
      editRisk,
      isRiskEditVisible,
      editRiskValue,
      deleteRiskValue,
      isRiskDeleteVisible
    }
  }
}
</script>

<style lang="stylus" scoped>
.rules-block
  font-size: 0.9em
  margin: 1em 0
.delete-container
  display: flex
  gap: 1.25em
  .description
    font-size: 0.875em
    .confirm
      padding-top: 0.625em
      font-weight: bold
</style>

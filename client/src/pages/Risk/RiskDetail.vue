<template lang="pug">
card-container(title="Risk Details")
  template(#controls)
    c-button(title="Edit" type="default" @click="toggleRiskVisible()")
  template(#content)
    definition-list(:data="riskDetails")

card-container(title="Controls")
  template(#controls)
    c-button-modal(title="Edit" modalTitle="Select Control" type="default" v-if="controlsDocuments && controlsDocuments.length" wide)
      template(#content)
        c-table(v-bind="{columns: controlsColumnsModal, documents: policyDocuments}")
      template(#footer)
        c-button(title="Add" type="primary" @click="addControl()")
    c-button-modal(title="Add Control" modalTitle="Select Control" type="default" v-if="!controlsDocuments || !controlsDocuments.length" wide)
      template(#content)
        c-table(v-bind="{columns: controlsColumnsModal, documents: policyDocuments}")
      template(#footer)
        c-button(title="Add" type="primary" @click="addControl()")

  template(#content)
    c-table(v-bind="{columns: controlsColumns, documents: controlsDocuments}")
c-modal(title="Edit Risk" v-model="isEditRiskVisible")
  template(#content)
    c-field(label="Risk Name" v-model="riskForm.name" required)
    c-select.col-3(label="Impact" :data="options" v-model="riskForm.impact")
    c-select.col-3(label="Likelihood" :data="options" v-model="riskForm.likelihood")
    c-label.col-2(label="Risk Level")
      c-badge(icon="warning-light" :title="`risk${newRiskLevel}`")
  template(#footer)
    c-button(title="Save" type="primary" @click="editRisk()")
c-modal(title="Unlink Policy" v-model="isDeleteVisible")
  template(#content)
    div
      icon(name="error" size="big")
    .description
      p This policy will be removed as a control for this risk. This will also remove the risk from the policy's associated Risks tab.
      p.confirm Do you want to continue?
  template(#footer)
    c-button(title="Unlink" type="primary" @click="deletePolicy()")
</template>

<script>
import { computed, inject, ref } from 'vue'
import UseData from '~/store/Data.js'
import definitionList from '~/components/Misc/DefinitionList.vue'
import { calcRiskLevel } from '~/core/utils.js'
import cSelect from '~/components/Inputs/cSelect.vue'
import cLabel from '~/components/Misc/cLabel.vue'
import cBadge from '~/components/Misc/cBadge.vue'
import useProfile from '~/store/Profile.js'
import cModal from '~/components/Misc/cModal.vue'
export default {
  components: { definitionList, cSelect, cLabel, cBadge, cModal },
  // eslint-disable-next-line
  setup () {
    const risks = new UseData('risks')
    const notification = inject('notification')
    const locale = inject('locale')
    const clickId = ref('')

    const { profile } = useProfile()
    const isDeleteVisible = ref(false)
    const isEditRiskVisible = ref(false)
    const riskForm = ref({
      name: '',
      impact: '',
      likelihood: ''
    })
    const toggleRiskVisible = () => {
      isEditRiskVisible.value = !isEditRiskVisible.value
      riskForm.value.name = risks.getDocument().value.name
      riskForm.value.impact = risks.getDocument().value.impact
      riskForm.value.likelihood = risks.getDocument().value.likelihood
    }
    const handleClickDelete = id => {
      clickId.value = id
      isDeleteVisible.value = !isDeleteVisible.value
    }
    const deletePolicy = async () => {
      try {
        const policyId = clickId.value
        const controls = risks.getDocument().value.controls.filter(doc => doc._id !== policyId)
        await risks.updateDocument(risks.getDocument().value._id, { controls })
        isDeleteVisible.value = !isDeleteVisible.value
        notification({
          type: 'success',
          title: 'Success',
          message: 'Control has been removed.'
        })
        await risks.readDocuments(risks.getDocument().value._id)
      } catch (error) {
        notification({
          type: 'error',
          title: 'Error',
          message: 'Control has not been removed. Please try again.'
        })
      }
    }
    const options = [
      { title: 'Low', value: 0 }, { title: 'Medium', value: 1 }, { title: 'High', value: 2 }
    ]
    const riskDetails = computed(() => ({
      name: risks.getDocument().value.name,
      impact: locale(`risk${risks.getDocument().value.impact}`),
      likelihood: locale(`risk${risks.getDocument().value.likelihood}`)
    }))
    const newRiskLevel = computed(() => calcRiskLevel(riskForm.value.impact, riskForm.value.likelihood))
    const editRisk = async () => {
      try {
        riskForm.value.riskLevel = newRiskLevel.value
        riskForm.value.creator = `${profile.value.firstName} ${profile.value.lastName}`
        await risks.updateDocument(risks.getDocument().value._id, riskForm.value)
        notification({
          type: 'success',
          title: 'Success',
          message: 'Risk has been updated.'
        })
        isEditRiskVisible.value = !isEditRiskVisible.value
        await risks.readDocuments(risks.getDocument().value._id)
      } catch {
        notification({
          type: 'error',
          title: 'Error',
          message: 'Risk has not been updated. Please try again.'
        })
      }
    }
    const checkPolicy = (id, event) => console.debug(id, event.target.value)
    const controlsColumns = [
      {
        title: 'Policy',
        key: 'name',
        cell: 'CellTitle',
        width: '50%',
        meta: {
          icon: 'policy'
          // "link": "PolicyDetail"
        }
      },
      {
        title: 'Status',
        key: 'status',
        cell: 'CellStatus'
      },
      {
        title: 'Last Modified',
        key: 'lastModified',
        cell: 'CellDate',
        align: 'right'
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
        meta: { actions: [{ title: 'Delete', action: handleClickDelete }] }
      }
    ]

    const controlsColumnsModal = [
      {
        title: 'Policy',
        key: 'name',
        cell: 'CellTitle',
        width: '50%',
        unsortable: true,
        meta: {
          icon: 'policy',
          checkbox: { action: checkPolicy }
          // "link": "PolicyDetail"
        }
      }, {
        title: 'Status',
        key: 'status',
        cell: 'CellStatus'
      }, {
        title: 'Last Modified',
        key: 'lastModified',
        cell: 'CellDate',
        align: 'right'
      }, {
        title: 'Date Created',
        key: 'dateCreated',
        cell: 'CellDate',
        align: 'right'
      }
    ]

    const policyDocuments = ref([
      {
        Created: 1644778085732,
        lastModified: 1644778085732,
        status: 'draft',
        name: 'Policy2',
        _id: '123234234'
      },
      {
        Created: 1644778085732,
        lastModified: 1644778085732,
        status: 'draft',
        name: 'Policy3',
        _id: '123234234'
      },
      {
        Created: 1644778085732,
        lastModified: 1644778085732,
        status: 'draft',
        name: 'Policy4',
        _id: '123234234'
      },
      {
        Created: 1644778085732,
        lastModified: 1644778085732,
        status: 'draft',
        name: 'Policy5',
        _id: '123234234'
      },
      {
        Created: 1644778085732,
        lastModified: 1644778085732,
        status: 'draft',
        name: 'Policy6',
        _id: '123234234'
      },
      {
        Created: 1644778085732,
        lastModified: 1644778085732,
        status: 'draft',
        name: 'Policy7',
        _id: '123234234'
      }
    ])
    const addControl = () => console.debug(policyDocuments.value)

    const controlsDocuments = computed(() => risks.getDocument().value.controls || [])

    return {
      handleClickDelete,
      addControl,
      riskDetails,
      controlsColumns,
      controlsColumnsModal,
      controlsDocuments,
      newRiskLevel,
      editRisk,
      options,
      riskForm,
      deletePolicy,
      policyDocuments,
      isDeleteVisible,
      toggleRiskVisible,
      isEditRiskVisible
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

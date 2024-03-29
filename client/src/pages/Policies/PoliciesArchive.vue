<template lang="pug">
// c-table(v-bind="{columns, documents: archivePolicies}" searchable v-if="profile.role == 'Admin' || profile.role == 'Trusted'")
// c-table(v-bind="{columns: basicColumns, documents: archivePolicies}" searchable v-if="profile.role == 'Basic'")
c-table(v-bind="{columns, documents: archivePolicies}" searchable)
c-modal(title="Unrchive Policy" v-model="isUnarchiveVisible")
  template(#content)
    .delete-container
      div
        icon(name="warning" size="big")
      .description
        p Unarchiving the policy will place it back into the compliance manual.
        p.confirm Do you want to continue?
  template(#footer)
    c-button(title="Confirm" type="primary" @click="handleClickUnarchive()")
c-modal(title="Delete Policy" v-model="isDeleteVisible")
  template(#content)
    .delete-container
      div
        icon(name="error" size="big")
      .description
        p Removing this policy will permanently delete all risks and tasks associated with this policy.
        p.confirm Do you want to continue?
  template(#footer)
    c-button(title="Confirm" type="primary" @click="handleClickDelete()")
</template>

<script>
import { onMounted, onUnmounted, ref, inject, computed } from 'vue'
import cBanner from '~/components/Misc/cBanner.vue'
import cModal from '~/components/Misc/cModal.vue'
import useProfile from '~/store/Profile.js'
import PolicyService from '~/services/policies.js'
import { notifyMessages } from '~/data/notifications.js'

export default {
  components: { cBanner, cModal },
  setup () {
    const policies = new PolicyService()
    const { profile } = useProfile()
    const notification = inject('notification')
    const isDeleteVisible = ref(false)
    const isUnarchiveVisible = ref(false)
    const archivePolicies = computed(() => policies.getDocuments().value.filter(document => document.status === 'archived'))
    let clickedId
    const toggleDeleteModal = id => {
      isDeleteVisible.value = !isDeleteVisible.value
      clickedId = id
    }
    const toggleUnarchiveModal = id => {
      isUnarchiveVisible.value = !isUnarchiveVisible.value
      clickedId = id
    }

    const handleClickUnarchive = async () => {
      try {
        await policies.updateDocument(clickedId, { status: 'published' })
        toggleUnarchiveModal()
        notification({
          type: 'success',
          title: 'Success',
          message: notifyMessages.policy.unarchive.success
        })
      } catch (error) {
        console.error(error)
        notification({
          type: 'error',
          title: 'Error',
          message: notifyMessages.policy.unarchive.error
        })
      }
    }
    const handleClickDelete = async () => {
      try {
        await policies.deleteDocuments(clickedId)
        toggleDeleteModal()
        notification({
          type: 'success',
          title: 'Success',
          message: notifyMessages.policy.delete.success
        })
      } catch (error) {
        console.error(error)
        notification({
          type: 'error',
          title: 'Error',
          message: notifyMessages.policy.delete.error
        })
      }
    }

    const columns = [
      {
        title: 'Name',
        key: 'name',
        cell: 'CellTitle',
        width: '50%',
        meta: { link: 'PolicyDetail' }
      },
      {
        title: 'Status',
        key: 'status',
        unsortable: true,
        cell: 'CellStatus'
      },
      {
        title: 'Last Modified',
        key: 'modifiedAt',
        cell: 'CellDate',
        align: 'right'
      },
      {
        title: 'Date Created',
        key: 'createdAt',
        cell: 'CellDate',
        align: 'right'
      },
      {
        unsortable: true,
        cell: 'CellDropdown',
        meta: {
          actions: [
            { title: 'Unarchive', action: toggleUnarchiveModal }, { title: 'Delete', action: toggleDeleteModal }
          ]
        }
      }
    ]

    // const basicColumns = [
    //   {
    //     'title': 'Name',
    //     'key': 'name',
    //     'cell': 'CellTitle',
    //         'unsortable': true
    //   },
    //   {
    //     'title': 'Status',
    //     'key': 'status',
    //     'cell': 'CellStatus',
    //   },
    //   {
    //     'title': 'Last Modified',
    //     'key': 'modifiedAt',
    //     'cell': 'CellDate',
    //     'align': 'right'
    //   },
    //   {
    //     'title': 'Date Created',
    //     'key': 'createdAt',
    //     'cell': 'CellDate',
    //     'align': 'right'
    //   }
    // ]

    onMounted(() => policies.readDocuments('', { status: 'archived' }))
    onUnmounted(() => policies.clearStore())

    return {
      columns,
      // basicColumns,
      documents: policies.getDocuments(),
      isDeleteVisible,
      isUnarchiveVisible,
      handleClickDelete,
      handleClickUnarchive,
      profile,
      archivePolicies
    }
  }
}
</script>

<style lang='stylus' scoped>
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

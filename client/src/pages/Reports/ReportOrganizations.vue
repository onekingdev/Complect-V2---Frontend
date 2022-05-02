<template lang="pug">
card-container.container(title="Access Persons" type="flex-column")
  template(#controls)
    router-link(:to="{ name: 'SettingsUsersDirectory' }") View all
  template(#content)
    c-table(v-bind="{columns: columnsAcessPerson, documents: accessUsers}")
card-container.container(title="Terminated Employees" type="flex-column")
  template(#controls)
    router-link(:to="{ name: 'SettingsUsersDirectory' }") View all
  template(#content)
    c-table(v-bind="{columns: terminateColumns, documents: terminateUsers}")
card-container.container(title="Resignations" type="flex-column")
  template(#controls)
    router-link(:to="{ name: 'SettingsUsersDirectory' }") View all
  template(#content)
    c-table(v-bind="{columns: terminateColumns, documents: resignationUsers}")
  div {{ isReactiveUserVisible }}
c-modal(title="Reactivate User" v-model="isReactiveUserVisible")
  template(#content)
    p.text-small
      | You are reactivating the user's account on Complect. All of the user's historical information was retained,
      | so all user activity will be available to the user again. Reactivating this user will also require an available seat.
  template(#footer)
    c-button(title="Confirm" type="primary" @click="reactiveUser()")
</template>

<script>
import cModal from '~/components/Misc/cModal.vue'
import useTeamMember from '~/store/TeamMember.js'

export default {
  components: { cModal },
  setup () {
    const {
      modal,
      isReactiveUserVisible,
      getData,
      accessUsers,
      terminateUsers,
      resignationUsers,
      handleEditUser,
      handleDisableUser,
      handleClickRoleInfor,
      handleDeleteUser,
      handleEnableUser,
      reactiveUser
    } = useTeamMember()

    const callBack = { handleSuccess: getData }

    const editReason = id => {
      modal({ name: 'cModalTeamMember', id, modalType: 'disabled', callBack })
    }

    const columnsAcessPerson = [
      {
        title: 'Name',
        key: 'user',
        cell: 'CellUser'
      },
      {
        title: 'Role',
        key: 'role',
        cell: 'CellRole',
        icon: { name: 'info', size: 'medium', handleClick: handleClickRoleInfor }
      },
      {
        title: 'Access Person',
        key: 'accessPerson',
        cell: 'CellAccessPerson'
      },
      {
        title: 'Start Date',
        key: 'startDate',
        cell: 'CellDate'
      },
      {
        unsortable: true,
        cell: 'CellDropdown',
        meta: {
          actions: [
            { title: 'Edit', action: handleEditUser }, { title: 'Disable', action: handleDisableUser }
          ]
        }
      }
    ]

    const terminateColumns = [
      {
        title: 'Name',
        key: 'user',
        cell: 'CellUser'
      },
      {
        title: 'Role',
        key: 'role',
        cell: 'CellRole'
      },
      {
        title: 'Reason',
        key: 'reason',
        cell: 'CellReason'
      },
      {
        title: 'Access Person',
        key: 'accessPerson',
        cell: 'CellAccessPerson'
      },
      {
        title: 'Start Date',
        key: 'startDate',
        cell: 'CellDate'
      },
      {
        title: 'Date Disabled',
        key: 'disabledAt',
        cell: 'CellDate'
      },
      {
        unsortable: true,
        cell: 'CellDropdown',
        meta: {
          actions: [
            { title: 'Edit', action: editReason }, { title: 'Reactivate', action: handleEnableUser }, { title: 'Delete', action: handleDeleteUser }
          ]
        }
      }
    ]

    return {
      isReactiveUserVisible,
      accessUsers,
      terminateUsers,
      resignationUsers,
      columnsAcessPerson,
      terminateColumns,
      reactiveUser
    }
  }
}
</script>

<style lang="stylus" scoped>
.container
  margin: 1em 0
</style>

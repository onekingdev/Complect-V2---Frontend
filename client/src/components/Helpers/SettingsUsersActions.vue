<template lang="pug">
c-button(title="Export" @click="exportUsers()")
c-button(title="Add User" type="primary" @click="createNewUser()")
</template>

<script>
import { inject } from 'vue'
import cSelect from '~/components/Inputs/cSelect.vue'

export default {
  components: { cSelect },
  emits: ['update-user'],
  setup (props, { emit }) {
    const modal = inject('modal')
    const handleNewUserSuccess = () => emit('update-user')

    const callBack = { handleSuccess: handleNewUserSuccess }

    const createNewUser = () => modal({ name: 'cModalTeamMember', callBack })

    return { createNewUser }
  }
}
</script>

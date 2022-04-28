<template lang="pug">
card-container(title="Collaborators")
  template(#controls)
    c-button(title="Add Collaborator" type="default" @click="toggleAddModal()")
  template(#content)
    .ind-collaborator(v-for="collaborator in projectDetail?.collaborators")
      c-avatar(:firstName="collaborator.first_name" :lastName="collaborator.last_name" :avatar="collaborator.avatar")
      .user-info
        .name {{ collaborator.firstName }} {{ collaborator.lastName }}
      .action
        c-button(title="Delete" type="default" @click="toggleDeleteModal( collaborator._id )")
        c-button(title="End Contract" type="default" @click="toggleEndModal( collaborator._id )")
c-modal(title="Add Collaborator" v-model="isAddModalVisible")
  template(#content)
    c-select(label="Select User" placeholder="Select..." :data="userData" v-model="newUser" searchable)
  template(#footer)
    c-button(title="Add" type="primary" @click="addNewCollaborator()")
c-modal(title="Remove Collaborator" v-model="isDeleteModalVisible")
  template(#content)
    icon.col-1(name="error" size="big")
    .text.col-5
      p You are removing this user as a collaborator from the project. Except for any linked tasks specifically assigned to them, this user will no longer be able to view this project and its contents.
  template(#footer)
    c-button(title="Remove" type="primary" @click="deleteCollaborator()")
c-modal(title="End Contract" v-model="isEndModalVisible")
  template(#content)
    icon.col-1(name="warning" size="big")
    .text.col-5
      p Ending this contract will remove this specialist as a collaborator to the project, revoke their permissions to access your account and payout the remaining contract price.
      b Do you want to continue?
  template(#footer)
    c-button(title="Confirm" type="primary" @click="endContract()")
</template>
<script>
import cBanner from '~/components/Misc/cBanner.vue'
import { ref, onMounted, inject } from 'vue'
import definitionList from '~/components/Misc/DefinitionList.vue'
import cModal from '~/components/Misc/cModal.vue'
import cAvatar from '~/components/Misc/cAvatar.vue'
import cSelect from '~/components/Inputs/cSelect.vue'
import UseData from '~/store/Data.js'
export default {
  components: {
    cBanner,
    definitionList,
    cModal,
    cAvatar,
    cSelect
  },
  props: {
    projectDetail: {
      type: Object,
      required: true
    },
    reloadCollection: {
      type: Function,
      default: () => 1
    }
  },
  emits: ['update:projectDetail'],
  setup (props) {
    const isAddModalVisible = ref(false)
    const isDeleteModalVisible = ref(false)
    const isEndModalVisible = ref(false)
    const newUser = ref('')
    const userData = ref([])
    const users = new UseData('users')
    const projects = new UseData('projects')
    const clickedUser = ref('')
    const notification = inject('notification')
    const toggleAddModal = () => {
      userData.value = users.getDocuments().value.map(user => ({
        title: `${user.firstName} ${user.lastName}`,
        value: user._id
      }))
      isAddModalVisible.value = !isAddModalVisible.value
    }
    const toggleDeleteModal = id => {
      clickedUser.value = id
      isDeleteModalVisible.value = !isDeleteModalVisible.value
    }
    const toggleEndModal = id => {
      clickedUser.value = id
      isEndModalVisible.value = !isEndModalVisible.value
    }
    const addNewCollaborator = async () => {
      try {
        const allCollaborator = props.projectDetail.collaborators
        await users.readDocuments(newUser.value)
        allCollaborator.push({
          _id: users.getDocument().value._id,
          firstName: users.getDocument().value.firstName,
          lastName: users.getDocument().value.lastName,
          avatar: users.getDocument().value.avatar
        })
        await projects.updateDocument(props.projectDetail._id, { collaborators: allCollaborator })
        props.reloadCollection()
        isAddModalVisible.value = !isAddModalVisible.value
        notification({
          type: 'success',
          title: 'Success',
          message: 'User has been added to the project.'
        })
      } catch (error) {
        notification({
          type: 'error',
          title: 'Error',
          message: 'User has been not added to the project. Please try again.'
        })
      }
    }
    const deleteCollaborator = async () => {
      try {
        const allCollaborator = props.projectDetail.collaborators.filter(collaborator => collaborator._id !== clickedUser.value)
        await projects.updateDocument(props.projectDetail._id, { collaborators: allCollaborator })
        props.reloadCollection()
        isDeleteModalVisible.value = !isDeleteModalVisible.value
        notification({
          type: 'success',
          title: 'Success',
          message: 'User has been removed from the project.'
        })
      } catch (error) {
        notification({
          type: 'error',
          title: 'Error',
          message: 'User has been not removed from the project. Please try again.'
        })
      }
    }
    const endContract = async () => { }
    onMounted(() => users.readDocuments())
    return {
      deleteCollaborator,
      endContract,
      isAddModalVisible,
      isDeleteModalVisible,
      isEndModalVisible,
      toggleAddModal,
      toggleDeleteModal,
      toggleEndModal,
      addNewCollaborator,
      userData,
      newUser
    }
  }
}
</script>
<style lang="stylus" scoped>
.ind-collaborator
  display: flex
  padding-bottom: 0.7em
  border-bottom: 1px solid var(--c-border)
  .c-avatar
    margin-right: 0.5em
  .user-info
    .name
      font-size: 20px
      margin-top: 0.325em
  .action
    margin-left: auto
    display: flex
    gap: 0.5em

</style>

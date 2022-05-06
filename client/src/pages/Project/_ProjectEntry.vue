<template lang="pug">
page-container(section="Projects" :title="document.name" :owner="linkaccount?.companyName" type="document")
  template(#add-controls)
    c-checkbox.show-calendar(label="Show on Calendar")

  template(#controls)
    c-button(title="Post Project"  @click="postProject()" v-if="document.creator === profile.id && !document.jobId")
    c-button(v-if="!document.completed" title="Mark as Complete" type="primary" @click="toggleCompleteModal()")
    c-button(v-if="document.completed && document.creator === profile.id" title="Mark as Incomplete" type="primary" @click="toggleIncompleteModal()")
    c-button(title="Post Project"  @click="postProject()" v-if="document.creator !== profile.id && !document.jobId")
    c-button(type="icon" iconL="close" size="small" @click="closeProject()")

  template(#tabs v-if="!document.jobId")
    router-link(v-for="(tab, index) in tabs" :key="index" :to="{name: tab.routeName}") {{ $locale(tab.title)}}
  template(#tabs v-if="document.jobId && (!proposals || proposals.length == 0)")
    router-link(v-for="(tab, index) in jobTabs" :key="index" :to="{name: tab.routeName}") {{ $locale(tab.title)}}
  template(#tabs v-if="document.jobId && proposals && proposals.length > 0")
    router-link(v-for="(tab, index) in contractTab" :key="index" :to="{name: tab.routeName}") {{ $locale(tab.title)}}
  template(#navigation-controls)
    // c-dropdown(title="Actions" v-if="document.creator === profile.id")
    c-dropdown(title="Actions")
      c-button(title="Edit" type="transparent" @click="toggleEditModal()")
      c-button(title="Delete" type="transparent" @click="toggleDeleteModal()")
  template(#content)
    router-view(v-model:projectDetail="document" :reloadCollection="reloadCollection")
c-modal(title="Edit Project" v-model="isEditModalVisible")
  template(#content)
    c-field(label="Project Name" v-model="projectForm.name" required)
    c-field.col-3(label="Start Date" type="date" v-model="projectForm.startsAt" required)
    c-field.col-3(label="End Date" type="date" v-model="projectForm.endsAt" required)
    c-field(label="Description" v-model="projectForm.description")
  template(#footer)
    c-button(title="Save" type="primary" @click="updateProject()")
c-modal(title="Complete Project" v-model="isCompleteModalVisible")
  template(#content)
    .delete-container
      div
        icon.col-1(name="success" size="big")
      .description
        p This will mark the project as complete and close the project to further edits.
        p.confirm Do you want to continue?
  template(#footer)
    c-button(title="Confirm" type="primary" @click="markAsComplete()")
c-modal(title="Reactive Project" v-model="isIncompleteModalVisible")
  template(#content)
    icon.col-1(name="success" size="big")
    .description
      p This project will be reactiveated and re-accessible for editing by all collaborators.
  template(#footer)
    c-button(title="Confirm" type="primary" @click="markAsIncomplete()")
c-modal(title="Remove Project" v-model="isDeleteModalVisible")
  template(#content)
    .delete-container
      div
        icon(name="error" size="big")
      .description
        p This will delete the project and all of its related tasks, documents, and comments from your records.
        p.confirm Do you want to continue?
  template(#footer)
    c-button(title="Confirm" type="primary" @click="deleteProject()")
</template>

<script>
import { onMounted, onUnmounted, inject, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ProjectService from '~/services/projects.js'
import ProposalService from '~/services/proposals.js'
import cDropdown from '~/components/Inputs/cDropdown.vue'
import cCheckbox from '~/components/Inputs/cCheckbox.vue'
import useProfile from '~/store/Profile.js'
import useBusiness from '~/store/Business.js'
import { manualApi } from '~/core/api.js'
import cModal from '~/components/Misc/cModal.vue'
import { notifyMessages } from '~/data/notifications.js'

const tabs = [
  {
    title: 'Detail',
    routeName: 'ProjectDetail'
  }, {
    title: 'Tasks',
    routeName: 'ProjectTasks'
  }, {
    title: 'Documents',
    routeName: 'ProjectDocuments'
  }, {
    title: 'Collaborators',
    routeName: 'ProjectCollaborators'
  }
]

const jobTabs = [
  {
    title: 'Detail',
    routeName: 'ProjectDetail'
  },
  {
    title: 'Tasks',
    routeName: 'ProjectTasks'
  },
  {
    title: 'Documents',
    routeName: 'ProjectDocuments'
  },
  {
    title: 'Collaborators',
    routeName: 'ProjectCollaborators'
  },
  {
    title: 'Job Post',
    routeName: 'ProjectPost'
  }
]

const contractTab = [
  {
    title: 'Detail',
    routeName: 'ProjectDetail'
  },
  {
    title: 'Tasks',
    routeName: 'ProjectTasks'
  },
  {
    title: 'Documents',
    routeName: 'ProjectDocuments'
  },
  {
    title: 'Collaborators',
    routeName: 'ProjectCollaborators'
  },
  {
    title: 'Contract',
    routeName: 'ProjectContract'
  }
]

export default {
  components: {
    cDropdown,
    cCheckbox,
    cModal
  },
  setup () {
    const route = useRoute()
    const router = useRouter()
    const projects = new ProjectService()
    const proposals = new ProposalService(route.params.id)
    const notification = inject('notification')
    const { profile, linkaccount } = useProfile()
    const { isBusiness } = useBusiness()
    const isCompleteModalVisible = ref(false)
    const isIncompleteModalVisible = ref(false)
    const isEditModalVisible = ref(false)
    const isDeleteModalVisible = ref(false)
    const projectForm = ref({
      name: '',
      startsAt: '',
      endsAt: '',
      description: ''
    })

    const reloadCollection = () => projects.readDocuments(route.params.id)

    const toggleCompleteModal = () => isCompleteModalVisible.value = !isCompleteModalVisible.value
    const toggleIncompleteModal = () => isIncompleteModalVisible.value = !isIncompleteModalVisible.value
    const toggleDeleteModal = () => isDeleteModalVisible.value = !isDeleteModalVisible.value
    const toggleEditModal = () => {
      isEditModalVisible.value = !isEditModalVisible.value
      projectForm.value.name = projects.getDocument().value.name
      projectForm.value.startsAt = projects.getDocument().value.startsAt
      projectForm.value.endsAt = projects.getDocument().value.endsAt
      projectForm.value.description = projects.getDocument().value.description
    }
    const closeProject = () => {
      if (!isBusiness) router.push({ name: 'JobsOverview' })
      else router.push({ name: 'ProjectsOverview' })
    }
    const updateProject = async updateDocument => {
      try {
        if (updateDocument) projectForm.value = updateDocument
        await projects.updateDocument(projects.getDocument().value.id, projectForm.value)
        notification({
          type: 'success',
          title: 'Success',
          message: 'Project has been edited.'
        })
        isEditModalVisible.value = !isEditModalVisible.value
      } catch (error) {
        notification({
          type: 'error',
          title: 'Error',
          message: 'Project has not been edited. Please try again.'
        })
      }
    }

    const markAsComplete = async () => {
      try {
        await proposals.readDocuments('', { jobid: projects.getDocument().value.jobId })
        const allContracts = proposals.getDocuments().value
        const hasActive = ref(false)
        for (let i = 0; i < allContracts.length; i++) if (allContracts[i].status !== 'complete') hasActive.value = true
        if (hasActive.value === true) {
          notification({
            type: 'error',
            title: 'Error',
            message: notifyMessages.project.complete.validate
          })
          isCompleteModalVisible.value = !isCompleteModalVisible.value
        } else {
          await projects.updateDocument(projects.getDocument().value.id, {
            status: 'complete',
            completed: true
          })
          notification({
            type: 'success',
            title: 'Success',
            message: notifyMessages.project.complete.success
          })
          closeProject()
        }
      } catch (error) {
        notification({
          type: 'error',
          title: 'Error',
          message: notifyMessages.project.complete.error
        })
      }
    }
    const markAsIncomplete = () => {
      try {
        projects.updateDocument(projects.getDocument().value.id, {
          status: 'in progress',
          completed: false
        })
        isIncompleteModalVisible.value = !isIncompleteModalVisible.value
        notification({
          type: 'success',
          title: 'Success',
          message: notifyMessages.project.reactive.success
        })
      } catch (error) {
        notification({
          type: 'error',
          title: 'Error',
          message: notifyMessages.project.reactive.error
        })
      }
    }
    const deleteProject = async () => {
      projects.deleteDocuments(projects.getDocument().value.id)
      closeProject()

      try {
        await proposals.readDocuments('', { jobid: projects.getDocument().value.jobId })
        const allContracts = proposals.getDocuments().value
        const hasActive = ref(false)
        for (let i = 0; i < allContracts.length; i++) if (allContracts[i].status !== 'complete') hasActive.value = false
        if (hasActive.value === true) {
          notification({
            type: 'error',
            title: 'Error',
            message: notifyMessages.project.delete.validate
          })
          isDeleteModalVisible.value = !isDeleteModalVisible.value
        } else {
          projects.deleteDocuments(projects.getDocument().value.id)
          notification({
            type: 'success',
            title: 'Success',
            message: notifyMessages.project.delete.success
          })
          closeProject()
        }
      } catch (error) {
        notification({
          type: 'error',
          title: 'Error',
          message: notifyMessages.project.delete.error
        })
      }
    }
    const postProject = async () => {
      const response = await manualApi({
        method: 'get',
        url: `payment/method/${isBusiness ? profile.value.businessId : profile.value.specialistId}`
      })
      if (response.data && response.data.length > 0) router.push({ name: 'ProjectPostJob', params: { id: projects.getDocument().value.id } })
      else {
        router.push({ name: 'BillingPlan' })
        notification({
          type: 'error',
          title: 'Error',
          message: notifyMessages.job.post.validatte
        })
      }
    }

    onMounted(async () => {
      await projects.readDocuments(route.params.id)
      proposals.readDocuments('', { jobid: projects.getDocument().value.jobId, status: 'accepted' })
    })
    onUnmounted(() => projects.clearStore())

    return {
      document: projects.getDocument(),
      proposals: proposals.getDocuments(),
      tabs,
      markAsComplete,
      closeProject,
      updateProject,
      deleteProject,
      postProject,
      profile,
      linkaccount,
      toggleCompleteModal,
      toggleIncompleteModal,
      toggleEditModal,
      toggleDeleteModal,
      isCompleteModalVisible,
      isIncompleteModalVisible,
      isEditModalVisible,
      isDeleteModalVisible,
      markAsIncomplete,
      projectForm,
      reloadCollection,
      jobTabs,
      contractTab
    }
  }
}
</script>
<style lang='stylus' scoped>
.show-calendar
  margin-bottom: 2em
.delete-container
  display: flex
  gap: 1.25em
  .description
    font-size: 0.875em
    .confirm
      padding-top: 0.625em
      font-weight: bold
</style>

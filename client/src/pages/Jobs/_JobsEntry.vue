<template lang="pug">
page-container(title="Jobs")
  template(#tabs)
    router-link(v-for="(tab, index) in tabs" :key="index" :to="{name: tab.routeName}") {{ $locale(tab.title)}}
  template(#content)
    router-view
</template>

<script>
import { ref, inject } from 'vue'
import { useRouter } from 'vue-router'
import ProjectService from '~/services/projects.js'
import useProfile from '~/store/Profile.js'
import useBusiness from '~/store/Business.js'
import { manualApi } from '~/core/api.js'
import { notifyMessages } from '~/data/notifications.js'
export default {
  setup () {
    const notification = inject('notification')
    const { isBusiness } = useBusiness()
    const router = useRouter()
    const projects = new ProjectService()
    const { profile } = useProfile()
    const tabs = [
      {
        title: 'My Jobs',
        routeName: 'JobsOverview'
      }, {
        title: 'Contacts',
        routeName: 'JobsContacts'
      }, {
        title: 'Ratings and Reviews',
        routeName: 'JobsRatings'
      }
    ]

    const postJob = async () => {
      const response = await manualApi({
        method: 'get',
        url: `payment/method/${isBusiness ? profile.value.businessId : profile.value.specialistId}`
      })
      if (response.data && response.data.length > 0) router.push({ name: 'ProjectPostNew' })
      else {
        router.push({ name: 'BillingPlan' })
        notification({
          type: 'error',
          title: 'Error',
          message: notifyMessages.job.post.validate
        })
      }
    }

    const newProject = ref({
      name: '',
      startsAt: Date.now(),
      endsAt: Date.now() + 864e5,
      description: '',
      collaborators: [],
      tasks: [],
      fixedBudget: 0,
      status: 'draft'
    })

    const createProject = async () => {
      try {
        newProject.value.creator = profile.value.id
        newProject.value.collaborators = profile.value
        const projectId = await projects.createDocuments(newProject.value)
        notification({
          type: 'success',
          title: 'Success',
          message: notifyMessages.project.create.success
        })
        router.push({
          name: 'ProjectDetail',
          params: { id: projectId[0] }
        })
      } catch (error) {
        notification({
          type: 'error',
          title: 'Error',
          message: notifyMessages.project.create.error
        })
      }
    }

    return {
      tabs,
      postJob,
      newProject,
      createProject
    }
  }
}
</script>

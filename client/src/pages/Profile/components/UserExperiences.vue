<template lang="pug">
div
  div.heading
    h3.semibold Experience
    c-button.btn-new-experience(title="Add Experience" @click="openExperienceModal()")
  div.experiences(v-for="(item, index) in userExperiences" :key="index")
    div.experiences-item
      div.heading
        h3.col-4.semibold {{ item.name }}
        c-button(title="Delete" @click="confirmDeleteExperience(item.id)")
        c-button(title="Edit" type="primary" @click="editExperience(item.id)")
      div.timeline {{ item.employer }} | {{ formatDate(item.startsAt) }} - {{ item.isPresent ? "Present" : formatDate(item.endsAt) }}
      div.description {{ item.description }}
</template>
<script>
import { ref, inject, onMounted } from 'vue'
import cModalExperience from '~/components/Modals/cModalExperience.vue'
import cModalDelete from '~/components/Modals/cModalDelete.vue'
import WorkExperienceService from '~/services/work_experiences.js'
import { formatDate } from '~/core/utils.js'
import useProfile from '~/store/Profile.js'

export default {
  components: {
    cModalExperience,
    cModalDelete
  },
  setup () {
    const { profile } = useProfile()
    const modal = inject('modal')
    const editExperienceId = ref(null)
    const userExperiences = ref([])

    const userExperiencesData = new WorkExperienceService()

    const getExperienceData = async () => {
      await userExperiencesData.readDocuments(null, { userId: profile.value.id })
      userExperiences.value = userExperiencesData.getDocuments().value
    }

    const callbackModalExperience = experience => {
      const index = userExperiences.value.findIndex(item => item.id === experience.id)
      if (index > -1) userExperiences.value[index] = experience
      else getExperienceData()
    }

    const openExperienceModal = id => modal({ name: 'cModalExperience', id, callback: callbackModalExperience })
    const editExperience = id => openExperienceModal(id)

    const callbackDelete = id => {
      const index = userExperiences.value.findIndex(item => item.id === id)
      if (index > -1) userExperiences.value.splice(index, 1)
    }

    const confirmDeleteExperience = id => {
      modal({
        name: 'cModalDelete',
        id,
        callback: callbackDelete,
        title: 'Experience',
        description: 'You are deleting a record of your work experience.',
        collection: 'user_experiences'
      })
    }

    onMounted(() => {
      getExperienceData()
    })

    return {
      editExperienceId,
      userExperiences,
      editExperience,
      confirmDeleteExperience,
      openExperienceModal,
      formatDate
    }
  }
}
</script>

<style lang="stylus" scoped>
.btn-new-experience
  max-width: 12em;
.experiences
  .experiences-item
    padding: 1em;
    margin: 1em 0;
    border-radius: 0.4em;
    border: 1px solid var(--c-border, #dcdee4)
    .timeline
      font-size: 1.25em;
      margin-bottom: 0.3em;
    .description
      font-size: 0.9em;
.heading
  display: flex;
  .c-button
    margin: 0 0.5em;
  h3
    flex-grow: 1;
</style>

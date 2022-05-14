<template lang="pug">
.notification-center
  h2.ncenter-title Today
  .ncenter-content
    template(v-for="(document, index) in documents")
      .ncenter-ind-content(:class="{ 'border-bottom': index !== documents.length - 1 }")
        c-avatar(:firstName="document.firstName" :lastName="document.lastName" size="small")
        .ncenter-description
          p {{ document.description }}
          p.ncenter-time {{ document.createdAt }}
        .ncenter-button
          c-button(title="View")
          c-button(type="icon" iconL="close" size="small" @click="closeModal(index, true)")

  h2.ncenter-title Previous
  .ncenter-content
    template(v-for="(document, index) in previousDocuments")
      .ncenter-ind-content(:class="{ 'border-bottom': index !== previousDocuments.length - 1 }")
        c-avatar(:firstName="document.firstName" :lastName="document.lastName" size="small")
        .ncenter-description
          p {{ document.description }}
          p.ncenter-time {{ document.createdAt }}
        .ncenter-button
          c-button(title="View")
          c-button(type="icon" iconL="close" size="small" @click="closeModal(index, false)")
</template>

<script>
import { onMounted, onUnmounted, ref } from 'vue'
import UseData from '~/store/Data.js'
import cBanner from '~/components/Misc/cBanner.vue'
import cModal from '~/components/Misc/cModal.vue'
import cUpload from '~/components/Inputs/cUpload.vue'
import cAvatar from '~/components/Misc/cAvatar.vue'
import { formatDate } from '~/core/utils'
export default {
  components: { cBanner, cModal, cUpload, cAvatar },
  setup () {
    const notifiCollection = new UseData('notifications')
    const arrayCheckboxes = ref([
      { label: 'Address', value: 'address' }, { label: 'Phone Number', value: 'phone' }, { label: 'Contact Email', value: 'email' }, { label: 'Disclouser', value: 'disclouser' }
    ])
    const documents = ref([
      {
        id: '1',
        firstName: 'Andrew',
        lastName: 'Gomez',
        description: 'Andrew Gomez requested to extend the deadline for 13F Filing.',
        created_at: '0:00 PM'
      }, {
        id: '2',
        firstName: 'Andrew',
        lastName: 'Gomez',
        description: 'John Smith added Andrew Gomez to the project 13F Filing.',
        created_at: '0:00 PM'
      }, {
        id: '3',
        firstName: 'Andrew',
        lastName: 'Gomez',
        description: 'John Smith sent you a message.',
        created_at: '0:00 PM'
      }
    ])
    const previousDocuments = ref([
      {
        id: '4',
        firstName: 'Andrew',
        lastName: 'Gomez',
        description: 'Chris Jackson completed Task Name Here.',
        created_at: '0:00 PM'
      }, {
        id: '5',
        firstName: 'Andrew',
        lastName: 'Gomez',
        description: 'Andrew Gomez applied to the project 13F Filing.',
        created_at: '0:00 PM'
      }, {
        id: '6',
        firstName: 'Andrew',
        lastName: 'Gomez',
        description: 'John Smith added Andrew Gomez to the project 13F Filing.',
        created_at: '0:00 PM'
      }
    ])

    const closeModal = (id, istoday) => {
      // notifiCollection.updateDocument( id, { "read_at": Date.now() });
      // notifiCollection.readDocuments();
      if (istoday) documents.value.splice(id, 1)
      else previousDocuments.value.splice(id, 1)
    }

    onMounted(() => notifiCollection.readDocuments())
    onUnmounted(() => notifiCollection.clearStore())

    return {
      arrayCheckboxes,
      closeModal,
      formatDate,
      documents,
      previousDocuments
    }
  }
}
</script>

<style lang="stylus" scoped>
.notification-center
  .ncenter-title
    font-weight: 700
    font-size: 0.875em
    margin: 1.25em 0
  .ncenter-content
    border: 1px solid var(--c-border)
    border-radius: 5px
    .ncenter-ind-content
      display: flex
      padding: 1em
      flex-direction: row
      gap: 0.6em
      align-items: center
      &.border-bottom
        border-bottom: 1px solid var(--c-border)
      .ncenter-description
        .ncenter-time
          color: var(--c-grey-500)
      .ncenter-button
        margin-left: auto
        display: flex
        flex-direction: row
        gap: 0.6em
</style>

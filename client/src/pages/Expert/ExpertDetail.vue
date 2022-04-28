<template lang="pug">
page-container(section="Specialist Marketplace" type="document")
  template(#content)
    p.link-content
      span.link-ind(@click="gotoMarket()") Specialist Marketplace
      span.link-ind /
      span.link-ind
        b {{ document.firstName }} {{ document.lastName }}
    card-container(title="Specialist Profile")
      template(#content)
        .user-content.grid-6(v-if="document._id")
          .col-1
            c-avatar(avatar="avatar.jpg" :firstName="document.first_name" :lastName="document.last_name" size="huge")
          .col-5
            .user-detail
              div
                router-link.user-title(:to="{name: 'ExpertDetail', params: {id: document._id}}") {{ document.firstName }} {{ document.lastName }}
                p.user-type
                  span.user-indsutry(v-for="(industry, index) in document.industries") {{ industries.find( ind => ind.value == industry )["title"] }}
              c-button-modal.message-button( :modalTitle="`Message with ${document.firstName} ${document.lastName}`" type="primary" title="Message")
                template(#content)
                  c-chat(:comments="comments")
            c-rating(readonly v-model="rating")
            div.grid-6.user-info
              div.col-2.user-info-ind
                icon(name="money" size="small")
                .detail
                  span Hourly Rate
                  p ${{ document.rate }}
              div.col-2.border-left.user-info-ind
                icon(name="money" size="small")
                .detail
                  span Experience
                  p(v-if="document.experience == 0") Junior
                  p(v-if="document.experience == 1") Intermediate
                  p(v-if="document.experience == 2") Expert
              div.col-2.border-left.user-info-ind
                icon(name="world" size="small")
                .detail
                  span JURISDICTION
                  p
                    span.user-jurisdiction(v-for="jurisdiction in document.jurisdictions") {{ jurisdictions.find( jur => jur.value == jurisdiction )["title"] }}
        hr
        .skill-content
          p.skill-title Skills
          .skill-ind(v-for="skill in document.skills") {{ skill }}
</template>

<script>
import { onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import UseData from '~/store/Data.js'
import cAvatar from '~/components/Misc/cAvatar.vue'
import cChat from '~/components/Misc/cChat.vue'
import cRating from '~/components/Inputs/cRating.vue'
import { industries, jurisdictions } from '~/data/static.js'
export default {
  components: { cAvatar, cChat, cRating },
  setup () {
    const userCollection = new UseData('users')
    const route = useRoute()
    const router = useRouter()

    const tabs = [
      {
        title: 'Detail',
        routeName: 'ReviewDetail'
      }, {
        title: 'Tasks',
        routeName: 'ReviewTasks'
      }, {
        title: 'Documents',
        routeName: 'ReviewDocuments'
      }
    ]

    const updateProject = () => {}
    const gotoMarket = () => router.push({ name: 'ExpertList' })

    onMounted(() => userCollection.readDocuments(route.params.id))
    onUnmounted(() => userCollection.clearStore())

    return {
      tabs,
      document: userCollection.getDocument(),
      updateProject,
      industries,
      jurisdictions,
      gotoMarket
    }
  }
}
</script>
<style lang="stylus" scoped>
.link-content
  margin-top: 1.25em
  margin-bottom: 1.25em
  cursor: pointer
  .link-ind
    font-size: 1em
    margin-right: 0.7em
.user-content
  padding: 2em 3em
  margin: 0px -1.5em
  .user-detail
    display: flex
    .user-title
      font-weight: 900
    .user-type
      color: var(--c-grey-500)
      .user-indsutry
        font-size: 0.875em
        margin-right: 0.7em
    .message-button
      margin-left: auto
  .user-description
    margin-top: 1.25em
    margin-bottom: 2em
  .user-info
    margin-top: 2em
    .border-left
      border-left: 1px solid var(--c-border)
      padding-left: 1.25em
    .user-info-ind
      display: flex
      flex-direction: row
      gaps: 1em
      font-weight: 700
      svg
        margin-top: 0.375em
      .detail
        margin-left: 0.7em
      span
        color: var(--c-grey-500)
        font-weight: 500
      .user-jurisdiction
        margin-right: 0.7em
        color: var(--c-headers)
.skill-content
  padding: 2em 3em
  border-top: 1px solid var(--c-border)
  .skill-title
    font-size: 1.25em
    font-weight: 700
    margin-bottom: 1.25em
  .skill-ind
    border: 1px solid var(--c-border)
    border-radius: 5px
    display: inline-block
    padding: 0.125em 0.3em
    margin-right: 0.7em
    font-size: 0.875em
</style>

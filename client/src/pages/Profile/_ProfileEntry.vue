<template lang="pug">
.page.medium-card
  card-container(title="Profile")
    template(#content)
      horizontal-tabs(:class="userType")
        template(#tabs)
          router-link(v-for="(tab, index) in tabs" :key="index" :to="{name: tab.routeName}") {{ tab.title }}
        template(#content)
          router-view
</template>

<script>
import HorizontalTabs from '~/components/Containers/HorizontalTabs.vue'
import useProfile from '~/store/Profile.js'

export default {
  components: { HorizontalTabs },
  setup () {
    const { profile } = useProfile()
    const userType = profile.value.type
    const tabs = [
      {
        title: 'About',
        routeName: 'ProfileAbout'
      }, {
        title: 'Settings',
        routeName: 'ProfileSettings'
      }
    ]

    return {
      tabs,
      userType
    }
  }
}
</script>

<style lang="stylus" scoped>
.page
  :deep(.horizontal-tabs-container.business)
    .container-tabs
      display: none;
</style>

<template lang="pug">
vertical-tabs.page
  template(#tabs)
    router-link(v-for="(tab, index) in tabs" :key="index" :to="{name: tab.routeName}") {{ $locale(tab.title)}}
  template(#content)
    router-view
</template>

<script>
import VerticalTabs from '~/components/Containers/VerticalTabs.vue'
export default {
  components: { VerticalTabs },
  props: {
    section: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: 'Title'
    },
    owner: {
      type: String,
      default: ''
    }
  },
  setup () {
    const tabs = [
      {
        title: 'General',
        routeName: 'SettingsGeneral'
      },
      {
        title: 'Client Permissions',
        routeName: 'SettingsRoles'
      },
      {
        title: 'Security',
        routeName: 'SettingsSecurity'
      },
      {
        title: 'Subscriptions',
        routeName: 'SettingsSubscriptions'
      },
      {
        title: 'Billing',
        routeName: 'SettingsBilling'
      }
    ]

    return { tabs }
  }
}
</script>

<style lang="stylus" scoped>
.page
  min-width: 1000px
  padding: 2em
  :deep(.container-tabs a)
    text-align: left
  :deep(.container-content)
    overflow: revert;
</style>

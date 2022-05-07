<template lang="pug">
page-container(title="Personal Trade Monitoring")
  template(#controls)
    c-button(title="Add Account" type="primary")
  template(#tabs)
    router-link(v-for="(tab, index) in tabs" :key="index" :to="{name: tab.routeName}") {{ $locale(tab.title)}}
  template(#content)
    router-view
</template>

<script>
export default {
  setup () {
    const tabs = [
      {
        title: 'Transactions',
        routeName: 'TradeTransaction'
      }, {
        title: 'Accounts',
        routeName: 'TradeAccount'
      }, {
        title: 'Monitor List',
        routeName: 'TradeMonitor'
      }
    ]

    return {
      tabs
    }
  }
}
</script>

<style lang="stylus" scoped>
:deep(.container-content)
	background: var(--c-bg-z1)
</style>

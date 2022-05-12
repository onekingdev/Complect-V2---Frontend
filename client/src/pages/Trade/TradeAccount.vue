<template lang="pug">
.account-container
  c-account-card(v-for="(card, index) in cards" v-bind="card" :key="index")
    template(#control)
      c-button(title="Remove Account" type="default" @click="removeAccount" fullwidth)
</template>

<script>
import { inject } from 'vue'
import cAccountCard from '~/components/Misc/cAccountCard.vue'
export default {
  components: { cAccountCard },
  setup () {
    const modal = inject('modal')
    const cards = [
      { imgName: 'fidelity.png' }, { imgName: 'interactive_brokers.png' }, { imgName: 'merrill.png' }
    ]
    const updateAccount = () => {}
    const removeAccount = id => modal({ name: 'cModalDelete', id, title: 'Account', description: 'Deleting the account will remove it from your account lists.', callback: updateAccount })

    return { cards, removeAccount }
  }
}
</script>

<style lang="stylus" scoped>
.account-container
  gap: 1.25em
  display: flex
  flex-direction: row
</style>

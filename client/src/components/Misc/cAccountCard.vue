<template lang="pug">
.c-account-card
  .account-card-img
    img(:src="`/img/${imgName}`" loading="lazy")
  .account-card-control
    slot(name="control")
</template>

<script>
export default {
  props: {
    imgName: {
      type: String,
      default: 'fidelity.png'
    }
  },
  setup () {

    return { }
  }
}
</script>

<style lang="stylus" scoped>
.c-account-card
  padding: 1.25em
  border: 1px solid var(--c-border)
  display: flex
  flex-direction: column
  width: 22em
  background: var(--c-bg-z2)
  .account-card-img
    height: 7.5em
    display: flex
    align-items: center
    margin-bottom: 2.5em
</style>

<template lang="pug">
.vertical-tabs
  .container-tabs(v-if="$slots['tabs']")
    slot(name="tabs")
  .container-content
    slot(name="content")
</template>

<script>
export default {}
</script>

<style lang="stylus" scoped>
.vertical-tabs
  width: 100%
  min-height: 100%
  display: grid
  grid-template-columns: auto 1fr
  grid-template-rows: auto
  gap: 2.5em
  position: relative
  .container-tabs, .container-content
    max-height: 100%
  .container-tabs
    width: 16.4em
    display: flex
    flex-direction: column
    gap: 0.5em
    :deep(a)
      color: #343741
      padding: 0.8em 1em
      line-height: 1.2
      border-radius: var(--v-border-radius)
      transition: background var(--fx-input-transition-duration) ease-in-out
      &:hover, &.router-link-active
        color: #000
        background: #dcdee4
</style>

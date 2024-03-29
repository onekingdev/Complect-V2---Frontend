<template lang="pug">
.c-input.c-range
  icon(v-if="iconL" :name="iconL" @click="stepValue(-step)")
  input(type="range" :min="min" :max="max" :step="step" :value="modelValue" @input="updateValue")
  icon(v-if="iconR" :name="iconR" @click="stepValue(step)")
</template>

<script>
export default {
  props: {
    iconL: {
      type: String,
      default: '',
      required: false
    },
    iconR: {
      type: String,
      default: '',
      required: false
    },
    min: {
      type: Number,
      default: 0,
      required: false
    },
    max: {
      type: Number,
      default: 100,
      required: false
    },
    step: {
      type: Number,
      default: 1,
      required: false
    },
    modelValue: {
      type: Number,
      required: true
    }
  },
  emits: ['update:modelValue'],
  setup (props, context) {
    const stepValue = value => context.emit('update:modelValue', props.modelValue + value)
    const updateValue = event => context.emit('update:modelValue', event.target.value)
    return {
      stepValue,
      updateValue
    }
  }
}
</script>

<style lang="stylus" scoped>
.c-range
  display: flex
  align-items: center
  max-width: 12em
  background: rgba(#fff,0.04)
  padding: 0.2em 0.5em
  border-radius: 0.5em
  svg.icon
    width: 1em
    height: 1em
    fill: #aaa
    flex: 1 0 auto
    cursor: pointer
    transition: fill 0.2s
    &:hover
      fill: #fff
  input
    margin: 0 0.5em

  // Reset
  input[type=range]
    -webkit-appearance: none // Hides the slider so that custom slider can be made
    width: 100% // Specific width is required for Firefox
    background: transparent // Otherwise white in Chrome

  input[type=range]::-webkit-slider-thumb
    -webkit-appearance: none

  input[type=range]:focus
    outline: none // Removes the blue border. You should probably do some kind of focus styling for accessibility reasons though

  // Track
  input[type=range]
    &::-webkit-slider-runnable-track
      width: 100%
      height: 0.2em
      cursor: pointer
      background: var(--c-blue)
      border-radius: 0.2em
    &:focus::-webkit-slider-runnable-track
      background: var(--c-blue)
  input[type=range]::-moz-range-track
    width: 100%
    height: 0.2em
    cursor: pointer
    background: var(--c-blue)
    animate: 0.2s
    border-radius: 0.2em

  // Thumb
  input[type=range]
    &::-webkit-slider-thumb
      border: none
      height: 0.8em
      width: 0.8em
      border-radius: 50%
      background: #eee
      cursor: pointer
      margin-top: -0.3em
      -webkit-appearance: none
    &::-moz-range-thumb
      border: none
      height: 0.8em
      width: 0.8em
      border-radius: 50%
      background: #eee
      cursor: pointer
</style>

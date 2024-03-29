<template lang="pug">
c-label.c-input.c-field(:class="{fullwidth, disabled, transparent}" v-bind="{label, required}")
  div(:class="divClass")
    icon(v-if="iconL || icon" :name="iconL || type")
    component.field-input(
      :is="type"
      :class="`field-input-${type}`"
      :placeholder="placeholder"
      :required="required"
      :value="modelValue"
      :data="data"
      @updateValue="updateModelValue")
    icon(v-if="iconR" :name="iconR")
  .field-info.error(v-if="errors && errors.length")
    p(v-for="(error, index) in errors" :key="index") {{error}}
  //- .field-info(v-if="info") {{ info }}
</template>

<script>
import { defineAsyncComponent, computed } from 'vue'
import cLabel from '~/components/Misc/cLabel.vue'
export default {
  components: {
    cLabel,
    Date: defineAsyncComponent(() => import('./Types/TypeDate.vue')),
    Email: defineAsyncComponent(() => import('./Types/TypeEmail.vue')),
    Multiselect: defineAsyncComponent(() => import('./Types/TypeMultiselect.vue')),
    Number: defineAsyncComponent(() => import('./Types/TypeNumber.vue')),
    Password: defineAsyncComponent(() => import('./Types/TypePassword.vue')),
    Search: defineAsyncComponent(() => import('./Types/TypeSearch.vue')),
    Tel: defineAsyncComponent(() => import('./Types/TypeTel.vue')),
    Text: defineAsyncComponent(() => import('./Types/TypeText.vue')),
    Rich: defineAsyncComponent(() => import('./Types/TypeRich.vue')),
    Time: defineAsyncComponent(() => import('./Types/TypeTime.vue')),
    Url: defineAsyncComponent(() => import('./Types/TypeUrl.vue')),
    Address: defineAsyncComponent(() => import('./Types/TypeAddress.vue')),
    Tag: defineAsyncComponent(() => import('./Types/TypeTag.vue')),
    Currency: defineAsyncComponent(() => import('./Types/TypeCurrency.vue'))
  },
  props: {
    type: {
      type: String,
      default: 'text'
    },
    label: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    iconL: {
      type: String,
      default: ''
    },
    iconR: {
      type: String,
      default: ''
    },
    errors: {
      type: Array,
      default: () => []
    },
    info: {
      type: String,
      default: ''
    },
    autocomplete: {
      type: String,
      default: 'off'
    },
    tabIndex: {
      type: Number,
      default: 0
    },
    data: {
      type: Array,
      required: true
    },
    modelValue: {
      type: [
        String, Number, Array, Object
      ],
      default: ''
    },
    icon: Boolean,
    multiselect: Boolean,
    required: Boolean,
    fullwidth: Boolean,
    transparent: Boolean,
    disabled: Boolean
  },
  emits: ['update:modelValue'],
  setup (props, context) {
    const updateModelValue = value => {
      context.emit('update:modelValue', value)
    }
    const divClass = computed(() => {
      return {
        errors: props.errors && props.errors.length,
        'field-body': props.type !== 'rich',
        'field-body-tag': props.type === 'tag'
      }
    })
    return { updateModelValue, divClass }
  }
}
</script>

<style lang="stylus" scoped>
.c-field
  min-width: 8em
  .field-body
    background: var(--c-bg-z2)
    box-shadow: 0 0 0 1px var(--c-border)
    border-radius: var(--v-inputs-border-radius)
    overflow: hidden
    display: flex
    align-items: center
    gap: 0.3em
    padding: 0.35em 0.5em
    min-height: 2em
    &.field-body-tag
      overflow: inherit
    &.errors
      box-shadow: 0 0 0 1px #f00
    svg.icon
      width: 1em
      height: 1em
      fill: #777
      flex-shrink: 0
      &.icon-required
        width: 0.4em
        height: 0.4em
        fill: #777
        margin-left: 0.4em
    .field-input
      font-size: 0.875em
      flex: 1 0 auto
      width: 1em
      color: #000
      background: transparent
      border: none
      outline: none
      padding: 0
      margin: 0
      &::placeholder
        color: #999
        font-size: 0.9em
  &.transparent
    .field-body
      box-shadow: 0 0 0 0
      padding: 0
  // &:focus-within
  //   .field-body
  //     box-shadow: 0 0 0 0.15rem #4499f0
  &.fullwidth
    width: 100%
  .field-info
    font-size: 0.7em
    margin-top: 0.3em
    &.error
      color: red
  &.disabled
    pointer-events: none
</style>

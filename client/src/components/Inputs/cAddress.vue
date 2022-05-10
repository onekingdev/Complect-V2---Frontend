<template lang="pug">
.address
  .item-label
    | {{ label }}
    span.required(v-if="required") *
  vue-google-autocomplete#map(
    ref="address"
    class="custom-input"
    :class="{'errors': errors && errors.length}"
    v-model="form.address"
    :placeholder="placeholder"
    :fields="FIELDS"
    v-on:placechanged="getAddressData"
    v-on:inputChange="updateAdressValue"
  )
  .field-info.error(v-if="errors && errors.length")
    p(v-for="(error, index) in errors" :key="index") {{error}}
</template>

<script>
import VueGoogleAutocomplete from 'vue-google-autocomplete'
import { ref, onMounted } from 'vue'

const FIELDS = [
  'address_components',
  'adr_address',
  'geometry',
  'formatted_address',
  'name'
]

export default {
  components: { VueGoogleAutocomplete },
  props: {
    value: {
      type: String,
      required: true
    },
    label: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    errors: {
      type: Array,
      default: () => []
    },
    required: Boolean
  },
  emits: ['update'],
  setup (props, context) {
    const address = ref(null)
    const form = ref({})

    const getAddressData = (addressData, placeResultData, id) => {
      const input = document.getElementById(id)
      form.value.address = input.value
      form.value.city = addressData.locality
      form.value.state = addressData.administrative_area_level_1
      form.value.zip = addressData.postal_code

      context.emit('update', form.value)
    }

    const updateAdressValue = addressInput => {
      context.emit('update', { address: addressInput.newVal })
    }

    onMounted(() => {
      address.value.update(props.value)
    })

    return { FIELDS, form, address, getAddressData, updateAdressValue }
  }
}
</script>

<style lang="stylus" scoped>
.custom-input
  width: 100%;
  font-size: 0.9em;
  flex: 1 0 auto;
  color: #000;
  outline: none;
  border: none;
  line-height: 1.3;
  padding: 0;
  margin: 0;
  background: var(--c-bg-z2);
  box-shadow: 0 0 0 1px var(--c-border);
  border-radius: var(--v-inputs-border-radius);
  overflow: hidden;
  display: flex;
  align-items: center;
  gap: 0.3em;
  padding: 0.4967em 0.5em;
  min-height: 2em;
  &.errors
    box-shadow: 0 0 0 1px #f00
  &::placeholder
    color: #999
    font-size: 0.9em
.address
  .item-label
    font-size: 0.8em;
    margin-bottom: 0.2em;
    color: #666;
  .required
    color: var(--c-red);
    line-height: 1;
    font-weight: bold;
    margin-left: 0.2em;
</style>

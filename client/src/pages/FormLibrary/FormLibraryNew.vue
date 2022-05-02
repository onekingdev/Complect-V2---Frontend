<template lang="pug">
c-field(label="Form Name" v-model="form.name" required )
.t-header
  .t-title Select Template
  .t-sub Create your own form from scratch or select from pre-made templates
.t-content
  c-radio-cards.card(id="form-type" :data="formTypes" v-model="form.type")
.t-action
  c-button(title="Exit" type="link" @click="onExit()")
  c-button(title="Continue" type="primary" @click="onContinue()" :disabled="!form.name || !form.type")
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import cRadioCards from '~/components/Inputs/cRadioCards.vue'
export default {
  components: { cRadioCards },
  props: {
    type: {
      type: String,
      default: 'attestation'
    },
    title: {
      type: String,
      default: 'Employee Log Forms'
    }
  },
  setup (props) {
    const router = useRouter()
    const form = ref({
      name: '',
      type: ''
    })
    const types = {
      attestation: [
        {
          value: 'custom',
          title: 'Custom Form',
          icon: 'document',
          description: 'No fields'
        }, {
          value: 'quarterly',
          title: 'Quarterly Transaction Report',
          icon: 'trade',
          description: 'Collect trades within a certain date range.'
        }, {
          value: 'test',
          title: 'Test Template',
          icon: 'trade',
          description: 'Enter description here.'
        }
      ],
      logs: [
        {
          value: 'custom',
          title: 'Custom Form',
          icon: 'document',
          description: 'No fields'
        }, {
          value: 'gift',
          title: 'Gifts and Entertainment Log',
          icon: 'logs',
          description: 'Form to collect entries for gifts and entertainment.'
        }, {
          value: 'inadvertent',
          title: 'Inadvertent Receipt of Client Assets',
          icon: 'logs',
          description: 'Enter description here.'
        }
      ],
      approval: [
        {
          value: 'custom',
          title: 'Custom Form',
          icon: 'document',
          description: 'No fields'
        }, {
          value: 'gift',
          title: 'Gifts and Entertainment Pre-Approval',
          icon: 'logs',
          description: 'Form to get potential gifts and entertainment items approved.'
        }, {
          value: 'trade',
          title: 'Trade Pre-Approval',
          icon: 'trade',
          description: 'Form to get potential trades approved.'
        }, {
          value: 'exempt',
          title: 'Exempt Account Pre-Approval',
          icon: 'user',
          description: 'Form to get potential trades approved.'
        }
      ]
    }
    const formTypes = types[props.type]
    const onExit = () => router.push({
      name: 'FormLibraryEntry',
      query: {
        type: props.type,
        title: props.title
      }
    })
    const onContinue = () => {}

    return { onExit, onContinue, formTypes, form }
  }
}
</script>

<style lang="stylus" scoped>
.c-field
  :deep(.field-body)
    width: 50%
.t-header
  margin: 2.5em 0 1.25em 0
  color: #000
  .t-title
    font-weight: 500
  .t-sub
    font-size: 0.875em
.t-content
  margin-bottom: 2.5em
  :deep(.c-radio-card)
    gap: 0.75em
    .radio-card
      max-width: 17.25em
      .option
        flex-direction: column
        padding: 1.25em
        .icon
          width: 1.5em
          height: 1.5em
        .content
          font-size: 0.875em
          color: #000
          .title
            margin-bottom: 0.57em
            font-weight: 700
.t-action
  display: flex
  gap: 0.5em
</style>

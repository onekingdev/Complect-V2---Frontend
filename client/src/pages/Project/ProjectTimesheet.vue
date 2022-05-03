<template lang="pug">
card-container(:title="profile.type == 'specialist' ? 'My Timesheet' : 'Contract Timesheet'")
  template(#controls v-if="profile.type != 'specialist'")
    c-button(title="Log Time" type="primary" @click="toggleLogModal()" )
  template(#content)
    c-table(v-bind="{columns, documents}")
c-modal(title="Entry Details" v-model="isLogModalVisible")
  template(#content)
    p Date Created
    p {{ formatDate(form.created_on) }}
    .entry.grid-6(v-for="(entry, index) in form.entries")
      c-field(label="Description" placeholder="Describe the task" v-model="form.entries[index].description" :disabled="isEntry" :transparent="isEntry")
      c-field.col-3(label="Date" type="date"  v-model="form.entries[index].date" v-if="!isEntry")
      c-field.col-3(label="Date" v-model="form.entries[index].date" disabled transparent v-else)
      c-field.col-3(label="Hours" v-model="form.entries[index].hour" :disabled="isEntry" :transparent="isEntry")
      hr
    .summary-content
      c-button(title="Add Entry" iconL="circle_plus" @click="addEntry()" v-if="!isEntry")
      .total Total Due: ${{ form.entries.reduce( (sum, entry) => sum + entry.hour * 1 * proposals[0].hourlyRate, 0 ) }}
  template(#footer)
    c-button(title="Save as Draft" type="default" @click="draftTimeSheet()" v-if="!isEntry")
    c-button(title="Submit" type="primary" @click="submitTimeSheet()" v-if="!isEntry")
    c-button(title="Reject" type="default" @click="rejectTimeSheet(form._id)" v-if="isEntry && profile.type != 'specialist'")
    c-button(title="Approve" type="primary" @click="approveTimeSheet(form._id)" v-if="isEntry && profile.type != 'specialist'")
</template>
<script>
import cBanner from '~/components/Misc/cBanner.vue'
import { ref, onMounted, inject } from 'vue'
import useProfile from '~/store/Profile.js'
import cModal from '~/components/Misc/cModal.vue'
import cDropdown from '~/components/Inputs/cDropdown.vue'
import UseData from '~/store/Data.js'
import { formatDate } from '~/core/utils'
const documents = [
  {
    _id: '1234234234234',
    date: 1648688166644,
    created_on: 1648688166644,
    hour: 10,
    amount: 500,
    status: 'draft',
    entries: [
      {
        description: 'Submit Q2 13F',
        date: 1648688166644,
        hour: 5
      }, {
        description: 'Submit Q2 14F',
        date: 1648688166644,
        hour: 5
      }
    ]
  }, {
    _id: '12342342342324',
    date: 1648688166644,
    created_on: 1648688166644,
    hour: 12,
    amount: 600,
    status: 'accepted',
    entries: [
      {
        description: 'Submit Q2 13F',
        date: 1648688166644,
        hour: 6
      }, {
        description: 'Submit Q2 14F',
        date: 1648688166644,
        hour: 6
      }
    ]
  }, {
    _id: '12342342334234',
    date: 1648688166644,
    created_on: 1648688166644,
    hour: 12,
    amount: 600,
    status: 'rejected',
    entries: [
      {
        description: 'Submit Q2 13F',
        date: 1648688166644,
        hour: 6
      }, {
        description: 'Submit Q2 14F',
        date: 1648688166644,
        hour: 6
      }
    ]
  }, {
    _id: '12342434234234',
    date: 1648688166644,
    created_on: 1648688166644,
    hour: 12,
    amount: 600,
    status: 'completed',
    entries: [
      {
        description: 'Submit Q2 13F',
        date: 1648688166644,
        hour: 6
      }, {
        description: 'Submit Q2 14F',
        date: 1648688166644,
        hour: 6
      }
    ]
  }
]
export default {
  components: {
    cBanner,
    cModal,
    cDropdown
  },
  props: {
    projectDetail: {
      type: Object,
      required: true
    },
    reloadCollection: {
      type: Function,
      default: () => 1
    }
  },
  emits: ['update:projectDetail'],
  // eslint-disable-next-line max-lines-per-function
  setup (props) {
    const proposals = new UseData('proposals')
    const timesheet = new UseData('timesheet')
    const { profile } = useProfile()
    const notification = inject('notification')
    const form = ref({
      created_on: Date.now(),
      entries: [{
        description: '',
        date: '',
        hour: 0
      }]
    })
    const entryCount = ref(1)
    const isEntry = ref(false)
    const isLogModalVisible = ref(false)
    const toggleLogModal = () => {
      isEntry.value = false
      form.value = {
        created_on: Date.now(),
        entries: [{
          description: '',
          date: '',
          hour: 0
        }]
      }
      isLogModalVisible.value = !isLogModalVisible.value
    }
    const toggleEntryModal = id => {
      isEntry.value = true
      form.value = documents.find(doc => {
        let returnObj
        if (doc._id === id) {
          returnObj = doc
          for (let i = 0; i < returnObj.entries.length; i++) returnObj.entries[i].date = formatDate(returnObj.entries[i].date)
          return returnObj
        }
        return false
      })
      isLogModalVisible.value = !isLogModalVisible.value
    }
    const addEntry = () => {
      entryCount.value += 1
      form.value.entries.push({
        description: '',
        date: '',
        hour: 0
      })
    }
    const submitTimeSheet = () => {
      form.value.amount = 0
      form.value.hour = 0
      form.value.status = 'submitted'
      for (let i = 0; i < form.value.entries.length; i++) {
        form.value.amount += form.value.entries[i].hour * proposals.getDocuments().value[0].hourlyRate
        form.value.hour += form.value.entries[i].hour
      }
      try {
        timesheet.createDocuments([form.value])
        notification({
          type: 'success',
          title: 'Success',
          message: 'Timesheet has been submitted.'
        })
        isLogModalVisible.value = !isLogModalVisible.value
      } catch (error) {
        notification({
          type: 'error',
          title: 'Error',
          message: 'Timesheet has not been submitted. Please try again.'
        })
      }
    }
    const draftTimeSheet = () => {
      form.value.amount = 0
      form.value.status = 'draft'
      for (let i = 0; i < form.value.entries.length; i++) form.value.amount += form.value.entries[i].hour * proposals.getDocuments().value[0].hourlyRate
      try {
        timesheet.createDocuments([form.value])
        notification({
          type: 'success',
          title: 'Success',
          message: 'Timesheet has been saved.'
        })
        isLogModalVisible.value = !isLogModalVisible.value
      } catch (error) {
        notification({
          type: 'error',
          title: 'Error',
          message: 'Timesheet has not been saved. Please try again.'
        })
      }
    }
    const approveTimeSheet = id => {
      try {
        timesheet.updateDocument(id, { status: 'rejected' })
        notification({
          type: 'success',
          title: 'Success',
          message: 'Timesheet has been approved.'
        })
        isLogModalVisible.value = !isLogModalVisible.value
      } catch (error) {
        notification({
          type: 'error',
          title: 'Error',
          message: 'Timesheet has not been approved. Please try again.'
        })
      }
    }
    const rejectTimeSheet = id => {
      try {
        timesheet.updateDocument(id, { status: 'accepted' })
        notification({
          type: 'success',
          title: 'Success',
          message: 'Timesheet has been rejected.'
        })
        isLogModalVisible.value = !isLogModalVisible.value
      } catch (error) {
        notification({
          type: 'error',
          title: 'Error',
          message: 'Timesheet has not been rejected. Please try again.'
        })
      }
    }
    const specialistColumns = [
      { title: 'Date Created', key: 'created_on', cell: 'CellDate', unsortable: true }, { title: 'Status', key: 'status', cell: 'CellStatus', unsortable: true }, { title: 'Total Time', key: 'hour', cell: 'CellTitle', unsortable: true }, { title: 'Total Due', key: 'amount', cell: 'CellPrice', align: 'right', unsortable: true }
    ]
    const businessColumn = [
      { title: 'Date Submitted', key: 'created_on', cell: 'CellAction', unsortable: true, meta: { type: 'date', action: toggleEntryModal } }, { title: 'Status', key: 'status', cell: 'CellStatus', unsortable: true }, { title: 'Total Time', key: 'hour', cell: 'CellTitle', unsortable: true }, { title: 'Total Due', key: 'amount', cell: 'CellPrice', align: 'right', unsortable: true }
    ]
    // const documents = computed( () => records.getDocuments().value.filter( record => props.projectDetail.documents.indexOf( record._id ) > -1 ) );
    onMounted(() => proposals.readDocuments('', { job_id: props.projectDetail.jobId, status: 'accepted' }))
    return {
      columns: profile.value.type === 'business' ? businessColumn : specialistColumns,
      documents,
      isLogModalVisible,
      toggleLogModal,
      addEntry,
      formatDate,
      form,
      profile,
      submitTimeSheet,
      draftTimeSheet,
      approveTimeSheet,
      rejectTimeSheet,
      isEntry,
      proposals: proposals.getDocuments()
    }
  }
}
</script>
<style lang="stylus" scoped>
hr
  border-top: 1px solid var(--c-border)
  width: 100%
.summary-content
  display: flex
  flex-direction: row
  .total
    margin-left: auto

</style>

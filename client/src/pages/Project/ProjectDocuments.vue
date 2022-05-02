<template lang="pug">
card-container(title="Documents")
  template(#controls)
    c-dropdown(title="Actions")
      c-button(title="Upload File" modalTitle="Edit Project" type="transparent" @click="uploadRecord()")
      c-button(title="Select Existing" type="transparent" modalTitle="Remove Project" @click="toggleExistingModal()")
  template(#content)
    input(v-show="false" type="file" @change="onChange()" ref="fileInput")
    c-table(v-bind="{columns, documents}")
c-modal(title="Select File" v-model="isSelectFileVisible" wide)
  template(#content)
    c-table(v-bind="{columns, documents}")
  template(#footer)
    c-button(title="Add" type="primary" @click="addFile()")
</template>
<script>
import cBanner from '~/components/Misc/cBanner.vue'
import { ref, onMounted, inject, computed } from 'vue'
import useProfile from '~/store/Profile.js'
import cModal from '~/components/Misc/cModal.vue'
import cDropdown from '~/components/Inputs/cDropdown.vue'
import { manualApi } from '~/core/api.js'
import UseData from '~/store/Data.js'
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
  setup (props) {
    const records = new UseData('records')
    const projects = new UseData('projects')
    const { profile } = useProfile()
    const notification = inject('notification')
    const fileInput = ref(null)
    const loading = ref(false)
    const isSelectFileVisible = ref(false)
    const uploadRecord = () => fileInput.value.click()
    const toggleExistingModal = () => isSelectFileVisible.value = !isSelectFileVisible.value
    const handleClickDownload = async id => {
      try {
        const res = await manualApi({ method: 'GET', url: `records/zipDownload/${id}` })
        window.open(res.location, '_blank')
      } catch (error) {
        loading.value = false
        console.error(error)
        notification({ type: 'error', title: 'Error', message: 'Folder has not been downloaded. Please try again.' })
      }
    }
    const handleClickDelete = async id => {
      const allDocuments = props.projectDetail.documents.filter(docId => docId !== id) || []
      await projects.updateDocument(props.projectDetail.id, { documents: allDocuments })
      props.reloadCollection()
      const folderId = 'root'
      await records.readDocuments('', { folderId })
    }
    // eslint-disable-next-line max-statements
    const onChange = async () => {
      loading.value = true
      try {
        const file = fileInput.value.files[0]
        const formData = new FormData()
        const folderId = 'root'
        formData.append('file', file)
        formData.append('collection', 'records')
        formData.append('folderId', folderId)
        const uploadRes = await manualApi({ method: 'POST', url: 'upload', data: formData })
        const newFile = ref({
          name: file.name,
          status: 'file',
          owner: `${profile.value.firstName} ${profile.value.lastName}`,
          ownerId: profile.value.id,
          size: file.size,
          dateCreated: Date.now(),
          lastModified: Date.now(),
          link: uploadRes.Location,
          folderId,
          key: uploadRes.Key
        })
        await records.createDocuments(newFile.value)
        loading.value = false
        await records.readDocuments('', { folderId })
        const newDocument = records.getDocuments().value.find(record => record.name === file.name)
        const allDocuments = props.projectDetail.documents || []
        allDocuments.push(newDocument.id)
        await projects.updateDocument(props.projectDetail.id, { documents: allDocuments })
        props.reloadCollection()
        await records.readDocuments('', { folderId })
        notification({ type: 'success', title: 'Success', message: 'File has been uploaded..' })
      } catch (error) {
        loading.value = false
        console.error(error)
        notification({ type: 'error', title: 'Error', message: 'Folder has not been uploaded. Please try again.' })
      }
    }
    const columns = [
      { title: 'Name', key: 'name', cell: 'CellRecords', width: '55%' },
      { title: 'Owner', key: 'owner', cell: 'CellDefault' },
      { title: 'Size', key: 'size', cell: 'CellSize', align: 'right' },
      { title: 'Last Modified', key: 'lastModified', cell: 'CellDate', align: 'right' },
      {
        unsortable: true,
        cell: 'CellDropdown',
        width: '35px',
        meta: {
          actions: [
            { title: 'Download', action: handleClickDownload }, { title: 'Delete', action: handleClickDelete }
          ]
        }
      }
    ]
    const documents = computed(() => records.getDocuments().value.filter(record => props.projectDetail.documents.indexOf(record.id) > -1))
    onMounted(() => records.readDocuments())
    return {
      columns,
      documents,
      uploadRecord,
      fileInput,
      onChange,
      isSelectFileVisible,
      toggleExistingModal
    }
  }
}
</script>
<style lang="stylus" scoped>
.ind-collaborator
  display: flex
  padding-bottom: 0.7em
  border-bottom: 1px solid var(--c-border)
  .c-avatar
    margin-right: 0.5em
  .user-info
    .name
      font-size: 1.25em
      margin-top: 0.325em
  .action
    margin-left: auto
    display: flex
    gap: 0.5em
</style>

<template lang="pug">
.document-container
  card-container(title="Documents")
    template(#controls)
      input(v-show="false" type="file" @change="onChange()" ref="fileInput")
      c-dropdown(title="Upload" wide)
        c-button(title="Upload File" type="transparent" @click="uploadFile()")
        c-button(title="Select Existing" type="transparent" @click="selectExistingFile()")
    template(#content)
      c-table(v-bind="{columns, documents}")
</template>

<script>
import { ref } from 'vue'
import cDropdown from '~/components/Inputs/cDropdown.vue'
export default {
  components: { cDropdown },
  setup () {
    const documents = ref([])
    const fileInput = ref(null)

    const handleClickDownload = id => console.debug('Download Clicked!', id)
    const handleClickDelete = id => console.debug('Delete Clicked!', id)
    const uploadFile = () => fileInput.value.click()
    const selectExistingFile = () => console.debug('Select existing file button Clicked!')

    const onChange = () => {
      const file = fileInput.value.files[0]
      documents.value.push(file)
    }

    const columns = [
      {
        title: 'Name',
        key: 'name',
        cell: 'CellAssigned',
        width: '45%'
      },
      {
        title: 'Owner',
        key: 'owner',
        cell: 'CellAssigned'
      },
      {
        title: 'Size',
        key: 'size',
        cell: 'CellAssigned'
      },
      {
        title: 'Last Modified',
        key: 'lastModified',
        cell: 'CellDate'
      },
      {
        unsortable: true,
        cell: 'CellDropdown',
        meta: {
          actions: [
            { title: 'Download', action: handleClickDownload }, { title: 'Delete', action: handleClickDelete }
          ]
        }
      }
    ]

    return {
      columns,
      documents,
      fileInput,
      onChange,
      uploadFile,
      selectExistingFile
    }
  }
}
</script>

<style lang="stylus" scoped>
.document-container
  width: 82%
  margin: auto
</style>

import { manualApi, generateQuery } from '~/core/api'
import { ref } from 'vue'

export default class FileFolderService {
  constructor () {
    this.document = ref({})
    this.documents = ref([])
    this.documentJson = ref('')
  }

  getDocument () {
    return this.document
  }

  getDocuments () {
    return this.documents
  }

  async createDocument (data) {
    const doc = await manualApi({ method: 'POST', url: 'file_folders', data })
    this.documents.value.push(doc)
    return doc.id
  }

  async readDocuments (documentsId, query) {
    if (documentsId) {
      const doc = await manualApi({ method: 'GET', url: `file_folders/${documentsId}${generateQuery(query)}` })
      this.document.value = doc
      this.documentJson.value = JSON.stringify(this.document.value)
    } else {
      const docs = await manualApi({ method: 'GET', url: `file_folders${generateQuery(query)}` })
      this.documents.value = docs.folders
    }
  }

  async updateDocument (documentId, data) {
    const doc = await manualApi({ method: 'PATCH', url: `file_folders/${documentId}`, data })
    this.document.value = doc
    this.documentJson.value = JSON.stringify(this.document.value)
  }

  async deleteDocuments (documentId) {
    await manualApi({ method: 'DELETE', url: `file_folders/${documentId}` })
    this.document.value = {}
    this.documentJson.value = JSON.stringify(this.document.value)
  }

  async rootListTree () {
    const response = await manualApi({ method: 'GET', url: 'file_folders/root/list_tree' })
    return response
  }

  async folderListTree (documentId) {
    const response = await manualApi({ method: 'GET', url: `file_folders/${documentId}/list_tree` })
    return response
  }

  async checkZip (documentId) {
    const response = await manualApi({ method: 'GET', url: `file_folders/${documentId}/check_zip` })
    return response
  }

  async downloadFolder (documentId) {
    const response = await manualApi({ method: 'GET', url: `file_folders/${documentId}/download_folder` })
    return response
  }

  clearStore () {
    this.documents.value = []
    this.document.value = {}
  }
}

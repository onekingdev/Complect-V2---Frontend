import { manualApi } from '~/core/api'
import { ref } from 'vue'

export default class FileDocService {
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
    const doc = await manualApi({ method: 'POST', url: 'file_docs', data })
    this.documents.value.push(doc)
    return doc.id
  }

  async updateDocument (documentId, data) {
    const doc = await manualApi({ method: 'PATCH', url: `file_docs/${documentId}`, data })
    this.document.value = doc
    this.documentJson.value = JSON.stringify(this.document.value)
  }

  async deleteDocuments (documentId) {
    await manualApi({ method: 'DELETE', url: `file_docs/${documentId}` })
    this.document.value = {}
    this.documentJson.value = JSON.stringify(this.document.value)
  }

  clearStore () {
    this.documents.value = []
    this.document.value = {}
  }
}

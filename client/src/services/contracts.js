import { manualApi, generateQuery } from '~/core/api'
import { ref } from 'vue'

export default class ContractService {
  constructor (projectId) {
    this.document = ref({})
    this.documents = ref([])
    this.documentJson = ref('')
    this.projectId = projectId
  }

  getDocument () {
    return this.document
  }

  getDocuments () {
    return this.documents
  }

  async readDocuments (documentsId, query) {
    if (documentsId) {
      const doc = await manualApi({ method: 'GET', url: `projects/${this.projectId}/contracts/${documentsId}${generateQuery(query)}` })
      this.document.value = doc
      this.documentJson.value = JSON.stringify(this.document.value)
    } else {
      const docs = await manualApi({ method: 'GET', url: `projects/${this.projectId}/contracts${generateQuery(query)}` })
      this.documents.value = docs.contracts
    }
  }

  async hireProject (documentId, isComplete) {
    const doc = await manualApi({ method: 'POST', url: `projects/${this.projectId}/contracts/${documentId}/hire`, data: { completed: isComplete } })
    this.document.value = doc
    this.documentJson.value = JSON.stringify(this.document.value)
  }

  async rejectProject (documentId, isComplete) {
    const doc = await manualApi({ method: 'POST', url: `projects/${this.projectId}/contracts/${documentId}/reject`, data: { completed: isComplete } })
    this.document.value = doc
    this.documentJson.value = JSON.stringify(this.document.value)
  }

  setProjectId (projectId) {
    this.projectId = projectId
  }

  clearStore () {
    this.documents.value = []
    this.document.value = {}
  }
}

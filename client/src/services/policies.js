import { manualApi, generateQuery } from '~/core/api'
import { ref } from 'vue'

export default class PolicyService {
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
    const doc = await manualApi({ method: 'POST', url: 'policies', data })
    this.documents.value.push(doc.policy)
    return doc.policy.id
  }

  async readDocuments (documentsId, query) {
    if (documentsId) {
      const doc = await manualApi({ method: 'GET', url: `policies/${documentsId}${generateQuery(query)}` })
      this.document.value = doc.policy
      this.documentJson.value = JSON.stringify(this.document.value)
    } else {
      const docs = await manualApi({ method: 'GET', url: `policies${generateQuery(query)}` })
      this.documents.value = docs.policies
    }
  }

  async updateDocument (documentId, data) {
    const doc = await manualApi({ method: 'PUT', url: `policies/${documentId}`, data })
    this.document.value = doc.policy
    this.documentJson.value = JSON.stringify(this.document.value)
  }

  async deleteDocuments (documentId) {
    await manualApi({ method: 'DELETE', url: `policies/${documentId}` })
    this.document.value = {}
    this.documentJson.value = JSON.stringify(this.document.value)
  }

  async updatePosition (oldId, newId) {
    await manualApi({ method: 'POST', url: 'policies', data: { oldId, newId } })
    this.readDocuments()
  }

  async publishPolicy (documentId, data) {
    const doc = await manualApi({ method: 'POST', url: `policies/${documentId}/published`, data })
    this.document.value = doc.policy
    this.documentJson.value = JSON.stringify(this.document.value)
  }

  async archivePolicy (documentId, archived) {
    const doc = await manualApi({ method: 'POST', url: `policies/${documentId}/archived`, data: { archived } })
    this.document.value = doc.policy
    this.documentJson.value = JSON.stringify(this.document.value)
  }

  clearStore () {
    this.documents.value = []
    this.document.value = {}
  }
}

import { manualApi, generateQuery } from '~/core/api'
import { ref } from 'vue'

export default class RiskService {
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
    const doc = await manualApi({ method: 'POST', url: 'risks', data })
    this.documents.value.push(doc.risk)
    return doc.risk.id
  }

  async readDocuments (documentsId, query) {
    if (documentsId) {
      const doc = await manualApi({ method: 'GET', url: `risks/${documentsId}${generateQuery(query)}` })
      this.document.value = doc.risk
      this.documentJson.value = JSON.stringify(this.document.value)
    } else {
      const docs = await manualApi({ method: 'GET', url: `risks${generateQuery(query)}` })
      this.documents.value = docs.risks
    }
  }

  async updateDocument (documentId, data) {
    const doc = await manualApi({ method: 'PUT', url: `risks/${documentId}`, data })
    this.document.value = doc.risk
    this.documentJson.value = JSON.stringify(this.document.value)
  }

  async deleteDocuments (documentId) {
    await manualApi({ method: 'DELETE', url: `risks/${documentId}` })
    this.document.value = {}
    this.documentJson.value = JSON.stringify(this.document.value)
  }

  clearStore () {
    this.documents.value = []
    this.document.value = {}
  }
}

import { manualApi, generateQuery } from '~/core/api'
import { ref } from 'vue'

export default class WorkExperienceService {
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
    const doc = await manualApi({ method: 'POST', url: 'work_experiences', data })
    this.documents.value.push(doc.work_experience)
    return doc.work_experience.id
  }

  async readDocuments (documentsId, query) {
    if (documentsId) {
      const doc = await manualApi({ method: 'GET', url: `work_experiences/${documentsId}${generateQuery(query)}` })
      this.document.value = doc.work_experience
      this.documentJson.value = JSON.stringify(this.document.value)
    } else {
      const docs = await manualApi({ method: 'GET', url: `work_experiences${generateQuery(query)}` })
      this.documents.value = docs.work_experiences
    }
  }

  async updateDocument (documentId, data) {
    const doc = await manualApi({ method: 'PUT', url: `work_experiences/${documentId}`, data })
    this.document.value = doc.work_experience
    this.documentJson.value = JSON.stringify(this.document.value)
  }

  async deleteDocuments (documentId) {
    await manualApi({ method: 'DELETE', url: `work_experiences/${documentId}` })
    this.document.value = {}
    this.documentJson.value = JSON.stringify(this.document.value)
  }

  clearStore () {
    this.documents.value = []
    this.document.value = {}
  }
}

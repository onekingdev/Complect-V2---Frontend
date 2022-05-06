import { manualApi, generateQuery } from '~/core/api'
import { ref } from 'vue'

export default class JobPostingService {
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

  async createDocument (data) {
    const api_url = this.projectId ? `projects/${this.projectId}/job_postings` : 'job_postings'
    const doc = await manualApi({ method: 'POST', url: api_url, data })
    this.documents.value.push(doc)
    return doc.id
  }

  async readDocuments (documentsId, query) {
    const api_url = this.projectId ? `projects/${this.projectId}/job_postings` : 'job_postings'
    if (documentsId) {
      const doc = await manualApi({ method: 'GET', url: `${api_url}/${documentsId}${generateQuery(query)}` })
      this.document.value = doc
      this.documentJson.value = JSON.stringify(this.document.value)
    } else {
      const docs = await manualApi({ method: 'GET', url: `${api_url}${generateQuery(query)}` })
      this.documents.value = docs.job_postings
    }
  }

  async readMarketDocuments (query) {
    const docs = await manualApi({ method: 'GET', url: `marketplace${generateQuery(query)}` })
    this.documents.value = docs.job_postings
  }

  async updateDocument (documentId, data) {
    const api_url = this.projectId ? `projects/${this.projectId}/job_postings` : 'job_postings'
    const doc = await manualApi({ method: 'PUT', url: `${api_url}/${documentId}`, data })
    this.document.value = doc
    this.documentJson.value = JSON.stringify(this.document.value)
  }

  async deleteDocuments (documentId) {
    const api_url = this.projectId ? `projects/${this.projectId}/job_postings` : 'job_postings'
    await manualApi({ method: 'DELETE', url: `${api_url}/${documentId}` })
    this.document.value = {}
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

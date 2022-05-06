import { manualApi, generateQuery } from '~/core/api'
import { ref } from 'vue'

export default class ProposalService {
  constructor (jobId) {
    this.document = ref({})
    this.documents = ref([])
    this.documentJson = ref('')
    this.jobId = jobId
  }

  getDocument () {
    return this.document
  }

  getDocuments () {
    return this.documents
  }

  async readDocuments (documentsId, query) {
    if (documentsId) {
      const doc = await manualApi({ method: 'GET', url: `job_postings/${this.jobId}/contracts/${documentsId}${generateQuery(query)}` })
      this.document.value = doc
      this.documentJson.value = JSON.stringify(this.document.value)
    } else {
      const docs = await manualApi({ method: 'GET', url: `job_postings/${this.jobId}/contracts${generateQuery(query)}` })
      this.documents.value = docs.contracts
    }
  }

  async createDocument (data) {
    const doc = await manualApi({ method: 'POST', url: `job_postings/${this.jobId}/contracts`, data })
    this.documents.value.push(doc)
    return doc.id
  }

  async updateDocument (documentId, data) {
    const doc = await manualApi({ method: 'PATCH', url: `job_postings/${this.jobId}/contracts/${documentId}`, data })
    this.document.value = doc
    this.documentJson.value = JSON.stringify(this.document.value)
  }

  setJobId (jobId) {
    this.jobId = jobId
  }

  clearStore () {
    this.documents.value = []
    this.document.value = {}
  }
}

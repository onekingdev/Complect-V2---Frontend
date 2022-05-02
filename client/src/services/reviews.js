import { manualApi, generateQuery } from '~/core/api'
import { ref } from 'vue'

export default class ReviewService {
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
    const doc = await manualApi({ method: 'POST', url: 'internal_reviews', data })
    this.documents.value.push(doc.internal_review)
    return doc.internal_review.id
  }

  async readDocuments (documentsId, query) {
    if (documentsId) {
      const doc = await manualApi({ method: 'GET', url: `internal_reviews/${documentsId}${generateQuery(query)}` })
      this.document.value = doc.internal_review
      this.documentJson.value = JSON.stringify(this.document.value)
    } else {
      const docs = await manualApi({ method: 'GET', url: `internal_reviews${generateQuery(query)}` })
      this.documents.value = docs.reviews
    }
  }

  async updateDocument (documentId, data) {
    const doc = await manualApi({ method: 'PUT', url: `internal_reviews/${documentId}`, data })
    this.document.value = doc.internal_review
    this.documentJson.value = JSON.stringify(this.document.value)
  }

  async deleteDocuments (documentId) {
    await manualApi({ method: 'DELETE', url: `internal_reviews/${documentId}` })
    this.document.value = {}
    this.documentJson.value = JSON.stringify(this.document.value)
  }

  async completeReview (documentId, isComplete) {
    const doc = await manualApi({ method: 'POST', url: `internal_reviews/${documentId}/completed`, data: { completed: isComplete } })
    this.document.value = doc.internal_review
    this.documentJson.value = JSON.stringify(this.document.value)
  }

  clearStore () {
    this.documents.value = []
    this.document.value = {}
  }
}

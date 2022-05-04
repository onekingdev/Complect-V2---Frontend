import { manualApi } from '~/core/api'

const getRiskReports = async data => {
  const docs = await manualApi({ method: 'GET', url: 'reports/risk' })
  return docs
}

export { getRiskReports }

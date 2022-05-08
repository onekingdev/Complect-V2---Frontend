import { manualApi } from '~/core/api'

const getRegulatoryBodies = async data => {
  const docs = await manualApi({ method: 'GET', url: 'regulatory_bodies' })
  return docs
}
const getSkills = async data => {
  const docs = await manualApi({ method: 'GET', url: 'skills' })
  return docs
}
const getMisc = async data => {
  const docs = await manualApi({ method: 'GET', url: 'misc' })
  return docs
}

export { getRegulatoryBodies, getSkills, getMisc }

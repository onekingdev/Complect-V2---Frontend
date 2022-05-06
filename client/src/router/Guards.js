import useProfile from '~/store/Profile.js'
import useBusiness from '~/store/Business'
// import { restoreSession } from "~/core/restore.js"; // temp
import useAuth from '~/core/auth.js'

const { profile } = useProfile()
const { business, isBusiness } = useBusiness()

const isOnboarded = () => {
  if (business && business.value?.owner) return business.value?.onboarding_passed
  return profile.value?.onboarding_passed
}

const useAuthGuard = async (to, from, next) => {
  try {
    const { restoreSession } = useAuth()
    await restoreSession()
    next()
  } catch (error) {
    next({ name: 'AuthSignIn' })
  }
}

const useOnboardingGuard = (to, from, next) => {
  if (isOnboarded()) next({ name: 'Dashboard' })
  else next()
}

const useNotOnboardedGuard = (to, from, next) => {
  if (isOnboarded()) next()
  else next({ name: 'OnboardingForm', query: { step: 1 } })
}

const businessPagesGuard = (to, from, next) => {
  if (isBusiness) next()
  else next({ name: 'ErrorLayer' })
}

export { useAuthGuard, useOnboardingGuard, useNotOnboardedGuard, businessPagesGuard }

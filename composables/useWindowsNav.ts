import { storeToRefs } from 'pinia'
import { useComponentStore } from '~/stores/component.store'
import { CandidateForm } from '~/utils/types'

export const useOnboarding = () => {
    const componentStore = useComponentStore()
    const { onBoarding } = storeToRefs(componentStore)
    return onBoarding
}

export const useCandidateForms = () => {
    const componentStore = useComponentStore()
    const { candidateForms } = storeToRefs(componentStore)
    return candidateForms
}

export const useWindowsNav = () => {
    const componentStore = useComponentStore()

    const next = () => componentStore.onBoardingNext()
    const prev = () => componentStore.onBoardingPrev()

    return { next, prev }
}

import { storeToRefs } from 'pinia'
import { useComponentStore } from '~/stores/component.store'

export const useOnboarding = () => {
    const componentStore = useComponentStore()
    const { onBoarding } = storeToRefs(componentStore)
    return onBoarding
}

export const useHandlerHashing = () => {
    const componentStore = useComponentStore()
    const { candidateForms, onBoarding } = storeToRefs(componentStore)
    const router = useRouter()
    const route = useRoute()

    const initHash = (hash: string) => {
        if (!hash) {
            const formSectionSelected = findFormSectionByOnBording(onBoarding.value)
            router.push({ hash: `/#${formSectionSelected?.hash}` })
        } else {
            //go to formsection by hash
            const formSectionSelected = findFormSectionByHash(hash)
            if (formSectionSelected) {
                onBoarding.value = formSectionSelected.id
            }
        }
    }

    const findFormSectionByOnBording = (onBoarding: number) => {
        const formSectionSelected = candidateForms.value.find((item: any) => item.id == onBoarding)
        return formSectionSelected
    }

    const findFormSectionByHash = (hash: string) => {
        let hashStr = hash.split('#')[1]
        const formSectionSelected = candidateForms.value.find((item: any) => item.hash == hashStr)
        return formSectionSelected
    }

    watch(onBoarding, (value) => {
        const formSectionSelected = findFormSectionByOnBording(value)
        router.push({ hash: `/#${formSectionSelected?.hash}` })
    })

    onUpdated(() => {
        initHash(route.hash)
    })

    onMounted(() => {
        initHash(route.hash)
    })

    return { initHash, findFormSectionByHash, findFormSectionByOnBording }
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

import { useComponentStore } from '~/stores/component.store'

export const useLoadingCandidateCard = (id: number) => {
    const componentStore = useComponentStore()
    onMounted(() => {
        componentStore.updateLoadingCandidateForm(id)
    })
}

export const usePageLoading = () => {
    const loading = useState<boolean>('loading', () => true)
    return { loading }
}

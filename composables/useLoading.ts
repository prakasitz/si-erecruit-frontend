import { useComponentStore } from '~/stores/component.store'
import { CandidateForm } from '~/utils/types'

export const useLoadingCandidateCard = (id: number) => {
    const componentStore = useComponentStore()
    onMounted(() => {
        componentStore.updateLoadingCandidateForm(id)
    })
}

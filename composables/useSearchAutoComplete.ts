import { MasterProvince } from '~/utils/types'

export const useSearchAutoComplete = (items: any[], searchProp: string, defaultShowItems: number = 0) => {
    const search = ref()
    const select = ref()
    const loading = ref(false)
    const searchItems = ref([] as Array<MasterProvince>)
    const length = ref(defaultShowItems)

    if(defaultShowItems > 0) {
        searchItems.value = items.slice(0, length.value)
    }

    const querySelections = (v: any) => {
        loading.value = true
        // Simulated ajax query

        setTimeout(() => {
            console.log('querySelections', items)
            searchItems.value = items.filter((item: any) => {
                return (item || '')[searchProp].toLowerCase().indexOf((v || '').toLowerCase()) > -1
            })
            loading.value = false
        }, 1000)
    }

    watch(search, (val) => {
        return val && val !== select && querySelections(val)
    })

    return { search, select, loading, searchItems }
}

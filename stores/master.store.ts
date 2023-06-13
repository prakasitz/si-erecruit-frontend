import { MasterProvince, MasterTitleConferred } from "~/utils/types"

export const useMasterDataStore = defineStore('master', {
    state: () => {
        return {
            provinces: [] as MasterProvince[],
            title_conferends: [] as MasterTitleConferred[]
        }
    },
    actions: {},
})

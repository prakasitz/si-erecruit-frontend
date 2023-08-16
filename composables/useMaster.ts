import { JSONResponse } from '~/utils/types'

import { MasterState, useMasterDataStore } from '~/stores/master.store'
import { StateTree, Store, StoreDefinition, StoreGeneric } from 'pinia'

export default function useMaster() {
    return {
        loadMasterData,
        fetchProvince,
        fetchBlood,
        fetchCertificate,
        fetchInstitute,
        fetchLevel,
        fetchMajor,
        fetchMaritalSatatus,
        fetchPosition,
        fetchCountryRace,
        fetchReligion,
        fetchMilitary,
        fetchTitle,
        fetchTitleEN,
        fetchTitleTH,
        fetchTitleMilitary,
        fetchTitleSpecial,
        fetchTitleAcademic,
        fetchTitleConferred,
    }
}

type MasterStore = Store<'master-data', MasterState, any, any>

async function fetchProvince() {
    const cache = useNuxtData('master/province')
    const refObj = {
        data: ref() as Ref<any>,
        pending: ref(false),
        error: ref() as Ref<any>,
    }
    if (cache.data.value) {
        refObj.data = cache.data
    } else {
        const { data, pending, error } = useFetch('/api/external/master/province', {
            method: 'GET',
            key: 'master/province',
        })
        refObj.data = data
        refObj.pending = pending
        refObj.error = error
    }
    return refObj
}

async function fetchMaritalSatatus() {
    const cache = useNuxtData('master/marital-status')
    const refObj = {
        data: ref() as Ref<any>,
        pending: ref(false),
        error: ref() as Ref<any>,

    }
    if (cache.data.value) {
        refObj.data = cache.data
    } else {
        const { data, pending, error } = useFetch('/api/external/master/marital-status', {
            method: 'GET',
            key: 'master/marital-status',
        })
        refObj.data = data
        refObj.pending = pending
        refObj.error = error
    }
    return refObj
}

async function fetchBlood() {
    const cache = useNuxtData('master/blood')
    const refObj = {
        data: ref() as Ref<any>,
        pending: ref(false),
        error: ref() as Ref<any>,

    }
    if (cache.data.value) {
        refObj.data = cache.data
    } else {
        const { data, pending, error } = useFetch('/api/external/master/blood', {
            method: 'GET',
            key: 'master/blood',
        })
        refObj.data = data
        refObj.pending = pending
        refObj.error = error
    }
    return refObj
}

async function fetchReligion() {
    const cache = useNuxtData('master/religion')
    const refObj = {
        data: ref() as Ref<any>,
        pending: ref(false),
        error: ref() as Ref<any>,

    }
    if (cache.data.value) {
        refObj.data = cache.data
    } else {
        const { data, pending, error } = useFetch('/api/external/master/religion', {
            method: 'GET',
            key: 'master/religion',
        })
        refObj.data = data
        refObj.pending = pending
        refObj.error = error
    }
    return refObj
}

async function fetchCountryRace() {
    const cache = useNuxtData('master/country-race')
    const refObj = {
        data: ref() as Ref<any>,
        pending: ref(false),
        error: ref() as Ref<any>,

    }
    if (cache.data.value) {
        refObj.data = cache.data
    } else {
        const { data, pending, error } = useFetch('/api/external/master/country-race', {
            method: 'GET',
            key: 'master/country-race',
        })
        refObj.data = data
        refObj.pending = pending
        refObj.error = error
    }
    return refObj
}

async function fetchTitle() {
    const cache = useNuxtData('master/title')
    const refObj = {
        data: ref() as Ref<any>,
        pending: ref(false),
        error: ref() as Ref<any>,
    }
    if (cache.data.value) {
        refObj.data = cache.data
    } else {
        const { data, pending, error } = useFetch('/api/external/master/title', {
            method: 'GET',
            key: 'master/title',
        })
        refObj.data = data
        refObj.pending = pending
        refObj.error = error
    }
    return refObj
}

async function fetchTitleTH() {
    const cache = useNuxtData('master/titleTH')
    const refObj = {
        data: ref() as Ref<any>,
        pending: ref(false),
        error: ref() as Ref<any>,
    }
    if (cache.data.value) {
        refObj.data = cache.data
    } else {
        const { data, pending, error } = useFetch('/api/external/master/titleTH', {
            method: 'GET',
            key: 'master/titleTH',
        })
        refObj.data = data
        refObj.pending = pending
        refObj.error = error
    }
    return refObj
}

async function fetchTitleEN() {
    const cache = useNuxtData('master/titleEN')
    const refObj = {
        data: ref() as Ref<any>,
        pending: ref(false),
        error: ref() as Ref<any>,
    }
    if (cache.data.value) {
        refObj.data = cache.data
    } else {
        const { data, pending, error } = useFetch('/api/external/master/titleEN', {
            method: 'GET',
            key: 'master/titleEN',
        })
        refObj.data = data
        refObj.pending = pending
        refObj.error = error
    }
    return refObj
}

async function fetchTitleAcademic() {
    const cache = useNuxtData('master/title-academic')
    const refObj = {
        data: ref() as Ref<any>,
        pending: ref(false),
        error: ref() as Ref<any>,

    }
    if (cache.data.value) {
        refObj.data = cache.data
    } else {
        const { data, pending, error } = useFetch('/api/external/master/title-academic', {
            method: 'GET',
            key: 'master/title-academic',
        })
        refObj.data = data
        refObj.pending = pending
        refObj.error = error
    }
    return refObj
}

async function fetchTitleSpecial() {
    const cache = useNuxtData('master/title-special')
    const refObj = {
        data: ref() as Ref<any>,
        pending: ref(false),
        error: ref() as Ref<any>,

    }

    if (cache.data.value) {
        refObj.data = cache.data
    } else {
        const { data, pending, error } = useFetch('/api/external/master/title-special', {
            method: 'GET',
            key: 'master/title-special',
        })

        refObj.data = data
        refObj.pending = pending
    }
    return refObj
}

async function fetchTitleConferred() {
    const cache = useNuxtData('master/title-conferred')
    const refObj = {
        data: ref() as Ref<any>,
        pending: ref(false),
        error: ref() as Ref<any>,

    }

    if (cache.data.value) {
        refObj.data = cache.data
    } else {
        const { data, pending, error } = useFetch('/api/external/master/title-conferred', {
            method: 'GET',
            key: 'master/title-conferred',
        })
        refObj.data = data
        refObj.pending = pending
    }

    return refObj
}

async function fetchTitleMilitary() {
    const cache = useNuxtData('master/title-military')
    const refObj = {
        data: ref() as Ref<any>,
        pending: ref(false),
        error: ref() as Ref<any>,

    }

    if (cache.data.value) {
        refObj.data = cache.data
    } else {
        const { data, pending, error } = useFetch('/api/external/master/title-military', {
            method: 'GET',
            key: 'master/title-military',
        })
        refObj.data = data
        refObj.pending = pending
    }
    return refObj
}

async function fetchMilitary(mStore: MasterStore) {
    const response = await useApi('/master-data/military', {
        method: 'GET',
        callback: (responseStatus: boolean) => {
            mStore.$state.isLoaded.military = responseStatus
        },
    })
    mStore.setMilitary(response.data.value)
    return response
}

async function fetchLevel() {
    const cache = useNuxtData('master/level')
    const refObj = {
        data: ref() as Ref<any>,
        pending: ref(false),
    }

    if (cache.data.value) {
        refObj.data = cache.data
    } else {
        const { data, pending, error } = await useFetch('/api/external/master/level', {
            method: 'GET',
            key: 'master/level',
        })
        refObj.data = data
        refObj.pending = pending
    }
    return refObj
}

async function fetchCertificate(mStore: MasterStore) {
    console.log('fetchCertificate')
    const response = await useApi('/master-data/certificate', {
        method: 'GET',
        callback: (responseStatus: boolean) => {
            mStore.$state.isLoaded.certificates = responseStatus
        },
    })
    mStore.setCertificate(response.data.value)
    return response
}

async function fetchMajor(mStore: MasterStore) {
    console.log('fetchMajor')

    const response = await useApi('/master-data/major', {
        method: 'GET',
        callback: (responseStatus: boolean) => {
            mStore.$state.isLoaded.majors = responseStatus
        },
    })
    mStore.setMajor(response.data.value)
    return response
}

async function fetchInstitute(mStore: MasterStore) {
    const response = await useApi('/master-data/institute', {
        method: 'GET',
        callback: (responseStatus: boolean) => {
            mStore.$state.isLoaded.institutes = responseStatus
        },
    })
    mStore.setInstitute(response.data.value)
    return response
}

async function fetchPosition() {
    const cache = useNuxtData('master/position')
    const refObj = {
        data: ref() as Ref<any>,
        pending: ref(false),
        error: ref() as Ref<any>,
    }

    if (cache.data.value) {
        refObj.data = cache.data
    } else {
        const { data, pending, error } = useFetch('/api/external/master/position', {
            method: 'GET',
            key: 'master/position',
        })
        refObj.data = data
        refObj.pending = pending
        refObj.error = error
    }
    return refObj
}

async function loadMasterData() {
    const store = (await useMasterDataStore()) as any
    try {
        // await fetchCertificate(store)
        // await fetchInstitute(store)
        // await fetchLevel(store)
        // await fetchMajor(store)
        // await fetchPosition(store)
        // await fetchRace(store)
        // await fetchReligion(store)
        // await fetchMaritalSatatus(store)
        // await fetchBlood(store)
        // await fetchTitle(store)
        // await fetchTitleSpecial(store)
        // await fetchTitleAcademic(store)
        // await fetchTitleConferred(store)
        // await fetchTitleMilitary(store)
        // await fetchTitleTH(store)
        // await fetchTitleEN(store)
        // await fetchMilitary(store)
        // await fetchProvince(store)
    } catch (error: any) {
        showError({ statusCode: 500, statusMessage: error.message })
    }
}

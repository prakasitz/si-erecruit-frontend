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
        fetchRace,
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
        provinceData: ref() as Ref<any>,
        provincePending: ref(false),
        provinceError: ref() as Ref<any>,
    }
    if (cache.data.value) {
        refObj.provinceData = cache.data
    } else {
        const { data, pending, error } = useFetch('/api/external/master/province', {
            method: 'GET',
            key: 'master/province',
        })
        refObj.provinceData = data
        refObj.provincePending = pending
        refObj.provinceError = error
    }
    return refObj
}

async function fetchMaritalSatatus() {
    const cache = useNuxtData('master/marital-status')
    const refObj = {
        mStatusData: ref() as Ref<any>,
        mStatusPending: ref(false),
        mStatusError: ref() as Ref<any>,
    }
    if (cache.data.value) {
        refObj.mStatusData = cache.data
    } else {
        const { data, pending, error } = useFetch('/api/external/master/marital-status', {
            method: 'GET',
            key: 'master/marital-status',
        })
        refObj.mStatusData = data
        refObj.mStatusPending = pending
        refObj.mStatusError = error
    }
    return refObj
}

async function fetchBlood() {
    const cache = useNuxtData('master/blood')
    const refObj = {
        bloodData: ref() as Ref<any>,
        bloodPending: ref(false),
        bloodError: ref() as Ref<any>,
    }
    if (cache.data.value) {
        refObj.bloodData = cache.data
    } else {
        const { data, pending, error } = useFetch('/api/external/master/blood', {
            method: 'GET',
            key: 'master/blood',
        })
        refObj.bloodData = data
        refObj.bloodPending = pending
        refObj.bloodError = error
    }
    return refObj
}

async function fetchTitle() {
    const cache = useNuxtData('master/title')
    const refObj = {
        tData: ref() as Ref<any>,
        tPending: ref(false),
        tError: ref() as Ref<any>,
    }
    if (cache.data.value) {
        refObj.tData = cache.data
    } else {
        const { data, pending, error } = useFetch('/api/external/master/title', {
            method: 'GET',
            key: 'master/title',
        })
        refObj.tData = data
        refObj.tPending = pending
        refObj.tError = error
    }
    return refObj
}

async function fetchTitleTH() {
    const cache = useNuxtData('master/titleTH')
    const refObj = {
        tTHData: ref() as Ref<any>,
        tTHPending: ref(false),
        tTHError: ref() as Ref<any>,
    }
    if (cache.data.value) {
        refObj.tTHData = cache.data
    } else {
        const { data, pending, error } = useFetch('/api/external/master/titleTH', {
            method: 'GET',
            key: 'master/titleTH',
        })
        refObj.tTHData = data
        refObj.tTHPending = pending
        refObj.tTHError = error
    }
    return refObj
}

async function fetchTitleEN() {
    const cache = useNuxtData('master/titleEN')
    const refObj = {
        tENData: ref() as Ref<any>,
        tENPending: ref(false),
        tENError: ref() as Ref<any>,
    }
    if (cache.data.value) {
        refObj.tENData = cache.data
    } else {
        const { data, pending, error } = useFetch('/api/external/master/titleEN', {
            method: 'GET',
            key: 'master/titleEN',
        })
        refObj.tENData = data
        refObj.tENPending = pending
        refObj.tENError = error
    }
    return refObj
}

async function fetchTitleAcademic() {
    const cache = useNuxtData('master/title-academic')
    const refObj = {
        tAcademicData: ref() as Ref<any>,
        tAcademicPending: ref(false),
        tAcademicError: ref() as Ref<any>,
    }
    if (cache.data.value) {
        refObj.tAcademicData = cache.data
    } else {
        const { data, pending, error } = useFetch('/api/external/master/title-academic', {
            method: 'GET',
            key: 'master/title-academic',
        })
        refObj.tAcademicData = data
        refObj.tAcademicPending = pending
        refObj.tAcademicError = error
    }
    return refObj
}

async function fetchTitleSpecial() {
    const cache = useNuxtData('master/title-special')
    const refObj = {
        tSpecialData: ref() as Ref<any>,
        tSpecialPending: ref(false),
    }

    if (cache.data.value) {
        refObj.tSpecialData = cache.data
    } else {
        const { data, pending, error } = useFetch('/api/external/master/title-special', {
            method: 'GET',
            key: 'master/title-special',
        })

        refObj.tSpecialData = data
        refObj.tSpecialPending = pending
    }
    return refObj
}

async function fetchTitleConferred() {
    const cache = useNuxtData('master/title-conferred')
    const refObj = {
        tConferredData: ref() as Ref<any>,
        tConferredPending: ref(false),
    }

    if (cache.data.value) {
        refObj.tConferredData = cache.data
    } else {
        const { data, pending, error } = useFetch('/api/external/master/title-conferred', {
            method: 'GET',
            key: 'master/title-conferred',
        })
        refObj.tConferredData = data
        refObj.tConferredPending = pending
    }

    return refObj
}

async function fetchTitleMilitary() {
    const cache = useNuxtData('master/title-military')
    const refObj = {
        tMilitaryData: ref() as Ref<any>,
        tMilitaryPending: ref(false),
    }

    if (cache.data.value) {
        refObj.tMilitaryData = cache.data
    } else {
        const { data, pending, error } = useFetch('/api/external/master/title-military', {
            method: 'GET',
            key: 'master/title-military',
        })
        refObj.tMilitaryData = data
        refObj.tMilitaryPending = pending
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

async function fetchReligion(mStore: MasterStore) {
    const response = await useApi('/master-data/religion', {
        method: 'GET',
        callback: (responseStatus: boolean) => {
            mStore.$state.isLoaded.religions = responseStatus
        },
    })
    mStore.setReligion(response.data.value)
    return response
}

async function fetchLevel(mStore: MasterStore) {
    const response = await useApi('/master-data/level', {
        method: 'GET',
        callback: (responseStatus: boolean) => {
            mStore.$state.isLoaded.levels = responseStatus
        },
    })
    mStore.setLevel(response.data.value)
    return response
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

async function fetchRace(mStore: MasterStore) {
    const response = await useApi('/master-data/race', {
        method: 'GET',
        callback: (responseStatus: boolean) => {
            mStore.$state.isLoaded.races = responseStatus
        },
    })
    mStore.setRace(response.data.value)
    return response
}

async function fetchPosition(mStore: MasterStore) {
    const response = await useApi('/master-data/position', {
        method: 'GET',
        callback: (responseStatus: boolean) => {
            mStore.$state.isLoaded.positions = responseStatus
        },
    })
    mStore.setPosition(response.data.value)
    return response
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

import { JSONResponse } from '~/utils/types'

import { MasterState, useMasterDataStore } from '~/stores/master.store'
import { StateTree, Store, StoreDefinition, StoreGeneric } from 'pinia'

export default function useMaster() {
    return {
        loadMasterData,
        fetchProvince,
        fetchTitleConferred,
        fetchBlood,
        fetchCertificate,
        fetchInstitute,
        fetchLevel,
        fetchMajor,
        fetchMaritalSatatus,
        fetchPosition,
        fetchRace,
        fetchReligion,
        fetchTitle,
        fetchTitleEN,
        fetchTitleTH,
        fetchTitleMilitary,
        fetchTitleSpecial,
    }
}

type MasterStore = Store<'master-data', MasterState, any, any>

async function fetchProvince(mStore: MasterStore) {
    const response = await useApi('/master-data/province', {
        method: 'GET',
        callback: (responseStatus: boolean) => {
            mStore.$state.isLoaded.provinces = responseStatus
        },
    })
    mStore.setProvince(response.data.value)
    return response
}

async function fetchMaritalSatatus(mStore: MasterStore) {
    const response = await useApi('/master-data/marital-status', {
        method: 'GET',
        callback: (responseStatus: boolean) => {
            mStore.$state.isLoaded.marital_status = responseStatus
        },
    })
    mStore.setMaritalStatus(response.data.value)
    return response
}

async function fetchBlood(mStore: MasterStore) {
    const response = await useApi('/master-data/blood', {
        method: 'GET',
        callback: (responseStatus: boolean) => {
            mStore.$state.isLoaded.blood = responseStatus
        },
    })
    mStore.setBlood(response.data.value)
    return response
}

async function fetchTitle(mStore: MasterStore) {
    const response = await useApi('/master-data/title', {
        method: 'GET',
        callback: (responseStatus: boolean) => {
            mStore.$state.isLoaded.title = responseStatus
        },
    })
    mStore.setTitle(response.data.value)
    return response
}

async function fetchTitleAcademic(mStore: MasterStore) {
    const response = await useApi('/master-data/title-academic', {
        method: 'GET',
        callback: (responseStatus: boolean) => {
            mStore.$state.isLoaded.title_academics = responseStatus
        },
    })
    mStore.setTitleAcademic(response.data.value)
    return response
}

async function fetchTitleSpecial(mStore: MasterStore) {
    const response = await useApi('/master-data/title-special', {
        method: 'GET',
        callback: (responseStatus: boolean) => {
            mStore.$state.isLoaded.title_specials = responseStatus
        },
    })
    mStore.setTitleSpecial(response.data.value)
    return response
}

async function fetchTitleConferred(mStore: MasterStore) {
    const response = await useApi('/master-data/title-conferred', {
        method: 'GET',
        callback: (responseStatus: boolean) => {
            mStore.$state.isLoaded.title_conferrends = responseStatus
        },
    })
    mStore.setTitleConferrend(response.data.value)
    return response
}

async function fetchTitleMilitary(mStore: MasterStore) {
    const response = await useApi('/master-data/title-military', {
        method: 'GET',
        callback: (responseStatus: boolean) => {
            mStore.$state.isLoaded.title_military = responseStatus
        },
    })
    mStore.setTitleMilitary(response.data.value)
    return response
}

async function fetchTitleTH(mStore: MasterStore) {
    const response = await useApi('/master-data/titleTH', {
        method: 'GET',
        callback: (responseStatus: boolean) => {
            mStore.$state.isLoaded.titleTH = responseStatus
        },
    })
    mStore.setTitleTH(response.data.value)
    return response
}

async function fetchTitleEN(mStore: MasterStore) {
    const response = await useApi('/master-data/titleEN', {
        method: 'GET',
        callback: (responseStatus: boolean) => {
            mStore.$state.isLoaded.titleEN = responseStatus
        },
    })
    mStore.setTitleEN(response.data.value)
    return response
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
        await fetchCertificate(store)
        await fetchInstitute(store)
        await fetchLevel(store)
        await fetchMajor(store)
        await fetchPosition(store)
        await fetchRace(store)
        await fetchReligion(store)

        await fetchMaritalSatatus(store)
        await fetchBlood(store)

        await fetchTitle(store)
        await fetchTitleSpecial(store)
        await fetchTitleAcademic(store)
        await fetchTitleConferred(store)
        await fetchTitleMilitary(store)
        await fetchTitleTH(store)
        await fetchTitleEN(store)

        await fetchMilitary(store)

        await fetchProvince(store)
    } catch (error: any) {
        showError({ statusCode: 500, statusMessage: error.message })
    }
}

import { JSONResponse } from '~/utils/types'

import { useMasterDataStore } from '~/stores/master.store'

export default function useMaster() {
    const masterDataStore = useMasterDataStore()
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

async function fetchProvince() {
    const masterDataStore = useMasterDataStore()
    const response = await useApi('/master-data/province', { method: 'GET' })
    console.log('helloworsld')
    masterDataStore.setProvince(response.data.value)
    return response
}

async function fetchMaritalSatatus() {
    const masterDataStore = useMasterDataStore()
    const response = await useApi('/master-data/marital-status', { method: 'GET' })
    masterDataStore.setMaritalStatus(response.data.value)
    return response
}

async function fetchBlood() {
    const masterDataStore = useMasterDataStore()
    const response = await useApi('/master-data/blood', { method: 'GET' })
    masterDataStore.setBlood(response.data.value)
    return response
}

async function fetchTitle() {
    const masterDataStore = useMasterDataStore()
    const response = await useApi('/master-data/title', { method: 'GET' })
    masterDataStore.setTitle(response.data.value)
    return response
}

async function fetchTitleAcademic() {
    const masterDataStore = useMasterDataStore()
    const response = await useApi('/master-data/title-academic', { method: 'GET' })
    masterDataStore.setTitleAcademic(response.data.value)
    return response
}

async function fetchTitleSpecial() {
    const masterDataStore = useMasterDataStore()
    const response = await useApi('/master-data/title-special', { method: 'GET' })
    masterDataStore.setTitleSpecial(response.data.value)
    return response
}

async function fetchTitleConferred() {
    const masterDataStore = useMasterDataStore()
    const response = await useApi('/master-data/title-conferred', { method: 'GET' })
    masterDataStore.setTitleConferrend(response.data.value)
    return response
}

async function fetchTitleMilitary() {
    const masterDataStore = useMasterDataStore()
    const response = await useApi('/master-data/title-military', { method: 'GET' })
    masterDataStore.setTitleMilitary(response.data.value)
    return response
}

async function fetchTitleTH() {
    const masterDataStore = useMasterDataStore()
    const response = await useApi('/master-data/titleTH', { method: 'GET' })
    masterDataStore.setTitleTH(response.data.value)
    return response
}

async function fetchTitleEN() {
    const masterDataStore = useMasterDataStore()
    const response = await useApi('/master-data/titleEN', { method: 'GET' })
    masterDataStore.setTitleEN(response.data.value)
    return response
}

async function fetchMilitary() {
    const masterDataStore = useMasterDataStore()
    const response = await useApi('/master-data/military', { method: 'GET' })
    masterDataStore.setMilitary(response.data.value)
    return response
}

async function fetchReligion() {
    const masterDataStore = useMasterDataStore()
    const response = await useApi('/master-data/religion', { method: 'GET' })
    masterDataStore.setReligion(response.data.value)
    return response
}

async function fetchLevel() {
    const masterDataStore = useMasterDataStore()
    const response = await useApi('/master-data/level', { method: 'GET' })
    masterDataStore.setLevel(response.data.value)
    return response
}

async function fetchCertificate() {
    const masterDataStore = useMasterDataStore()
    const response = await useApi('/master-data/certificate', { method: 'GET' })
    masterDataStore.setCertificate(response.data.value)
    return response
}

async function fetchMajor() {
    const masterDataStore = useMasterDataStore()
    const response = await useApi('/master-data/major', { method: 'GET' })
    masterDataStore.setMajor(response.data.value)
    return response
}

async function fetchInstitute() {
    const masterDataStore = useMasterDataStore()
    const response = await useApi('/master-data/institute', { method: 'GET' })
    masterDataStore.setInstitute(response.data.value)
    return response
}

async function fetchRace() {
    const masterDataStore = useMasterDataStore()
    const response = await useApi('/master-data/race', { method: 'GET' })
    masterDataStore.setRace(response.data.value)
    return response
}

async function fetchPosition() {
    const masterDataStore = useMasterDataStore()
    const response = await useApi('/master-data/position', { method: 'GET' })
    masterDataStore.setPosition(response.data.value)
    return response
}

async function loadMasterData() {
    try {
        await fetchProvince()
        await fetchMaritalSatatus()
        await fetchBlood()

        await fetchTitle()
        await fetchTitleSpecial()
        await fetchTitleAcademic()
        await fetchTitleConferred()
        await fetchTitleMilitary()
        await fetchTitleTH()
        await fetchTitleEN()

        await fetchMilitary()

        await fetchCertificate()
        await fetchInstitute()
        await fetchLevel()
        await fetchMajor()
        await fetchPosition()
        await fetchRace()
        await fetchReligion()
    } catch (error: any) {
        showError({ statusCode: 500, statusMessage: error.message })
    }
}

import { JSONResponse } from '~/utils/types'

export default function useMaster() {
    return {
        fetchProvince,
        fetchTitleConferred,
    }
}

async function fetchProvince() {
    const response = await useApi('/master-data/province', { method: 'GET' })
    return response
}

async function fetchMaritalSatatus() {}

async function fetchBlood() {}

async function fetchTitle() {}

async function fetchTitleSpecial() {}

async function fetchTitleConferred() {
    const response = await useApi('/master-data/title-conferred', { method: 'GET' })
    return response
}

async function fetchTitleMilitary() {}

async function fetchTitleTH() {}

async function fetchTitleEN() {}

async function fetchReligion() {}

async function fetchLevel() {}

async function fetchCertificate() {}

async function fetchMajor() {}

async function fetchInstitute() {}

async function fetchRace() {}

async function fetchPosition() {}

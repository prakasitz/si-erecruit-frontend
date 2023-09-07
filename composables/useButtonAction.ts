import { DialogContext } from '~/utils/types'

export default function useButtonAction() {
    return {
        deleteJob,
        approveJob,
        cancelJob,
        publishJob,
        republishJob,
        suspendJob,
        terminateJob,
        verifiedJob,
        cancelProfile,
    }
}

const approveJob = async (event: any, item_id: number): Promise<DialogContext.BtnActionCallBack> => {
    try {
        const resp = await useApi(`/api/external/jobs/approved/${item_id}`, {
            headers: {
                Accept: 'application/json',
            },
            method: 'PATCH',
            server: false,
        })

        if (resp?.data?.value.rowAffects) {
            return {
                status: true,
                message: `Job ID: ${item_id} approved!`,
                callbackActionBtn: [
                    {
                        text: 'close',
                        href: `/job_management/${item_id}`,
                    },
                ],
            }
        } else {
            return {
                status: false,
                message: `Sorry, something went wrong.`,
            }
        }
    } catch (e) {
        console.log(e)
        return {
            status: false,
            message: `Sorry, something went wrong.`,
        }
    }
}

const deleteJob = async (event: any, item_id: number) => {
    try {
        const resp = await useApi(`/api/external/jobs/${item_id}`, {
            headers: {
                Accept: 'application/json',
            },
            method: 'DELETE',
            server: false,
        })
        if (resp?.data?.value.rowAffects) {
            return {
                status: true,
                message: `Job ID: ${item_id} deleted!`,
                callbackActionBtn: [
                    {
                        text: 'close',
                        to: '/job_management',
                    },
                ],
            }
        } else {
            return {
                status: false,
                message: `Sorry, something went wrong.`,
            }
        }
    } catch (e) {
        console.log(e)
        return {
            status: false,
            message: `Sorry, something went wrong.`,
        }
    }
}

const cancelJob = async (event: any, item_id: number) => {
    try {
        const resp = await useFetch(`/api/external/jobs/cancel/${item_id}`, {
            headers: {
                Accept: 'application/json',
            },
            method: 'PATCH',
            server: false,
        })

        if (resp?.data?.value.rowAffects) {
            return {
                status: true,
                message: `Job ID: ${item_id} canceled!`,
                callbackActionBtn: [
                    {
                        text: 'close',
                        href: `/job_management/${item_id}`,
                    },
                ],
            }
        } else {
            return {
                status: false,
                message: `Sorry, something went wrong.`,
            }
        }
    } catch (e) {
        console.log(e)
        return {
            status: false,
            message: `Sorry, something went wrong.`,
        }
    }
}
const publishJob = async (event: any, item_id: number) => {
    try {
        console.log(item_id)
        const resp = await useFetch(`/api/external/jobs/publish`, {
            headers: {
                Accept: 'application/json',
            },
            body: {
                job_ID: item_id,
            },
            method: 'PUT',
            server: false,
        })

        if (resp?.data?.value) {
            return {
                status: true,
                message: `Job ID: ${item_id} published!`,
                callbackActionBtn: [
                    {
                        text: 'close',
                        href: `/job_management/${item_id}`,
                    },
                ],
            }
        } else {
            return {
                status: false,
                message: `Sorry, something went wrong.`,
            }
        }
    } catch (e) {
        console.log(e)
        return {
            status: false,
            message: `Sorry, something went wrong.`,
        }
    }
}

const suspendJob = async (event: any, item_id: number) => {
    try {
        const resp = await useFetch(`/api/external/jobs/suspended/${item_id}`, {
            headers: {
                Accept: 'application/json',
            },
            method: 'PATCH',
            server: false,
        })

        if (resp?.data?.value.rowAffects) {
            return {
                status: true,
                message: `Job ID: ${item_id} suspended!`,
                callbackActionBtn: [
                    {
                        text: 'close',
                        href: `/job_management/${item_id}`,
                    },
                ],
            }
        } else {
            return {
                status: false,
                message: `Sorry, something went wrong.`,
            }
        }
    } catch (e) {
        console.log(e)
        return {
            status: false,
            message: `Sorry, something went wrong.`,
        }
    }
}

const republishJob = async (event: any, item_id: number) => {
    try {
        const resp = await useFetch(`/api/external/jobs/republish/${item_id}`, {
            headers: {
                Accept: 'application/json',
            },
            method: 'PATCH',
            server: false,
        })

        if (resp?.data?.value.rowAffects) {
            return {
                status: true,
                message: `Job ID: ${item_id} republish!`,
                callbackActionBtn: [
                    {
                        text: 'close',
                        href: `/job_management/${item_id}`,
                    },
                ],
            }
        } else {
            return {
                status: false,
                message: `Sorry, something went wrong.`,
            }
        }
    } catch (e) {
        console.log(e)
        return {
            status: false,
            message: `Sorry, something went wrong.`,
        }
    }
}

const terminateJob = async (event: any, item_id: number) => {
    try {
        const resp = await useFetch(`/api/external/jobs/terminate/${item_id}`, {
            headers: {
                Accept: 'application/json',
            },
            method: 'PATCH',
            server: false,
        })

        if (resp?.data?.value.rowAffects) {
            return {
                status: true,
                message: `Job ID: ${item_id} terminated!`,
                callbackActionBtn: [
                    {
                        text: 'close',
                        href: `/job_management/${item_id}`,
                    },
                ],
            }
        } else {
            return {
                status: false,
                message: `Sorry, something went wrong.`,
            }
        }
    } catch (e) {
        console.log(e)
        return {
            status: false,
            message: `Sorry, something went wrong.`,
        }
    }
}

const verifiedJob: DialogContext.FnActionCallback = async (event: any, item_id: number) => {
    try {
        const resp = await useFetch(`/api/external/jobs/verified/${item_id}`, {
            headers: {
                Accept: 'application/json',
            },
            method: 'PATCH',
            server: false,
        })

        if (resp?.data?.value.rowAffects) {
            return {
                status: true,
                message: `Job ID: ${item_id} verified!`,
                callbackActionBtn: [
                    {
                        text: 'close',
                        href: `/job_management/${item_id}`,
                    },
                ],
            }
        } else {
            return {
                status: false,
                message: `Sorry, something went wrong.`,
            }
        }
    } catch (e) {
        console.log(e)
        return {
            status: false,
            message: `Sorry, something went wrong.`,
        }
    }
}

const cancelProfile = async (event: any, item_id: number) => {
    return 'cancelProfile: ' + item_id
}


export default function useButtonAction() {
    return {
        deleteJob,
        approveJob,
        cancelJob,
        publishJob,
        republishJob,
        suspendJob,
        terminateJob,
        verifiedJob
    }
}

const approveJob = async (event: any, item_id: number) => {
    try {
        const resp = await useFetch(`/api/external/jobs/approved/${item_id}`, {
            headers: {
                Accept: 'application/json',
            },
            method: 'PATCH',
            server: false,
        });

        if (resp?.data?.value.rowAffects) {
            return {
                status: true,
                message: `Job ID: ${item_id} approved!`,
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

const deleteJob = async (event: any, item_id: number) => {
    try {
        const resp = await useFetch(`/api/external/jobs/${item_id}`, {
            headers: {
                Accept: 'application/json',
            },
            method: 'DELETE',
            server: false,
        });
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
        });

        if (resp?.data?.value.rowAffects) {
            return {
                status: true,
                message: `Job ID: ${item_id} canceled!`,
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
const publishJob = async (event: any, item_id: number) => {
    try {

        if (true) {
            return {
                status: true,
                message: `ยังไม่ทำ`,
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

const suspendJob = async (event: any, item_id: number) => {
    try {
        const resp = await useFetch(`/api/external/jobs/suspended/${item_id}`, {
            headers: {
                Accept: 'application/json',
            },
            method: 'PATCH',
            server: false,
        });

        if (resp?.data?.value.rowAffects) {
            return {
                status: true,
                message: `Job ID: ${item_id} suspended!`,
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

const republishJob = async (event: any, item_id: number) => {
    try {
        const resp = await useFetch(`/api/external/jobs/republish/${item_id}`, {
            headers: {
                Accept: 'application/json',
            },
            method: 'PATCH',
            server: false,
        });

        if (resp?.data?.value.rowAffects) {
            return {
                status: true,
                message: `Job ID: ${item_id} republish!`,
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

const terminateJob = async (event: any, item_id: number) => {
    try {
        const resp = await useFetch(`/api/external/jobs/terminate/${item_id}`, {
            headers: {
                Accept: 'application/json',
            },
            method: 'PATCH',
            server: false,
        });

        if (resp?.data?.value.rowAffects) {
            return {
                status: true,
                message: `Job ID: ${item_id} terminated!`,
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

const verifiedJob = async (event: any, item_id: number) => {
    try {
        const resp = await useFetch(`/api/external/jobs/verified/${item_id}`, {
            headers: {
                Accept: 'application/json',
            },
            method: 'PATCH',
            server: false,
        });

        if (resp?.data?.value.rowAffects) {
            return {
                status: true,
                message: `Job ID: ${item_id} verified!`,
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
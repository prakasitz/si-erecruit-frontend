<template>
    <v-btn color="red" :width="200" @click="confirmForDeleteItem">ลบงาน</v-btn>
</template>

<script setup lang="ts">
const { deleteJob } = useJobManagement()
const { dialogConfirm, showDialog } = useDialog()

const props = defineProps(['jobId'])

const fnDelete = async () => {
    try {
        const resp = await deleteJob(props.jobId)
        const rowAffects = resp?.data?.value.rowAffects
        if (rowAffects) {
            return {
                status: true,
                message: `Job ID: ${props.jobId} deleted!`,
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

const confirmForDeleteItem = (event: Event, item: any) => {
    const dialog = dialogConfirm()
    showDialog(
        {
            title: 'Confirm to delete this job',
            dialogColor: 'amber',
            message: `Are you sure to delete this job ${props.jobId}?`,
            item: {
                id: props.jobId,
            },
            actionButtons: [
                {
                    text: 'DELETE',
                    variant: 'elevated',
                    color: 'red',
                    cb: fnDelete,
                },
                {
                    text: 'Cancel',
                    color: 'gray',
                },
            ],
            persistent: true,
        },
        dialog
    )
}
</script>

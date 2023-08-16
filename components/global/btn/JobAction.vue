<template>
    <v-btn :text="props.text" :color="props.color" @click="confirmActionItem" />
</template>

<script setup lang="ts">
import { JobWithProfile } from '~/utils/types'

export interface Props {
    text: string
    color: string
    jobId: number
    cb?: any
}
const { dialogConfirm, showDialog } = useDialog()
const { suspendedProfile, publishableProfile } = useProfile()
const props = defineProps<Props>()

const confirmActionItem = (event: Event, item: any) => {
    let isValidate = false

    if (props.text == 'verify') {
        isValidate = verifyValidate()
    } else if (props.text == 'publish') {
        isValidate = publishValidate()
    } else {
        isValidate = true
    }

    if (isValidate) {
        showConfirmComponent()
    }
}

const publishValidate = () => {
    const profile = useNuxtData<JobWithProfile>('getProfilesByJobId').data.value
    let profileListID: number[] = []
    profile?.profile.map((item) => {
        if (item.profile_status == 1) {
            profileListID.push(item.profile_ID)
        }
    })

    if (profileListID.length > 0) {
        const dialog = dialogConfirm()

        showDialog(
            {
                title: `Confirm to publish this job`,
                dialogColor: 'amber',
                message: `-ไม่สามารถ Publish job ได้ หากยังมี Profile ที่อยู่ในสถานะ <b>Imported</b> <br/>
                <b>ต้องการเปลี่ยนสถานะ  Profile ที่ Imported เป็นสถานะอะไร? </b> `,
                item: {
                    id: { profile_IDs: profileListID, job_ID: props.jobId },
                },
                actionButtons: [
                    {
                        text: `Publishable`,
                        variant: 'elevated',
                        color: props.color,
                        cb: publishableProfile,
                    },
                    {
                        text: `Suspend`,
                        variant: 'elevated',
                        color: 'warning',
                        cb: suspendedProfile,
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
        return false
    } else {
        
        return true
    }
}

const verifyValidate = () => {
    const profile = useNuxtData<JobWithProfile>('getProfilesByJobId').data.value
    let submitted = 0
    let publishAsuspend = 0
    profile?.profile.map((item) => {
        if (item.profile_status == '4') {
            submitted = submitted + 1
        } else if (item.profile_status == 1 || item.profile_status == 2) {
            publishAsuspend = publishAsuspend + 1
        }
    })
    let message = []

    if (!submitted || publishAsuspend) {
        const dialog = dialogConfirm()

        if (!submitted) {
            message.push('<u><b>ไม่พบ</u></b> Profile ที่ Submitted')
        }

        if (publishAsuspend) {
            message.push('บาง Profile ยังคงสถานะ <u><b>Publishable</u></b> และ <b><u>Suspended</u></b>')
        }

        showDialog(
            {
                title: `Confirm to  ${props.text} this job`,
                dialogColor: 'amber',
                message: `- ${message.at(0)} ${
                    message.at(1) ? `  <br/>- ${message.at(1)}` : ``
                } <br/> ต้องการ Verify Job นี้หรือไม่`,
                item: {
                    id: props.jobId,
                },
                actionButtons: [
                    {
                        text: `${props.text}`,
                        variant: 'elevated',
                        color: props.color,
                        cb: props.cb,
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
        return false
    }
    return true
}

const showConfirmComponent = () => {
    const dialog = dialogConfirm()

    showDialog(
        {
            title: `Confirm to  ${props.text} this job`,
            dialogColor: 'amber',
            message: `Are you sure to ${props.text} this job ${props.jobId}?`,
            item: {
                id: props.jobId,
            },
            actionButtons: [
                {
                    text: `${props.text}`,
                    variant: 'elevated',
                    color: props.color,
                    cb: props.cb,
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

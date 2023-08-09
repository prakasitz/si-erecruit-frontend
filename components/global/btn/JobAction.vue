<template>
    <v-btn :text="props.text" :color="props.color" @click="confirmActionItem" />
</template>

<script setup lang="ts">
import { profile } from 'console'
import { JobWithProfile } from '~/utils/types'

export interface Props {
    text: string
    color: string
    jobId: number
    cb?: any
}
const { dialogConfirm, showDialog } = useDialog()

const props = defineProps<Props>()

const confirmActionItem = (event: Event, item: any) => {
    let isValidate = false

    if (props.text == 'verify') {
        isValidate = verifyValidate()
    } else {
        isValidate = true
    }

    if (isValidate) {
        showConfirmConponent()
    }
}

const verifyValidate = () => {
    const a = useNuxtData<JobWithProfile>('getProfilesByJobId').data.value
    let submitted = 0
    let publishAsuspend = 0
    a?.profile.map((item) => {
        if (item.profile_status == '4') {
            submitted = submitted + 1
        } else if (item.profile_status == 1 || item.profile_status == 2) {
            publishAsuspend = publishAsuspend + 1
        }
    })
    let message = []
    console.log(!submitted)
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

const showConfirmConponent = () => {
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

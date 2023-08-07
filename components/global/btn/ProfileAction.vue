<template>
    <v-btn :text="props.text" :color="props.color" @click="confirmActionItem" />
</template>

<script setup lang="ts">
const { dialogConfirm, showDialog, dialogWarning } = useDialog()

export interface Props {
    text: string
    color: string
    data: { profile_IDs: number[]; job_ID: number[] }
    cb?: any
}
const props = defineProps<Props>()

const confirmActionItem = (event: Event, item: any) => {
    const dialog = dialogConfirm()
    const dialog_warning = dialogWarning()

    if (props.data.profile_IDs.length > 0) {
        showDialog(
            {
                title: `Confirm to  ${props.text} these profiles?`,
                dialogColor: 'amber',
                message: `Are you sure to ${props.text} these profiles?`,
                item: {
                    id: { profile_IDs: props.data.profile_IDs, job_ID: props.data.job_ID },
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
    } else {
        showDialog(
            {
                title: `Something went wrong.`,
                dialogColor: 'blue',
                message: `sad`,
                actionButtons: [
                    {
                        text: 'Cancel',
                        color: 'gray',
                    },
                ],
                persistent: true,
            },
            dialog_warning
        )
    }
}
</script>

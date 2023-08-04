<template>
    <v-btn :text="props.text" :color="props.color" @click="confirmActionItem" />
</template>

<script setup lang="ts">
export interface Props {
    text: string
    color: string
    data: object
    cb?: any
}
const { dialogConfirm, showDialog } = useDialog()

const props = defineProps<Props>()

const confirmActionItem = (event: Event, item: any) => {
    const dialog = dialogConfirm()
    showDialog(
        {
            title: `Confirm to  ${props.text} this profile`,
            dialogColor: 'amber',
            message: `Are you sure to ${props.text} this profile?`,
            item: {
                id: props.data,
            },
            actionButtons: [
                {
                    text: `${props.text}`,
                    variant: 'elevated',
                    color: 'red',
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

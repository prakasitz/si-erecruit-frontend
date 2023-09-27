<template>
    <v-btn :text="props.text" :color="props.color" @click="confirmActionItem" />
</template>

<script setup lang="ts">
import { DialogContext } from '~/utils/types'

const { dialogConfirm, showDialog, dialogWarning } = useDialog()

interface PropsBtnProfileAction {
    text: string
    color: string
    data: DialogContext.ItemID
    cb?: DialogContext.FnActionCallback
}
const props = defineProps<PropsBtnProfileAction>()

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
                    id: props.data,
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
                message: `กรุณาเลือก Profile`,
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

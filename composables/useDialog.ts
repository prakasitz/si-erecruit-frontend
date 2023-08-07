import { DialogContext } from "~/utils/types"

export default function useDialog() {
    return {
        dialogInfo,
        dialogWarning,
        dialogError,
        dialogConfirm,
        dialogContext,
        showDialog,
    }
}

function showDialog({ title, message, ...args }: DialogContext, dialog: any) {
    const dialogContext = useState<DialogContext>('dialogContext')
    dialogContext.value = { title, message, ...args }
    dialog.value = true
}

function dialogContext() {
    return useState<DialogContext>('dialogContext', () => {
        return defaultDialogContext
    })
}

function dialogInfo() {
    return useState('dialogInfo', () => false)
}
function dialogWarning() {
    return useState('dialogWarning', () => false)
}
function dialogError() {
    return useState('dialogError', () => false)
}

function dialogConfirm() {
    return useState('dialogConfirm', () => false)
}

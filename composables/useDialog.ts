export default function useDialog() {
    return {
        dialogInfo,
        dialogWarning,
        dialogError,
        dialogContext,
        showDialogInfo,
    }
}

function showDialogInfo({ title, message, ...args }: DialogContext) {
    const dialogContext = useState<DialogContext>('dialogContext')
    const dialogInfo = useState('dialogInfo')

    dialogContext.value = { title, message, ...args }

    dialogInfo.value = true
}

function dialogContext() {
    return useState<DialogContext>('dialogContext', () => {
        return {
            title: '',
            message: '',
            actionButtons: [],
        }
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

type DialogContext = {
    title: string
    message: string
    actionButtons: any[]
    persistent?: boolean
    [key: string]: any
}

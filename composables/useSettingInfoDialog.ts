export default function useDialog() {
    return {
        dialogSettings,
        dialogContext,
        showDialogInfo,
    }
}

function showDialogInfo({ title, value }: DialogContext) {
    const dialogContext = useState<DialogContext>('dialogContext')
    const dialogInfo = useState('dialogSettings')
    console.log(title, value, dialogContext)

    dialogContext.value = { title, value }

    dialogInfo.value = true
}

function dialogContext() {
    return useState<DialogContext>('dialogContext', () => {
        return {
            title: '',
            value: '',
        }
    })
}

function dialogSettings() {
    return useState('dialogSettings', () => false)
}

type DialogContext = {
    title: string
    value: string
}
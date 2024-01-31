export default function useSettingInfoDialog() {
    return {
        dialogSettings,
        dialogContext,
        showDialogInfo,
    }
}

type DialogContext = {
    title: string
    value: string
}

function showDialogInfo({ title, value }: DialogContext) {
    const dialogContext = useState<DialogContext>('dialogContext')
    const dialogInfo = useState('dialogSettings')
    console.log('📖 showDialogInfo', { title, value, dialogContext })

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

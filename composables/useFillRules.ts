export const useFillRules = () => {
    const validate = async (formPage: HTMLFormElement | null) => {
        console.log(formPage)
        const formInstance = formPage
        if (formInstance) {
            const { valid } = await formInstance.validate()
            if (valid) {
                console.log('Form is valid')
                return true
            } else {
                alert('โปรดกรอกข้อมูลในช่อง * ให้ครบถ้วน')
                return false
            }
        }
    }
    const rules_fieldEmpty = [(v: any) => !!v || 'โปรดกรอกข้อมูลในช่องว่าง']

    const rules_dateEmpty = []

    return { validate, rules_fieldEmpty }
}

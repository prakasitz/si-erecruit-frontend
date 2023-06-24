import { VuetifyForm } from '~/utils/types'

export const useFillRules = () => {
    const validate = async (formPage: VuetifyForm | null) => {
        const formInstance = formPage
        if (formInstance) {
            const { valid, errors } = await formInstance.validate()
            if (valid) {
                console.log('Form is valid')
                return true
            } else {
                // console.error('errors', errors)
                alert('โปรดกรอกข้อมูลในช่อง * ให้ครบถ้วน')
                return false
            }
        }
    }
    const rules_fieldEmpty = [(v: any) => !!v || 'โปรดกรอกข้อมูลในช่องว่าง']

    const rules_dateEmpty = [(v: Date) => !!v || 'โปรดลงวันที่']

    return { validate, rules_fieldEmpty }
}

import { VuetifyForm } from '~/utils/types'

export const useFillRules = () => {
    const validate = async (formPage: VuetifyForm | null) => {
        const formInstance = formPage
        if (formInstance) {
            const { valid, errors } = await formInstance.validate()
            if (valid) {
                console.log('🟢 Form is valid')
                return true
            } else {
                // console.error('errors', errors)
                alert('โปรดกรอกข้อมูลในช่อง * ให้ครบถ้วน')
                return false
            }
        }
    }

    type VuetifyRule = {
        length?: number
        type?: 'string' | 'number' | 'date'
        formatRequired?: RegExp
        options?: {
            min?: number
            max?: number
        }
    }

    const rules_fieldEmpty = [(v: any) => !!v || 'โปรดกรอกข้อมูลในช่องว่าง']
    const fieldRules = ({ length, type, formatRequired, options }: VuetifyRule) => {
        const baseRules = [(v: any) => !!v || 'โปรดกรอกข้อมูลในช่องว่าง']
        if (length) baseRules.push((v: any) => (v && v.length <= length) || `โปรดกรอกข้อมูลไม่เกิน ${length} ตัวอักษร`)
        if (formatRequired)
            baseRules.push((v: any) => (v && formatRequired.test(v)) || 'โปรดกรอกข้อมูลตามรูปแบบที่กำหนด')
        if (type == 'number') {
            baseRules.push((v: any) => (v && !isNaN(v)) || 'โปรดกรอกตัวเลข')
            if (options?.max || options?.min) {
                const { min, max } = options
                if (min && !max) {
                    baseRules.push((v: any) => (v && v >= min) || `โปรดกรอกตัวเลขมากกว่า ${min}`)
                } else if (max && !min) {
                    baseRules.push((v: any) => (v && v <= max) || `โปรดกรอกตัวเลขน้อยกว่า ${max}`)
                } else if (max && min) {
                    baseRules.push((v: any) => (v && v > min && v <= max) || `โปรดกรอกตัวเลขระหว่าง ${min} - ${max}`)
                }
            }
        }
        return baseRules
    }
    return { validate, rules_fieldEmpty, fieldRules }
}

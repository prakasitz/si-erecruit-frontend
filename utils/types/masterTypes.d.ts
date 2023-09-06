export type TalentLevel = 'ดี' | 'พอใช้' | 'อื่น ๆ'
export type YesNo = '' | 'Y' | 'N'
export type Skill = {
    label: 'พูด' | 'อ่าน' | 'เขียน'
    selected: TalentLevel | null
    others: string | null
}

export type LanguageLevelOption = {
    label: 'ดี' | 'พอใช้' | 'อื่นๆ โปรดระบุ'
    value: TalentLevel
}

export type MasterProvince = {
    province_code: string
    province_name: string
}

export type MasterTitleConferred = {
    name_affix: string
    output_text: string
}

export type HavingOption = 'มี' | 'ไม่มี'

export type MarriageIncomeOption =
    | 'คู่สมรสไม่มีรายได้'
    | 'คู่สมรสมีรายได้ ไม่ลดหย่อนบุตร'
    | 'คู่สมรสมีรายได้ ลดหย่อนบุตร'

/**
 * Compensation Option
 * @value 00 - ยังไม่ได้รับ
 * @value 01 - ได้รับแล้ว
 */
export type CompensationOption = '00' | '01'

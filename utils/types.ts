export type TalentLevel = '' | 'good' | 'fair' | 'other'
export type YesNo = '' | 'Y' | 'N'
export type Skill = {
    label: 'พูด' | 'อ่าน' | 'เขียน'
    selected: TalentLevel
    others: string | ''
}

export type LanguageLevelOption = {
    label: 'ดี' | 'พอใช้' | 'อื่นๆ โปรดระบุ'
    value: TalentLevel
}

export const useOnboarding = () => {
    return useState('onBoarding', () => 1)
}

export const useWindowsNav = () => {
    const candidateForms = reactive([
        {
            id: 1,
            title: 'คำอธิบาย',
        },
        {
            id: 2,
            title: 'ตำแหน่งงาน',
        },
        {
            id: 3,
            title: 'ข้อมูลส่วนบุคคล',
        },
        {
            id: 4,
            title: 'ที่อยู่/บัญชีธนาคาร',
        },
        {
            id: 5,
            title: 'บิดา/มารดา',
        },
        {
            id: 6,
            title: 'คู่สมรส/บุตร',
        },
        {
            id: 7,
            title: 'ประวัติ',
        },
        {
            id: 8,
            title: 'ภาษี',
        },
        {
            id: 9,
            title: 'ข้อมูลอื่นๆ',
        },
        {
            id: 10,
            title: 'เอกสารอื่นๆ',
        },
    ])

    const onboarding: Ref<number> = useState('onBoarding')

    const next = () => {
        console.log(onboarding.value)
        onboarding.value = onboarding.value + 1 > candidateForms.length ? candidateForms.length : onboarding.value + 1
    }

    const prev = () => {
        onboarding.value = onboarding.value - 1 <= 0 ? 1 : onboarding.value - 1
    }

    return { candidateForms, next, prev }
}

import { CandidateForm } from '~/utils/types'

export interface ComponentState {
    candidateForms: CandidateForm[]
    onBoarding: number
}


export const useComponentStore = defineStore('component', {
    state: (): ComponentState => {
        return {
            candidateForms: [
                {
                    id: 1,
                    title: 'คำอธิบาย',
                    cardTitle: 'คำอธิบาย',
                    isLoading: true,
                },
                {
                    id: 2,
                    title: 'ตำแหน่งงาน',
                    cardTitle: 'ข้อมูลตำแหน่งงาน',
                    isLoading: true,
                },
                {
                    id: 3,
                    title: 'ข้อมูลส่วนบุคคล',
                    cardTitle: 'ข้อมูลส่วนบุคคล',
                    isLoading: true,
                },
                {
                    id: 4,
                    title: 'ที่อยู่/บัญชีธนาคาร',
                    cardTitle: 'ข้อมูลที่อยู่/บัญชีธนาคาร',
                    isLoading: true,
                },
                {
                    id: 5,
                    title: 'บิดา/มารดา',
                    cardTitle: 'ข้อมูลบิดา/มารดา',
                    isLoading: true,
                },
                {
                    id: 6,
                    title: 'คู่สมรส/บุตร',
                    cardTitle: 'ข้อมูลคู่สมรส/บุตร',
                    isLoading: true,
                },
                {
                    id: 7,
                    title: 'ประวัติ',
                    cardTitle: 'ข้อมูลประวัติ',
                    isLoading: true,
                },
                {
                    id: 8,
                    title: 'ภาษี',
                    cardTitle: 'ข้อมูลภาษี',
                    isLoading: true,
                },
                {
                    id: 9,
                    title: 'ข้อมูลอื่นๆ',
                    cardTitle: 'ข้อมูลอื่น ๆ',
                    isLoading: true,
                },
                {
                    id: 10,
                    title: 'เอกสารอื่นๆ',
                    cardTitle: 'เอกสารอื่นๆ',
                    isLoading: true,
                },
            ],
            onBoarding: 1,
        }
    },
    actions: {
        updateLoadingCandidateForm(id: number) {
            const targetForm = this.candidateForms.find((form) => form.id === id)
            if (targetForm) targetForm.isLoading = false
        },
        onBoardingNext() {
            this.onBoarding =
                this.onBoarding + 1 > this.candidateForms.length ? this.candidateForms.length : this.onBoarding + 1
        },
        onBoardingPrev() {
            this.onBoarding = this.onBoarding - 1 <= 0 ? 1 : this.onBoarding - 1
        },
    },
})

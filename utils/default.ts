import { job } from '~/stores/interface/personal_information.interface'
import { VueDatePickerProps } from '@vuepic/vue-datepicker'

export const default_job: job = {
    company_name: '',
    end_date: '',
    position_name: '',
    reason: '',
    salary: '',
    still_doing: false,
    start_date: '',
}

export const defaultVueDatePickerStyle: VueDatePickerProps = {
    placeholder: 'กรุณาเลือกวันที่',
    flow: ['year', 'month', 'calendar'],
    autoApply: true,
    partialFlow: true,
    enableTimePicker: false,
    modelType: 'yyyy/MM/dd',
}

import dayjs from 'dayjs'
import 'dayjs/locale/es' // load on demand
import buddhistEra from 'dayjs/plugin/buddhistEra'

dayjs.extend(buddhistEra)
// dayjs.locale('th')

export enum DateFormatEnum {
    DATE_TIME_BUDDHIST_1 = 'DD MMM BBBB, HH:mm',
    DATE_TIME_GENERAL = 'DD/MMM/YYYY HH:mm',
    DATE_ONLY = 'DD/MM/YYYY',
    TIME_ONLY_12_HOUR = 'h:mm A',
    TIME_ONLY_24_HOUR = 'HH:mm',
    MONTH_YEAR = 'MMMM YYYY',
    MONTH_DAY_YEAR = 'MMMM DD, YYYY',
    DAY_MONTH_YEAR = 'DD MMMM YYYY',
}

export const dateToString = (date: string | Date, format: any) => {
    return dayjs(date, 'DD/MM/YYYY HH:mm').subtract(7, 'hour').format(format)
}

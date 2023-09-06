import dayjs from 'dayjs'
import 'dayjs/locale/es' // load on demand
import buddhistEra from 'dayjs/plugin/buddhistEra'
import { DateFormatEnum } from './enum'

dayjs.extend(buddhistEra)
// dayjs.locale('th')

export const dateToString = (date: string | Date, format: DateFormatEnum) => {
    return dayjs(date, 'DD/MM/YYYY HH:mm').subtract(7, 'hour').format(format)
}

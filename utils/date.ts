import dayjs from 'dayjs'
import buddhistEra from 'dayjs/plugin/buddhistEra'
import 'dayjs/locale/th' // load on demand

import { DateFormatEnum } from './enum'

dayjs.extend(buddhistEra)
dayjs.locale('th')

export const dateToString = (date: string | Date, format: DateFormatEnum) => {
    return dayjs(date, 'DD/MM/YYYY HH:mm').subtract(7, 'hour').format(format)
}

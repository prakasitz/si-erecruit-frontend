import { useRoute } from 'nuxt/app'
import { masterService } from '../../../common/externalAPI/master.external'
import { BadRequestError } from '../../../../utils/default'

const router = createRouter()

router.get(
    '/title',
    defineEventHandler(async (event) => {
        const q = getQuery(event)
        let adult = q.adult as string | undefined
        if (![undefined, '0', '1'].includes(adult)) {
            throw BadRequestError("adult must be '0' or '1'")
        } else {
            const data = await masterService.getTitle(adult, event)
            return data
        }
    })
)

router.get(
    '/all',
    defineEventHandler(async (event) => {
        //promise all
        const data = await Promise.all([
            masterService.getProvince(event),
            masterService.getMaritalStatus(event),
            masterService.getBlood(event),
            masterService.getTitle(undefined, event),
            masterService.getTitleEN(event),
            masterService.getTitleTH(event),
            masterService.getTitleMilitary(event),
            masterService.getTitleSpecial(event),
            masterService.getRace(event),
            masterService.getReligion(event),
            masterService.getLevel(event),
            // masterService.getMajor(event),
            // masterService.getInstitute(event),
            // masterService.getCertificate(event),
            masterService.getPosition(event),
        ])
    })
)

router.get(
    '/level',
    defineEventHandler(async (event) => {
        const data = await masterService.getLevel(event)
        return data
    })
)

router.get(
    '/certificate',
    defineEventHandler(async (event) => {
        let lv = getQuery(event).lv as string | undefined
        if (lv === undefined) throw BadRequestError('lv is required')
        const data = await masterService.getCertificate(lv, event)
        return data
    })
)

router.get(
    '/major',
    defineEventHandler(async (event) => {
        let lv = getQuery(event).lv as string | undefined
        if (lv === undefined) throw BadRequestError('lv is required')
        const data = await masterService.getMajor(lv, event)
        return data
    })
)

router.get(
    '/institute',
    defineEventHandler(async (event) => {
        let lv = getQuery(event).lv as string | undefined
        if (lv === undefined) throw BadRequestError('lv is required')
        const data = await masterService.getInstitute(lv, event)
        return data
    })
)

router.get(
    '/settings',
    defineEventHandler(async (event) => {
        return masterService.getSettings(event)
    })
)

router.post(
    '/settings',
    defineEventHandler(async (event) => {
        return masterService.getBySetting(await readBody(event), event)
    })
)

router.put(
    '/setting',
    defineEventHandler(async (event) => {
        return masterService.updateSetting(await readBody(event), event)
    })
)

export default useBase('/api/external/master', router.handler)

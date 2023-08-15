import { useRoute } from 'nuxt/app'
import { masterService } from '../../../common/externalAPI/master.external'
import { BadRequestError } from '../../../../utils/default'

const router = createRouter()

router.get(
    '/title',
    defineEventHandler(async (event) => {
        const data = await masterService.getTitle(event)
        return data
    })
)

router.get(
    '/title-conferred',
    defineEventHandler(async (event) => {
        const data = await masterService.getTitleConferred(event)
        return data
    })
)

router.get(
    '/title-special',
    defineEventHandler(async (event) => {
        const data = await masterService.getTitleSpecial(event)
        return data
    })
)

router.get(
    '/title-academic',
    defineEventHandler(async (event) => {
        const data = await masterService.getTitleAcademic(event)
        return data
    })
)

router.get(
    '/title-military',
    defineEventHandler(async (event) => {
        const data = await masterService.getTitleMilitary(event)
        return data
    })
)

router.get(
    '/titleTH',
    defineEventHandler(async (event) => {
        const data = await masterService.getTitleTH(event)
        return data
    })
)

router.get(
    '/titleEN',
    defineEventHandler(async (event) => {
        const data = await masterService.getTitleEN(event)
        return data
    })
)

router.get(
    '/province',
    defineEventHandler(async (event) => {
        const data = await masterService.getProvince(event)
        return data
    })
)

router.get(
    '/blood',
    defineEventHandler(async (event) => {
        const data = await masterService.getBlood(event)
        return data
    })
)

router.get(
    '/country-race',
    defineEventHandler(async (event) => {
        const data = await masterService.getRace(event)
        return data
    })
)

router.get(
    '/religion',
    defineEventHandler(async (event) => {
        const data = await masterService.getReligion(event)
        return data
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
            masterService.getTitle(event),
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

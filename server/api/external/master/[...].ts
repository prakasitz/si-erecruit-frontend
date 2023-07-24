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
            throw BadRequestError
        } else {
            const data = await masterService.getTitle(adult)
            return data
        }
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

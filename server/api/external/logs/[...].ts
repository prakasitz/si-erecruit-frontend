import { logService } from '../../../common/externalAPI/log.external'

const router = createRouter()

router.post(
    '/paging',
    defineEventHandler(async (event) => {
        const resp = await logService.getPaging(event)
        return resp
    })
)

export default useBase('/api/external/logs/', router.handler)

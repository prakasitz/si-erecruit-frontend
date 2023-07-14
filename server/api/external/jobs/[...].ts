import { useRoute } from 'nuxt/app'
import { masterService } from '../../../common/externalAPI/master.external'
import { BadRequestError } from '../../../../utils/default'
import { jobService } from '../../../common/externalAPI/jobs.external'
import { isStringNumber } from '../../../../utils/string'

const router = createRouter()
router.post(
    '/get',
    defineEventHandler(async (event) => {
        const body = await readBody(event)
        try {
            const data = await jobService.getJobs()
            return data
        } catch (error) {
            throw BadRequestError
        }
    })
)

router.delete(
    '/:jobId',
    defineEventHandler(async (event) => {
        const body = await readBody(event)
        const { jobId } = await getRouterParams(event)
        const query = await getQuery(event)

        if (!jobId || !isStringNumber(jobId)) throw BadRequestError('Job ID must be a number')

        return { aaa: 'asdasdas' }
    })
)
export default useBase('/api/external/jobs', router.handler)

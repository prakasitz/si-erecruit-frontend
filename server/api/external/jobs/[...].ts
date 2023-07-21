import { useRoute } from 'nuxt/app'
import { masterService } from '../../../common/externalAPI/master.external'
import { BadRequestError, TokenNotFoundError } from '../../../../utils/default'
import { jobService } from '../../../common/externalAPI/jobs.external'
import { isStringNumber } from '../../../../utils/string'

const router = createRouter()
router.post(
    '/get',
    defineEventHandler(async (event) => {
        const body = await readBody(event)
        try {
            const data = await jobService.getJobs(event, body)
            return data
        } catch (error) {
            throw BadRequestError()
        }
    })
)

router.post(
    '/getProfileOnJob/:jobId',
    defineEventHandler(async (event) => {
        const jobId = await getRouterParam(event, 'jobId')
        try {
            const data = await jobService.getProfilesByJobId(event, jobId)
            return data
        } catch (error) {
            throw BadRequestError()
        }
    })
)

router.delete(
    '/:jobId',
    defineEventHandler(async (event) => {
        const { jobId } = await getRouterParams(event)
        if (!jobId || !isStringNumber(jobId)) throw BadRequestError('Job ID must be a number')

        const tokenOrUndefined = getCookie(event, 'access_token')
        if (!tokenOrUndefined) return TokenNotFoundError()

        const response = await jobService.delJobById(parseInt(jobId), event)

        return response
    })
)
export default useBase('/api/external/jobs', router.handler)

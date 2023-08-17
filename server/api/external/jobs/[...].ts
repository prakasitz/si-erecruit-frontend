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

router.patch(
    '/approved/:jobId',
    defineEventHandler(async (event) => {

        const { jobId } = await getRouterParams(event)
        if (!jobId || !isStringNumber(jobId)) throw BadRequestError('Job ID must be a number')

        const tokenOrUndefined = getCookie(event, 'access_token')

        if (!tokenOrUndefined) return TokenNotFoundError()

        const response = await jobService.approveobById(parseInt(jobId), event)

        return response
    })
)

router.patch(
    '/cancel/:jobId',
    defineEventHandler(async (event) => {

        const { jobId } = await getRouterParams(event)
        if (!jobId || !isStringNumber(jobId)) throw BadRequestError('Job ID must be a number')

        const tokenOrUndefined = getCookie(event, 'access_token')

        if (!tokenOrUndefined) return TokenNotFoundError()

        const response = await jobService.cancelById(parseInt(jobId), event)

        return response
    })
)

router.patch(
    '/republish/:jobId',
    defineEventHandler(async (event) => {

        const { jobId } = await getRouterParams(event)
        if (!jobId || !isStringNumber(jobId)) throw BadRequestError('Job ID must be a number')

        const tokenOrUndefined = getCookie(event, 'access_token')

        if (!tokenOrUndefined) return TokenNotFoundError()

        const response = await jobService.rePublishById(parseInt(jobId), event)

        return response
    })
)

router.patch(
    '/suspended/:jobId',
    defineEventHandler(async (event) => {

        const { jobId } = await getRouterParams(event)
        if (!jobId || !isStringNumber(jobId)) throw BadRequestError('Job ID must be a number')

        const tokenOrUndefined = getCookie(event, 'access_token')

        if (!tokenOrUndefined) return TokenNotFoundError()

        const response = await jobService.suspendById(parseInt(jobId), event)

        return response
    })
)

router.patch(
    '/terminate/:jobId',
    defineEventHandler(async (event) => {

        const { jobId } = await getRouterParams(event)
        if (!jobId || !isStringNumber(jobId)) throw BadRequestError('Job ID must be a number')

        const tokenOrUndefined = getCookie(event, 'access_token')

        if (!tokenOrUndefined) return TokenNotFoundError()

        const response = await jobService.terminateById(parseInt(jobId), event)

        return response
    })
)

router.patch(
    '/verified/:jobId',
    defineEventHandler(async (event) => {

        const { jobId } = await getRouterParams(event)
        if (!jobId || !isStringNumber(jobId)) throw BadRequestError('Job ID must be a number')

        const tokenOrUndefined = getCookie(event, 'access_token')

        if (!tokenOrUndefined) return TokenNotFoundError()

        const response = await jobService.verifiedById(parseInt(jobId), event)

        return response
    })
)


router.put(
    '/publish/',
    defineEventHandler(async (event) => {

        const body = await readBody(event)
        if (!body || !isStringNumber(body.job_ID)) throw BadRequestError('Job ID must be a number')

        const tokenOrUndefined = getCookie(event, 'access_token')

        if (!tokenOrUndefined) return TokenNotFoundError()

        const response = await jobService.publishById(parseInt(body.job_ID), event)

        return response
    })
)


export default useBase('/api/external/jobs', router.handler)

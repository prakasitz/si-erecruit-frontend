import { BadRequestError } from '../../../../utils/default'
import { externalAPIService } from '../../../common/externalAPI/ExternalAPIService'

const router = createRouter()

router.get(
    '/file/detail/:profileId',
    defineEventHandler(async (event) => {
        const profileId = getRouterParam(event, 'profileId')
        try {
            if (!profileId) throw BadRequestError('profileId is required')
            const data = await externalAPIService.CandidateFileDetail(event, profileId)
            return data
        } catch (error) {
            throw BadRequestError()
        }
    })
)

router.get(
    `/file/download/:path`,
    defineEventHandler(async (event) => {
        try {
            const pathParam = getRouterParam(event, 'path')
            const query = getQuery(event)

            if (!query?.profileId) throw BadRequestError('profileId is required')

            if (!pathParam) throw BadRequestError('path is required')

            let profileId = query.profileId as string
            const data = await externalAPIService.CandidateFileDownload(event, profileId, pathParam)
            return data
        } catch (error) {
            throw BadRequestError()
        }
    })
)

router.post(
    '/file/upload',
    defineEventHandler(async (event) => {
        try {
            const formData = await parseMultipartNodeRequest(event.node.req, {
                file: 'filetoupload',
                fields: ['pid', 'tag'],
            })
            const resp = await externalAPIService.CandidateUploadFile(event, formData)
            return resp
        } catch (e: any) {
            console.log('🟥 error on file/upload', {
                e: e,
                e_data: e.data,
            })
            return createError({
                message: `${e.message}: ${e.data?.message ?? '-'}`,
                statusCode: 422,
                statusMessage: 'Unprocessable Entity',
            })
        }
    })
)

router.delete(
    '/file/delete',
    defineEventHandler(async (event) => {
        const body = await readBody(event)
        try {
            if (body?.pid && body?.tag && body?.profileId) {
                const { tag, profileId, pid } = body
                const data = await externalAPIService.CandidateFileDelete(event, profileId, pid, tag)
                return data
            }
        } catch (e: any) {
            console.log('🟥 error on file/upload', {
                e: e,
                e_data: e.data,
            })
            throw BadRequestError()
        }
    })
)

export default useBase('/api/external/candidate', router.handler)

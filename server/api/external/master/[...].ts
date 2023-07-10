import { useRoute } from 'nuxt/app'
import { masterService } from '../../../common/master.external'

const router = createRouter()
router.get(
    '/title',
    defineEventHandler(async (event) => {
        const q = getQuery(event)
        let adult = q.adult as string | undefined
        if (![undefined, '0', '1'].includes(adult)) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Bad Request',
                message: 'Invalida query parameter',
            })
        } else {
            const data = await masterService.getTitle(adult)
            return data
        }
    })
)
export default useBase('/api/external/master', router.handler)

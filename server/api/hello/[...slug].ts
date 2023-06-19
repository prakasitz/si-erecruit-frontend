import { createRouter, defineEventHandler, useBase } from 'h3'

const router = createRouter()

router.get(
    '/test',
    defineEventHandler(() => 'Hello World')
)

export default useBase('/api/hello', router.handler)

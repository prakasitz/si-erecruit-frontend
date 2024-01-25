import { helloService } from '../common/externalAPI/hello.external'

export default defineEventHandler(async (event) => {
    return helloService.getHello(event)
})

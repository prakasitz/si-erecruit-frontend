// Log all requests
export default defineEventHandler(async (event) => {
    if (event.node.req.url?.includes('_nuxt')) return
    // console.log('request: ', event.node.req.method, ' ', event.node.req.url)
})

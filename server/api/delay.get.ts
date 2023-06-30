export default defineEventHandler(async () => {
    return new Promise<any>((resolve) => {
        setTimeout(() => {
            resolve('Hello world!')
        }, 2500)
    })
})

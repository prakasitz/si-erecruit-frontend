export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.provide('isDev', () => process.env.NODE_ENV === 'development')
    onNuxtReady(async () => {
        console.info('Nuxt ready')
    })
})

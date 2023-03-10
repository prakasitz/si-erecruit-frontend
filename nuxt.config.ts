// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify from 'vite-plugin-vuetify'

export default defineNuxtConfig({
    typescript: {
        strict: true,
        typeCheck: true,
    },

    css: ['vuetify/styles', '@mdi/font/css/materialdesignicons.min.css'], // vuetify ships precompiled css, no need to import sass
    build: {
        transpile: ['vuetify'],
    },
    vite: {
        define: {
            'process.env.DEBUG': false,
        },
    },

    // auto import components
    components: true,
    app: {
        // global transition
        pageTransition: { name: 'page', mode: 'out-in' },
        layoutTransition: { name: 'layout', mode: 'out-in' },
    },
})

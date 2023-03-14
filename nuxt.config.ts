// https://nuxt.com/docs/api/configuration/nuxt-config

import { createResolver } from '@nuxt/kit'
import vuetify from 'vite-plugin-vuetify'

const { resolve } = createResolver(import.meta.url)

export default defineNuxtConfig({
    typescript: {
        strict: true,
        typeCheck: true,
    },
    css: [
        'vuetify/lib/styles/main.sass',
        '@mdi/font/css/materialdesignicons.min.css',
        '@/assets/_fonts.css',
        '@/assets/main.css',
    ], // vuetify ships precompiled css, no need to import sass
    modules: [
        async (option, nuxt) => {
            nuxt.hooks.hook('vite:extendConfig', (config, { isClient, isServer }) => {
                config.plugins?.push(
                    vuetify({
                        autoImport: true,
                        styles: {
                            configFile: resolve('./assets/settings.scss'),
                        },
                    })
                )
            })
        },
    ],
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

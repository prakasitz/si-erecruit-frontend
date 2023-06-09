// https://nuxt.com/docs/api/configuration/nuxt-config

import { createResolver } from '@nuxt/kit'
import vuetify from 'vite-plugin-vuetify'
const { resolve } = createResolver(import.meta.url)

export default defineNuxtConfig({
    typescript: {
        shim: false,
    },
    // vuetify ships precompiled css, no need to import sass
    css: ['@mdi/font/css/materialdesignicons.min.css', '@/assets/_fonts.css', '@/assets/main.css', 'vuetify/styles'],

    modules: [
        '@nuxt/devtools',
        async (option, nuxt) => {
            nuxt.hooks.hook('vite:extendConfig', (config) => {
                config.plugins?.push(
                    vuetify({
                        autoImport: true,
                        styles: {
                            configFile: resolve('assets/settings.scss'),
                        },
                    })
                )
            })
        },
        '@pinia/nuxt',
    ],
    sourcemap: false,
    runtimeConfig: {
        baseApi: `${process.env.API_URL}`,
        public: {
            baseApi: `${process.env.API_URL}`,
        },
    },
    build: {
        transpile: ['vuetify'],
    },
    vite: {
        ssr: {
            noExternal: ['vuetify', '@vuepic/vue-datepicker'],
        },
        define: {
            'process.env.DEBUG': false,
        },
    },

    components: true,

    pinia: {
        autoImports: ['defineStore', 'acceptHMRUpdate'],
    },

    app: {
        head: {
            title: 'Si-ERecruit',
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1',
        },
        // global transition
        pageTransition: { name: 'page', mode: 'out-in' },
        layoutTransition: { name: 'layout', mode: 'out-in' },
    },

    devtools: {
        enabled: false,
    },
})

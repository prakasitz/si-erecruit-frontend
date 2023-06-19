// https://nuxt.com/docs/api/configuration/nuxt-config

import { createResolver } from '@nuxt/kit'
import vuetify from 'vite-plugin-vuetify'
const { resolve } = createResolver(import.meta.url)

const rateLimit300perDay = {
    rateLimiter: {
        tokensPerInterval: 300,
        interval: 'day',
        fireImmediately: false,
    },
}

export default defineNuxtConfig({
    typescript: {
        shim: false,
    },
    // vuetify ships precompiled css, no need to import sass
    css: ['@mdi/font/css/materialdesignicons.min.css', '@/assets/_fonts.css', '@/assets/main.css', 'vuetify/styles'],

    modules: [
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
        '@nuxt/devtools',
        '@pinia/nuxt',
        'nuxt-security',
    ],
    sourcemap: false,
    runtimeConfig: {
        baseApi: `${process.env.API_URL}`,
        public: {
            baseApi: `${process.env.API_URL}`,
        },
    },
    build: {
        transpile: ['vuetify', '@vuepic/vue-datepicker'],
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
        autoImports: [
            'defineStore', // import { defineStore } from 'pinia'
        ],
    },

    security: {
        hidePoweredBy: false,
    },

    routeRules: {
        '/api/auth/check-pid': {
            security: {
                ...rateLimit300perDay,
            },
        },
        '/api/auth/login': {
            security: {
                ...rateLimit300perDay,
            },
        },
        '/api/proxy/example': { proxy: 'https://jsonplaceholder.typicode.com/todos/1' },
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

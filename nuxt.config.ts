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

    css: [
        '@mdi/font/css/materialdesignicons.min.css',
        '@/assets/_fonts.css',
        '@/assets/main.css',
        'vuetify/styles',
        '@vuepic/vue-datepicker/dist/main.css',
    ],

    modules: [
        '@pinia/nuxt',
        'nuxt-security',
        //'@nuxt/devtools'
    ],

    // sourcemap: false,

    runtimeConfig: {
        baseApi: process.env.BACKEND_API_URL,
        urlOauth2: process.env.API_ADFS,
        clientId: process.env.CLIENT_ID_ADFS,
        clientSecret: process.env.CLIENT_SECRET_ADFS,
        jwks: process.env.URI_ADFS_JWKS,
        public: {
            baseApi: '/api',
        },
    },

    build: {
        transpile: ['vuetify', '@vuepic/vue-datepicker'],
    },

    hooks: {
        'vite:extendConfig': (config, { isClient, isServer }) => {
            config.plugins?.push(
                vuetify({
                    styles: {
                        configFile: resolve('assets/settings.scss'),
                    },
                })
            )
        },
    },

    // vite: {
    //     ssr: {
    //         noExternal: ['vuetify', '@vuepic/vue-datepicker'],
    //     },
    //     define: {
    //         'process.env.DEBUG': false,
    //     },
    // },

    pinia: {
        autoImports: [
            'defineStore', // import { defineStore } from 'pinia'
        ],
    },

    security: {
        headers: {
            crossOriginResourcePolicy: 'same-origin',
            // crossOriginOpenerPolicy: 'unsafe-none',
            // crossOriginEmbedderPolicy: 'require-corp',
            // referrerPolicy: 'strict-origin-when-cross-origin',
            // contentSecurityPolicy: {
            //     'upgrade-insecure-requests': false,
            // },
        },
        allowedMethodsRestricter: '*',
        hidePoweredBy: true,
        enabled: false,
        csrf: false,
    },

    // routeRules: {
    //     '/api/auth/check-pid': {
    //         security: {
    //             ...rateLimit300perDay,
    //         },
    //     },
    //     '/api/auth/login': {
    //         security: {
    //             ...rateLimit300perDay,
    //         },
    //     },
    //     '/api/proxy/example': { proxy: 'https://jsonplaceholder.typicode.com/todos/1' },
    // },

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

    // devtools: {
    //     // Enable devtools (default: true)
    //     enabled: true,
    //     // VS Code Server options
    //     vscode: {},
    //     // ...other options
    // },
})

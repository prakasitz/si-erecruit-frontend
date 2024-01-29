// https://nuxt.com/docs/api/configuration/nuxt-config

import { createResolver } from '@nuxt/kit'

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
        '@vuepic/vue-datepicker/dist/main.css',
        '@/assets/_fonts.css',
        '@/assets/main.css',
        '@/assets/css/status-color.css',
        'vuetify/styles',
    ],

    modules: ['@pinia/nuxt', 'nuxt-security', '@nuxt/devtools'],

    sourcemap: {
        server: false,
        client: false,
    },

    runtimeConfig: {
        baseApi: '',
        urlOauth2: '',
        clientId: '',
        clientSecret: '',
        audience: '',
        jwks: '',
        encryptKey: '',
        public: {
            baseApi: '/api',
        },
    },

    build: {
        transpile: ['vuetify', '@vuepic/vue-datepicker'],
    },

    vite: {
        define: {
            'process.env.DEBUG': false,
        },
    },

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

    routeRules: {
        '/login': {
            headers: {
                'X-Type': 'BACKEND',
            },
        },
        '/login_candidate': {
            headers: {
                'X-Type': 'CANDIDATE',
            },
        },
        '/api/master/**': {
            proxy: {
                to: '/api/external/master/**',
            },
        },
        '/api/jobs/**': {
            proxy: {
                to: '/api/external/jobs/**',
            },
        },
        '/api/profile/**': {
            proxy: {
                to: '/api/external/profile/**',
            },
        },
        '/api/users/**': {
            proxy: {
                to: '/api/external/users/**',
            },
        },
    },

    app: {
        head: {
            // titleTemplate: '%s · Si-ERecruit',
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1',
        },
        // global transition
        pageTransition: { name: 'page', mode: 'out-in' },
        layoutTransition: { name: 'layout', mode: 'out-in' },
    },

    devtools: {
        // Enable devtools (default: true)
        enabled: true,
        // VS Code Server options
        // ...other options
    },
})

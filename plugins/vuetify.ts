import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export default defineNuxtPlugin((nuxtApp) => {
    const vuetify = createVuetify({
        // your config will come here
        ssr: false,
        components,
        directives,
        theme: {
            defaultTheme: 'myCustomTheme',
            themes: {
                myCustomTheme: {
                    dark: false,
                    colors: {
                        'main-background': '#1e88e5',
                    },
                },
            },
        },
    })

    nuxtApp.vueApp.use(vuetify)
})

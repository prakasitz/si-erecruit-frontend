import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@/assets/settings.scss'

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
                        'main-color': '#1e88e5',
                        'background-color': '#EEF5F9',
                        'footer-color': '#99abb4',
                    },
                },
            },
        },
    })

    nuxtApp.vueApp.use(vuetify)
})

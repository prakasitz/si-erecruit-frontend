import { createVuetify } from 'vuetify'
import { VDataTable } from 'vuetify/labs/VDataTable'
import { VSkeletonLoader } from 'vuetify/labs/VSkeletonLoader'

import '@/assets/settings.scss'

export default defineNuxtPlugin((nuxtApp) => {
    const vuetify = createVuetify({
        ssr: true,
        components: {
            VDataTable,
            VSkeletonLoader,
        },
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

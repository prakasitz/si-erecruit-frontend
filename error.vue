<script setup lang="ts">
const props = defineProps({
    error: Object,
})

definePageMeta({
    title: 'Error',
    description: 'Error page',
})

const userTypeCookie = computed(() => {
    return useCookie('type', {
        path: useRuntimeConfig().app.baseURL,
    }).value
})

const toHomeUrl = computed(() => {
    if (userTypeCookie.value === 'BACKEND') return '/'
    else if (userTypeCookie.value === 'CANDIDATE') return '/candidate'
    else return '/candidate'
})

const toLoginUrl = computed(() => {
    if (userTypeCookie.value === 'BACKEND') return '/login'
    else if (userTypeCookie.value === 'CANDIDATE') return '/login_candidate'
    else return '/login_candidate'
})

/*

error follow by {
  url: string
  statusCode: number
  statusMessage: string
  message: string
  description: string
  data: {
    type: string // 'HR' | 'CANDIDATE'
  }
}

*/
</script>

<template>
    <NuxtLayout name="custom">
        <v-container>
            <v-row align="center" justify="center">
                <v-col>
                    <v-card class="ma-5">
                        <v-card-title class="ma-5 text-center text-h1" style="line-height: 90%">{{
                            error?.statusCode
                        }}</v-card-title>
                        <v-card-title class="pa-3 text-center text-h6">{{ error?.statusMessage }}</v-card-title>
                        <DevOnly>
                            <v-card-text>
                                <pre>{{ error }}</pre>
                                <pre>{{ userTypeCookie }}</pre>
                            </v-card-text>
                        </DevOnly>
                        <v-card-text class="text-center pa-3 text-body-1">
                            <v-alert variant="flat" color="gray">
                                <div v-if="error!.statusCode === 404">
                                    <p>Sorry, the page you are looking for could not be found.</p>
                                </div>
                                <div v-else-if="error!.statusCode === 500">
                                    <p>
                                        Sorry, something went wrong.
                                        <br />
                                        Please try again later.
                                    </p>
                                </div>
                                <div v-else-if="error!.statusCode === 401">
                                    <p>
                                        Sorry, you are not authorized to access this page.
                                        <br />
                                        Please login first.
                                    </p>
                                </div>
                                <div v-else>
                                    <p>
                                        {{ error?.message }}
                                    </p>
                                </div>
                            </v-alert>
                        </v-card-text>
                        <v-card-actions>
                            <v-row no-gutters>
                                <v-col>
                                    <v-row no-gutters>
                                        <v-col class="pa-1" cols="6" offset="3">
                                            <v-btn
                                                block
                                                variant="outlined"
                                                color="main-color"
                                                @click.once="() => $router.back()"
                                                >BACK</v-btn
                                            >
                                        </v-col>
                                        <v-col class="pa-1" cols="6" offset="3">
                                            <v-btn
                                                v-if="error!.statusCode === 401"
                                                block
                                                variant="flat"
                                                color="main-color"
                                                :to="toLoginUrl"
                                                >LOGIN</v-btn
                                            >
                                            <v-btn v-else block variant="flat" color="main-color" :to="toHomeUrl"
                                                >HOME</v-btn
                                            >
                                        </v-col>
                                    </v-row>
                                </v-col>
                            </v-row>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </NuxtLayout>
</template>

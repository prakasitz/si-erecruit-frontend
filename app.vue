<template>
    <div>
        <NuxtLayout>
            <!-- <NuxtLoadingIndicator /> -->
            <LoadingPage :loading="loading" />
            <v-row class="mb-5">
                <DialogInfo />
                <DialogWarning />
                <DialogError />
                <DialogConfirm />
            </v-row>
            <NuxtPage />
        </NuxtLayout>
    </div>
</template>
<style>


.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
}



/* ... */
.rotate-enter-active {
    transition: all 0.2s;
}

.rotate-leave-active {
    transition: all 0.4s;
}
.rotate-enter-from,
.rotate-leave-to {
    opacity: 0;
    filter: blur(10px);
    transition: opacity 0.2s ease-in-out, filter 0.2s ease-in-out;
}

.swing-enter-active,
.swing-leave-active {
    transition: transform 0.2 linear;
}

.swing-enter-to {
    transform-style: preserve-3D;
    transform: scale(1);
}

.swing-leave-to {
    transform-style: preserve-3D;
    transform: scale(0);
}

.pointer-events-none {
    pointer-events: none;
}
.pointer-events-initial {
    pointer-events: initial;
}
</style>

<script setup lang="ts">
const { loading } = usePageLoading()

const nuxtApp = useNuxtApp()
nuxtApp.hook('page:finish', () => {
    setTimeout(() => {
        if (loading.value == true) {
            loading.value = false
        }
    }, 500)
})
</script>

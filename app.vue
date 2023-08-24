<template>
    <div>
        <NuxtLayout>
            <!-- <NuxtLoadingIndicator /> -->
            <transition name="fade">
                <div v-if="loading" class="loading-overlay d-flex justify-center align-center">
                    <div class="lds-ring">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </transition>
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
.loading-overlay {
    background: linear-gradient(to bottom, #1e88e5, #eef5f9);
    width: 100%;
    height: 100%;
    position: fixed;
    top: 50%; /* Adjust as needed */
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10000;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
}

.lds-ring {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
}
.lds-ring div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 64px;
    height: 64px;
    margin: 8px;
    border: 8px solid #fff;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #fff transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
    animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
    animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
    animation-delay: -0.15s;
}
@keyframes lds-ring {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
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
const loading = ref(true)

const nuxtApp = useNuxtApp()

nuxtApp.hook('page:finish', () => {
    if (loading.value == true) {
        setTimeout(() => {
            loading.value = false
        }, 500)
    }
})
</script>

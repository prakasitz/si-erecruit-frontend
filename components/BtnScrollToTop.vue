<template>
    <v-layout-item
        class="text-end pointer-events-none"
        style="
            z-index: 1007;
            transform: translateY(0%);
            position: fixed;
            height: inherit;
            bottom: 1.25rem;
            width: calc((100% - 0px) - 0px);
            left: -1.25rem;
        "
        position="bottom"
    >
        <Transition name="swing">
            <v-btn
                ref="scrollButton"
                v-if="!shouldShowButton"
                size="large"
                color="main-color"
                elevation="8"
                class="pointer-events-initial"
                density="default"
                icon="mdi-chevron-up"
                style="transform-origin: center center"
                @click="scrollToTop"
            ></v-btn>
        </Transition>
    </v-layout-item>
</template>

<script setup lang="ts">
interface PropsBtnScrollToTop {
    position4show?: number
}

const props = withDefaults(defineProps<PropsBtnScrollToTop>(), {
    position4show: 50,
})

const scrollPosition = ref(0)
const scrollButton = ref(null)
const shouldShowButton = computed(() => scrollPosition.value < props.position4show)

const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    })
}

onMounted(() => {
    window.addEventListener('scroll', () => {
        scrollPosition.value = window.pageYOffset
    })
})

onUnmounted(() => {
    window.removeEventListener('scroll', () => {
        scrollPosition.value = window.pageYOffset
    })
})
</script>

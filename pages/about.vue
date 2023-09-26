<template>
    <div>Hello World</div>
</template>

<script setup lang="ts">
// This will work in both `<script setup>` and `<script>`
definePageMeta({
    name: 'about',
    title: 'About',
    pageTransition: {
        name: 'rotate',
    },
    layout: 'custom',
    middleware: ['auth'],
})
</script>

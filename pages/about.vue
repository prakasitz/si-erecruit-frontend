<template>
    <div>Hello World</div>
</template>

<script setup lang="ts">
// This will work in both `<script setup>` and `<script>`
definePageMeta({
    name: 'about',
    pageTransition: {
        name: 'rotate',
    },
    layout: 'custom',
    // middleware: ['hr-only']
})
</script>

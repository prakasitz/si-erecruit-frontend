<template>
    <div>Hello World</div>
</template>

<script setup lang="ts">
// This will work in both `<script setup>` and `<script>`
definePageMeta({
    pageTransition: {
        name: 'rotate',
    },
    layout: 'custom',
})
</script>

<template>
    <NuxtLayout :name="'custom'">
        <div>Hello World</div>
    </NuxtLayout>
</template>

<script>
// This will work in both `<script setup>` and `<script>`
definePageMeta({
    layout: false,
})
</script>

<template>
    {{ route.params.id }}
    <br />
    <pre>{{ post }}</pre>
</template>
<script setup>
const route = useRoute()
const { data: post } = await useFetch('https://jsonplaceholder.typicode.com/posts/2')
</script>

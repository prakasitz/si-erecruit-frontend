<template>
    <td>
        {{ props.menu }}
    </td>
    <td>Action</td>
    <td>Action</td>
</template>

<script setup>
const props = defineProps(['menu', 'filename', 'action'])
</script>

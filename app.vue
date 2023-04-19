<template>
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>
<style>
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
</style>

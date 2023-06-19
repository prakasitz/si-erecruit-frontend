<template>
    <div class="bb aa mb-5">
        <CandidateBaseCard :title="'How are you to day ?'"></CandidateBaseCard>
    </div>
</template>

<style scoped>
.aa {
    z-index: 10000;
    top: 9rem;
    background-color: unset;
}

.bb {
    position: sticky !important;
}

.v-banner {
    border: unset;
}
</style>

<script>
export default {
    data: () => ({
        sticky: true,
    }),
}
</script>

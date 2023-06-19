<template>
    <v-app>
        <v-main style="min-height: 100%" class="bg-candidate">
            <slot></slot>
        </v-main>
    </v-app>
</template>

<script setup lang="ts"></script>

<style>
.bg-candidate {
    background: linear-gradient(135deg, #b6dbde, #74c0f2);
}

.bg-candidate-error {
    background: linear-gradient(135deg, #deb6c0, #f27474);
}

.bg-card-candidate {
    background: #e3f2f9 !important;
    color: #5c7b9c;
}

.bg-header-card {
    background: linear-gradient(315deg, #b6dbde, #74c0f2);
    color: #fff;
}

.bg-header-card-error {
    background: linear-gradient(315deg, #ffc67b, #f27474);
    color: #fff;
}

.btn-candidate {
    color: #fff !important;
    background: #5c7b9c !important;
}
</style>

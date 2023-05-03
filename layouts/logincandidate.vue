<template>
    <v-app>
        <v-main style="min-height: 100%" class="bg-candidate">
            <slot></slot>
        </v-main>
    </v-app>
</template>

<style>
.bg-candidate {
    background: linear-gradient(135deg, #b6dbde, #74c0f2);
}

.bg-card-candidate {
    background: #e3f2f9 !important;
    color: #5c7b9c;
}

.btn-candidate {
    color: #fff !important;
    background: #5c7b9c;
    width: 50%;
}
</style>
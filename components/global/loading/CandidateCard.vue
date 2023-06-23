<template>
    <v-card class="mx-auto" width="90%">
        <v-container>
            <v-card-title class="pa-auto text-h5 text-indigo-darken-2">
                <v-skeleton-loader :loading="true" type="heading" width="25%"></v-skeleton-loader>
            </v-card-title>
            <v-card-text>
                <v-skeleton-loader :loading="true" type="paragraph" width="100%"></v-skeleton-loader>
                <v-skeleton-loader :loading="true" type="heading" width="25%"></v-skeleton-loader>
                <v-skeleton-loader :loading="true" type="text,text,text,sentences" width="100%"></v-skeleton-loader>
                <v-skeleton-loader :loading="true" type="sentences" width="100%"></v-skeleton-loader>
            </v-card-text>
        </v-container>
    </v-card>
</template>

<template>
    <v-card class="mx-auto" width="90%">
        <v-toolbar density="compact" color="main-color">
            <v-card-title :style="{ 'font-size': '16px !important' }">
                <span class="text-h6">รายละเอียดงาน (ID: {{ $route.params.id }})</span><br />
            </v-card-title>
        </v-toolbar>
        <v-card-text class="d-flex justify-center">
            <v-container>
                <v-row>
                    <v-col cols="3">
                        <v-skeleton-loader height="92px" type="heading, heading"></v-skeleton-loader>
                    </v-col>
                    <v-col cols="2">
                        <v-skeleton-loader height="92px" type="heading, heading"></v-skeleton-loader>
                    </v-col>
                    <v-col cols="4">
                        <v-skeleton-loader height="92px" type="heading, heading"></v-skeleton-loader>
                    </v-col>
                    <v-col cols="3">
                        <v-skeleton-loader height="px" type="heading, heading"></v-skeleton-loader>
                    </v-col>
                    <v-col cols="3">
                        <v-skeleton-loader height="92px" type="heading, heading"></v-skeleton-loader>
                    </v-col>
                    <v-col cols="9">
                        <v-skeleton-loader height="92px" type="heading"></v-skeleton-loader>
                    </v-col>
                </v-row>
                <v-skeleton-loader
                    :style="{
                        marginTop: '10px',
                        maxHeight: '34px',
                    }"
                    type="actions"
                ></v-skeleton-loader>
            </v-container>
        </v-card-text>
    </v-card>
</template>

<script lang="ts" setup></script>

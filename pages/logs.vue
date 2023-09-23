<template>
    <div>
        <!-- <v-card v-if="pending" class="mx-auto" width="90%">
            <v-card-item>
                <v-skeleton-loader
                    :loading="pending"
                    type="heading, subtitle, table-tbody, table-tfoot"
                ></v-skeleton-loader>
            </v-card-item>
        </v-card> -->
        <v-card  class="mx-auto" width="90%">
            <v-card-item>
                <v-card-title :style="{ 'font-size': '18px !important' }"> </v-card-title>
                <v-data-table :headers="(headers as any)" :items="data" class="elevation-1" hover :search="search">
                    <template v-slot:top>
                        <v-row class="d-flex justify-end">
                            <v-col class="ma-3">
                                <p class="text-h6 text-main-color font-weight-bold">Logs</p>
                                <p class="text-h7 font-weight-bold">ข้อมูล Logs</p>
                            </v-col>
                            <v-col cols="5">
                                <v-text-field
                                    v-model="search"
                                    density="compact"
                                    class="pa-4"
                                    small
                                    variant="outlined"
                                    label="ค้นหา"
                                    append-inner-icon="mdi-magnify"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </template>
                </v-data-table>
            </v-card-item>
        </v-card>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    title: 'Logs',
    name: 'Logs',
    pageTransition: {
        name: 'rotate',
    },
    breadcrumbs: [
        {
            title: 'หน้าหลัก',
            href: '/',
        },
        {
            title: 'logs',
        },
    ],
    middleware: ['hr-only'],
})

const search = ref()

const headers = [
    { title: 'ID', align: 'start', key: 'log_ID' },
    { title: 'Type', align: 'start', key: 'log_type' },
    { title: 'Requester', align: 'start', key: 'requester' },
    { title: 'Timestamp', align: 'start', key: 'timestamp' },
    { title: 'Message', align: 'start', key: 'msg' },
]

/*

[log_ID]
      ,[log_type]
      ,[requester]
      ,[object]
      ,[ip]
      ,[timestamp]
      ,[msg]

*/
type LoggingData = {
    log_ID: number
    log_type: string
    requester: string
    object?: string | null
    ip: string
    timestamp: string
    msg: string
}

const data = [
    {
        log_ID: 19,
        log_type: 'TOKEN_IS_UNDEFINED',
        requester: 'UNKNOWN',
        object: 'GuardAuth',
        ip: '-',
        timestamp: '2023-08-28 16:42:06.343',
        msg: 'Unauthorized',
    },
    {
        log_ID: 20,
        log_type: 'LOGIN_OAUTH_SUCCESS',
        requester: '10039124',
        object: 'NULL',
        ip: '-',
        timestamp: '2023-08-28 16:42:41.323',
        msg: 'LOGIN_OAUTH_SUCCESS',
    },
    {
        log_ID: 21,
        log_type: 'LOGIN_OAUTH_SUCCESS',
        requester: '10039124',
        object: 'NULL',
        ip: '-',
        timestamp: '2023-08-28 16:43:57.223',
        msg: 'LOGIN_OAUTH_SUCCESS',
    },
    {
        log_ID: 22,
        log_type: 'NOT_FOUND_CANDIDATE',
        requester: 'SYSTEM',
        object: '-',
        ip: '-',
        timestamp: '2023-08-28 16:54:18.543',
        msg: 'NOT FOUND CANDIDATE (110370260ห3937).',
    },
    {
        log_ID: 23,
        log_type: 'NOT_FOUND_CANDIDATE',
        requester: 'SYSTEM',
        object: '-',
        ip: '-',
        timestamp: '2023-08-28 16:54:20.923',
        msg: 'NOT FOUND CANDIDATE (110370260ห3937).',
    },
    {
        log_ID: 24,
        log_type: 'LOGIN_OAUTH_SUCCESS',
        requester: '10039124',
        object: 'NULL',
        ip: '-',
        timestamp: '2023-08-29 08:56:44.990',
        msg: 'LOGIN_OAUTH_SUCCESS',
    },
    {
        log_ID: 25,
        log_type: 'LOGIN_OAUTH_SUCCESS',
        requester: '10039138',
        object: 'NULL',
        ip: '-',
        timestamp: '2023-08-29 09:05:14.100',
        msg: 'LOGIN_OAUTH_SUCCESS',
    },
    {
        log_ID: 26,
        log_type: 'NOT_FOUND_CANDIDATE',
        requester: 'SYSTEM',
        object: '-',
        ip: '-',
        timestamp: '2023-08-29 09:24:23.097',
        msg: 'NOT FOUND CANDIDATE (1100201370643).',
    },
    {
        log_ID: 27,
        log_type: 'NOT_FOUND_CANDIDATE',
        requester: 'SYSTEM',
        object: '-',
        ip: '-',
        timestamp: '2023-08-29 09:24:34.460',
        msg: 'NOT FOUND CANDIDATE (1100201370643).',
    },
    {
        log_ID: 28,
        log_type: 'LOGIN_CANDIDATE_SUCCESS',
        requester: '1100201370643',
        object: 'NULL',
        ip: '-',
        timestamp: '2023-08-29 09:26:31.677',
        msg: 'LOGIN_CANDIDATE_SUCCESS',
    },
    {
        log_ID: 29,
        log_type: 'LOGIN_CANDIDATE_SUCCESS',
        requester: '1100201370643',
        object: 'NULL',
        ip: '-',
        timestamp: '2023-08-29 09:28:17.773',
        msg: 'LOGIN_CANDIDATE_SUCCESS',
    },
    {
        log_ID: 30,
        log_type: 'LOGIN_CANDIDATE_SUCCESS',
        requester: '1100201370643',
        object: 'NULL',
        ip: '-',
        timestamp: '2023-08-29 09:28:22.817',
        msg: 'LOGIN_CANDIDATE_SUCCESS',
    },
    {
        log_ID: 31,
        log_type: 'LOGIN_CANDIDATE_SUCCESS',
        requester: '1100201370643',
        object: 'NULL',
        ip: '-',
        timestamp: '2023-08-29 09:28:45.780',
        msg: 'LOGIN_CANDIDATE_SUCCESS',
    },
    {
        log_ID: 32,
        log_type: 'LOGIN_CANDIDATE_SUCCESS',
        requester: '1100201370643',
        object: 'NULL',
        ip: '-',
        timestamp: '2023-08-29 09:29:28.767',
        msg: 'LOGIN_CANDIDATE_SUCCESS',
    },
]
</script>

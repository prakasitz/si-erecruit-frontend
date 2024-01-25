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
        <v-card class="mx-auto mb-3" width="90%">
            <v-card-item>
                <v-card-title :style="{ 'font-size': '18px !important' }"> </v-card-title>
                <v-data-table-server
                    :density="'compact'"
                    v-model:items-per-page="itemsPerPage"
                    :items-per-page-options="itemsPerPageOptions"
                    :headers="(headers as any)"
                    :items-length="totalItems"
                    :items="serverItems"
                    :loading="loading"
                    hover
                    class="elevation-1 text-body-2"
                    @update:options="loadItems"
                >
                    <template v-slot:top>
                        <v-row class="d-flex justify-end">
                            <v-col class="ma-3">
                                <p class="text-h4 text-main-color font-weight-bold">Logs</p>
                                <p class="text-h7 font-weight-bold">ข้อมูล Logs</p>
                            </v-col>
                        </v-row>
                    </template>
                    <template v-slot:item.msg="{ item }">
                        <code>{{ item.raw.msg }}</code>
                    </template>
                </v-data-table-server>
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
    middleware: ['admin-hr-only'],
})

useBreadcrumb().setBreadcrumbs([
    {
        title: 'logs',
    },
])

const { LogTableHandler } = useLogViewer()
const { serverItems, totalItems, loading, loadItems, itemsPerPage } = LogTableHandler()

const search = ref()

const headers = [
    { width: '', sortable: false, title: 'ID', align: 'start', key: 'log_ID' },
    { width: '10%', class: 'text-truncate', sortable: false, title: 'Type', align: 'start', key: 'log_type' },
    { width: '', sortable: false, title: 'Requester', align: 'start', key: 'requester' },
    { width: '20%', sortable: false, title: 'Timestamp', align: 'start', key: 'timestamp_str' },
    { width: '10%', class: 'text-truncate', sortable: false, title: 'Message', align: 'start', key: 'msg' },
]

const itemsPerPageOptions = [
    { value: 25, title: '25' },
    { value: 50, title: '50' },
    { value: 100, title: '100' },
]
</script>

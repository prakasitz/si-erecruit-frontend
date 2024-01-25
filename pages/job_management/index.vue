<template>
    <div>
        <v-card v-if="pending" class="mx-auto" width="90%">
            <v-card-item>
                <v-skeleton-loader
                    :loading="pending"
                    type="heading, subtitle, table-tbody, table-tfoot"
                ></v-skeleton-loader>
            </v-card-item>
        </v-card>
        <v-card v-else class="mx-auto" width="90%">
            <v-card-item>
                <v-data-table
                    :items-per-page="10"
                    :headers="(headers as any)"
                    :items="jobs"
                    item-value="name"
                    class="elevation-1"
                    :search="search"
                    :hover="true"
                    @click:row="onRowClick"
                >
                    <template v-slot:top>
                        <v-row>
                            <v-col class="mx-4 my-3">
                                <p class="text-h6 text-main-color font-weight-bold">รายชื่องานที่นำข้อมูลเข้า</p>
                                <p class="text-h7 font-weight-bold">
                                    ได้ทำการนำข้อมูลทั้งหมด
                                    <span style="color: red">{{ jobs.length }}</span>
                                    รายการ
                                </p>
                            </v-col>
                            <v-col cols="5">
                                <v-text-field
                                    v-model="search"
                                    density="compact"
                                    class="pa-4 rounded-pill"
                                    variant="outlined"
                                    label="ค้นหา"
                                    append-inner-icon="mdi-magnify"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </template>
                    <template v-slot:item.job_name="{ item }">
                        <p>{{ item.raw.job_name }}</p>
                        <p class="text-caption">{{ item.raw.desc }}</p>
                    </template>
                    <template v-slot:item.job_status="{ item }">
                        <v-chip :class="`status-job-${toLowerCase(item.raw.job_status)}`">{{
                            item.raw.job_status
                        }}</v-chip>
                    </template>
                    <template v-slot:item.action="{ item }">
                        <v-btn
                            class="me-2"
                            :variant="'text'"
                            :size="'small'"
                            density="comfortable"
                            icon="mdi-pencil"
                            :to="`/job_management/${item.raw.job_ID}/`"
                            title="แก้ไข"
                            color="indigo"
                        ></v-btn>
                        <v-btn
                            :variant="'text'"
                            density="comfortable"
                            icon="mdi-delete"
                            :id="`jobid-${item.raw.job_ID}`"
                            :size="'small'"
                            @click="confirmForDeleteItem($event, item.raw)"
                            color="red"
                            title="ลบ"
                            :disabled="!item.raw.canDelete"
                        ></v-btn>
                    </template>
                </v-data-table>
            </v-card-item>
        </v-card>
        <br />
    </div>
</template>

<script setup lang="ts">
import { NuxtError } from 'nuxt/app'
import { FetchError } from 'ofetch'

definePageMeta({
    title: 'จัดการงาน',
    pageTransition: {
        name: 'rotate',
    },
    breadcrumbs: [
        {
            title: 'หน้าหลัก',
            href: '/',
        },
        {
            title: 'จัดการงาน',
        },
    ],
    middleware: ['admin-hr-only'],
})

const { fetchJobs, deleteJob } = useJobManagement()
const { dialogConfirm, showDialog } = useDialog()

const route = useRoute()

const headers = [
    { title: 'ID', align: 'start', key: 'job_ID', width: '5%' },
    { title: 'ชื่องาน', align: 'start', key: 'job_name' },
    { title: 'ที่มา', align: 'start', key: 'data_source' },
    { title: 'สถานะ', align: 'start', key: 'job_status' },
    { title: 'แก้ไข/ลบ', align: 'start', key: 'action' },
]

const search = ref()

const { data: jobs, pending, refresh } = fetchJobs(0, true)

const onRowClick = (event: Event, item: any) => {
    const router = useRouter()

    //@ts-ignore
    let target = event.target as HTMLElement
    let tagName = target.tagName
    let buttonId = `jobid-${item.item.raw.job_ID}`
    let buttonElement: HTMLButtonElement | null = null
    let from: string | null = null
    // target tagName is I or BUTTON
    switch (tagName) {
        case 'I':
            buttonElement = target.closest('button')
            from = 'I'
        case 'BUTTON':
            from = from || 'BUTTON'
            buttonElement = buttonElement || (target as HTMLButtonElement)
            if (buttonElement.id == buttonId) {
                console.log('from', from, buttonElement.id, buttonId)
                confirmForDeleteItem(event, item.item.raw)
            }
            break
        default:
            router.push(`/job_management/${item.item.raw.job_ID}`)
            break
    }

    // $router.push(`/job_management/${item.item.raw.job_ID}`)
}

const confirmForDeleteItem = (event: Event, item: any) => {
    const dialog = dialogConfirm()
    showDialog(
        {
            title: 'Confirm to delete this job',
            dialogColor: 'amber',
            message: `Are you sure to delete this job ${item.job_ID}?`,
            item: {
                id: item.job_ID,
            },
            actionButtons: [
                {
                    text: 'DELETE',
                    variant: 'elevated',
                    color: 'red',
                    cb: deleteJobItem,
                },
                {
                    text: 'Cancel',
                    color: 'gray',
                },
            ],
            persistent: true,
        },
        dialog
    )
}

const deleteJobItem = async (event: Event, itemId: any): Promise<{ status: boolean; message: unknown }> => {
    if (event instanceof PointerEvent) {
        try {
            await deleteJob(itemId)
            return { status: true, message: `Job ID: ${itemId} deleted!` }
        } catch (error: FetchError | any) {
            console.log('🔴 job_management:deleteJobItem',error)
            if (error instanceof FetchError) {
                const { statusCode, statusMessage } = error.data as NuxtError
                let message = error.data.message + ` (${statusMessage}:${statusCode})` || error.message || error || ''
                return { status: false, message }
            } else {
                let message = error.message || error || ''
                return {
                    status: false,
                    message: `Unexcepted error, please try again later <br> => "${message}"`,
                }
            }
        } finally {
            //fetch job again
            refresh()
        }
    }
    event.preventDefault()
    return { status: false, message: 'cancel to DELETE' }
}
</script>

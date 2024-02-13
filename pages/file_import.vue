<template>
    <div>
        <v-card class="mx-auto" width="90%">
            <v-toolbar density="compact" color="main-color">
                <v-card-title :style="{ 'font-size': '16px !important' }">
                    <span class="text-h6">Import File (*.xlsx)</span><br />
                </v-card-title>
            </v-toolbar>
            <v-card-text class="d-flex justify-center">
                <v-sheet
                    v-if="cntFiles == 0"
                    rounded
                    class="d-flex justify-center align-centerbg-surface-variant"
                    width="80%"
                    height="200"
                >
                    <DropZone class="d-flex justify-center align-center" @files-dropped="onFilesDropped">
                        <!-- use the scoped slot to show the drop zone status -->
                        <template #default="{ dropZoneActive }">
                            <div class="text-h4 text-center">
                                <v-icon class="mb-2" icon="mdi-cloud-upload-outline"></v-icon>
                                <div class="text-body-1 font-weight-bold">
                                    {{ dropZoneActive ? 'Drop your files here' : 'Drag and drop files here' }}
                                </div>
                            </div>
                            <p></p>
                        </template>
                    </DropZone>
                </v-sheet>
                <template v-else>
                    <v-sheet class="d-flex flex-column" width="100%">
                        <v-sheet class="d-flex justify-center mb-4" rounded width="100%">
                            <v-table hover density="compact" class="elevation-1" :style="tableStyle">
                                <thead class="bg-blue-darken-4">
                                    <tr>
                                        <th :class="theadStyle">File Name</th>
                                        <th :class="theadStyle">File Type</th>
                                        <th :class="theadStyle">File Size</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="file in files" :key="file.name">
                                        <td>{{ file.name }}</td>
                                        <td>{{ fileExtention(file.name) }}</td>
                                        <td>{{ formatSize(file.size) }}</td>
                                    </tr>
                                </tbody>
                            </v-table>
                        </v-sheet>
                        <v-sheet rounded width="100%" class="h-">
                            <v-table hover density="compact" class="elevation-1" width="100%" id="showData">
                                <thead class="bg-blue-darken-4">
                                    <tr class="text-caption">
                                        <th
                                            v-for="header in profileDataFromFileHeaders"
                                            :key="header"
                                            :class="theadStyle"
                                        >
                                            {{ header }}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody class="text-no-wrap">
                                    <tr
                                        v-for="item in profileDataFromFile"
                                        :key="item.name"
                                        :class="addClassRowInvalidData(item)"
                                    >
                                        <td v-for="header in profileDataFromFileHeaders" :key="header">
                                            {{ item[header] }}
                                        </td>
                                    </tr>
                                </tbody>
                            </v-table>
                        </v-sheet>
                    </v-sheet>
                </template>
            </v-card-text>
            <v-card-actions class="mb-6">
                <!-- rigth button -->
                <v-spacer></v-spacer>
                <v-btn
                    prepend-icon="mdi-reload"
                    :variant="'tonal'"
                    color="error"
                    @click="onClickReset"
                    :disabled="cntFiles == 0"
                >
                    <b>Reset</b>
                </v-btn>
                <v-btn
                    v-if="importedData == null"
                    prepend-icon="mdi-upload"
                    :variant="'tonal'"
                    color="indigo"
                    @click="onClickUpload(files)"
                    :loading="loading"
                    :disabled="cntFiles == 0"
                >
                    <b>Upload File</b>
                </v-btn>
                <v-btn
                    v-if="importedData && importedData.length > 0"
                    prepend-icon="mdi-check"
                    :variant="'tonal'"
                    color="success"
                    :disabled="cntFiles == 0"
                >
                    <b>Uploaded</b>
                </v-btn>
                <v-spacer></v-spacer>
            </v-card-actions>
        </v-card>
        <br />
    </div>
</template>

<style scoped>
#showData table {
    border-collapse: collapse;

    border-spacing: 10px;
}
#showData table td {
    border: 0.5px solid rgb(140, 137, 137);
}

#showData table td:first-child {
    position: sticky;
    left: 0;
    background-color: white;
    z-index: 1000;
}

#showData table th:first-child {
    position: sticky;
    background-color: black;
    left: 0;
    z-index: 1000;
}

#showData .row-invalid {
    background-color: #ffcccc !important;
}

#showData .row-invalid .field-invalid {
    color: red;
}
</style>

<script setup lang="ts">
definePageMeta({
    pageTransition: {
        name: 'rotate',
    },
    middleware: ['admin-hr-only'],
})

useBreadcrumb().setBreadcrumbs([
    {
        title: 'นำเข้าไฟล์',
    },
])

useHead({
    title: 'นำเข้าไฟล์',
})

// todo imprement and optimize
const addClassRowInvalidData = (item: any) => {
    if (isProfileValid.value) return ''
    const invalid = invalidData.value.find((x) => x.no === item.no)
    return invalid ? 'row-invalid' : ''
}

const addClassFieldInvalidData = (item: any) => {
    const invalid = invalidData.value.find((x) => x.no === item.no)
    return invalid ? 'row-invalid' : ''
}

const theadStyle = 'text-center text-white font-weight-bold pa-2'
const tableStyle = {
    // border: '1px solid black !important',
    width: '90%',
}

const { importProfile, readProfileFile } = useProfile()
const { showDialog, dialogInfo, dialogError } = useDialog()
const { showErrorOnDialog } = useErrorHandler()

const loading = ref(false)
const importedData = ref<any[] | null>(null)
const files = ref<File[]>([])

const cntFiles = computed(() => {
    return files.value ? files.value.length : 0
})

const profileDataFromFile = ref<any>([])
const profileDataFromFileHeaders = ref<any>([])
const isProfileValid = ref(false)

type InvalidProfileData = {
    no: number
    id_card_number: string
    errors: ValidateError[]
}

type ValidateError = {
    property: string
    value: string | null
}

const invalidData = ref<InvalidProfileData[]>([])

async function onFilesDropped(f: File[]) {
    files.value = f
    const resp = await readProfileFile(files.value)
    if (resp?.data) {
        const { data, headers, isValid, errors } = resp.data
        profileDataFromFile.value = data
        profileDataFromFileHeaders.value = headers
        isProfileValid.value = isValid
        invalidData.value = errors

        console.log({ data, headers, isValid, errors })

        if (!isValid) {
            const dialog = dialogError()
            showDialog(
                {
                    title: `Invalid Profile Data`,
                    message: `🚨 ข้อมูลที่นำเข้าไม่ถูกต้อง, โปรดตรวจสอบข้อมูลและนำเข้าให้ถูกต้อง`,
                    actionButtons: [
                        {
                            text: `close`,
                            color: 'error',
                        },
                    ],
                    persistent: true,
                },
                dialog
            )
        }
    } else if (resp?.error) {
        //error request such as 500, 404, 403
        const { data, statusCode } = resp.error
        showErrorOnDialog({
            error: resp.error,
            customShowDialog: {
                title: `Error on Reading Import File (${statusCode})`,
                message: `เกิดข้อผิดพลาดในการอ่านไฟล์, ${data.message}`,
                actionButtons: [
                    {
                        text: `close`,
                        color: 'error',
                    },
                ],
            },
        })
    }
}

async function onClickUpload(files: File[]) {
    loading.value = true

    const resp = await importProfile(files)
    if (resp?.data) {
        importedData.value = resp.data.data
        const dialog = dialogInfo()
        const appBaseUrl = useRuntimeConfig().app.baseURL
        showDialog(
            {
                title: 'Imported',
                message: 'Imported successfully',
                actionButtons: [
                    {
                        text: 'Upload again',
                        prependIcon: 'mdi-reload',
                        href: `${appBaseUrl}file_import`,
                    },
                    {
                        text: 'Check Job Data',
                        prependIcon: 'mdi-clipboard-check',
                        color: 'indigo',
                        to: `${appBaseUrl}job_management`,
                    },
                ],
                persistent: true,
            },
            dialog
        )
    }

    loading.value = false
}

async function onClickReset() {
    importedData.value = null
    profileDataFromFile.value = []
    profileDataFromFileHeaders.value = []
    invalidData.value = []
    files.value = []
}

function fileExtention(filename: string) {
    return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2)
}

function formatSize(bytes: number) {
    // Format the file size for display
    const kilobytes = bytes / 1024
    return kilobytes.toFixed(2) + ' KB'
}
</script>

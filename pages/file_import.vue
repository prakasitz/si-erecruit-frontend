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
                <v-sheet v-else rounded class="d-flex justify-center align-centerbg-surface-variant" width="100%">
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
            </v-card-text>
            <v-card-actions class="mb-6">
                <!-- rigth button -->
                <v-spacer></v-spacer>
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

<script setup lang="ts">
const theadStyle = 'text-left text-white font-weight-bold'
const tableStyle = {
    // border: '1px solid black !important',
    width: '90%',
}

const { importProfile } = useProfile()
const { showDialog, dialogInfo } = useDialog()

const loading = ref(false)
const importedData = ref<any[] | null>(null)
const files = ref<File[]>([])

definePageMeta({
    title: 'นำเข้าไฟล์',
    pageTransition: {
        name: 'rotate',
    },
    breadcrumbs: [
        {
            title: 'หน้าหลัก',
            href: '/',
        },
        {
            title: 'นำเข้าไฟล์',
        },
    ],
    middleware: ['hr-only'],
})

const cntFiles = computed(() => {
    return files.value ? files.value.length : 0
})

function onFilesDropped(f: File[]) {
    files.value = f
}

async function onClickUpload(files: File[]) {
    loading.value = true

    const resp = await importProfile(files)
    if (resp?.data) {
        importedData.value = resp.data.data
        const dialog = dialogInfo()
        showDialog(
            {
                title: 'Imported',
                message: 'Imported successfully',
                actionButtons: [
                    {
                        text: 'Upload again',
                        prependIcon: 'mdi-reload',
                        href: '/file_import',
                    },
                    {
                        text: 'Check Job Data',
                        prependIcon: 'mdi-clipboard-check',
                        color: 'indigo',
                        to: '/job_management',
                    },
                ],
                persistent: true,
            },
            dialog
        )
    }

    loading.value = false
}

function fileExtention(filename: string) {
    return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2)
}

function formatSize(bytes: number) {
    // Format the file size for display
    const kilobytes = bytes / 1024
    return kilobytes.toFixed(2) + ' KB'
}

const route = useRoute()
console.log(route.meta.title) // My home page
</script>

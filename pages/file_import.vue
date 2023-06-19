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
                    rounded
                    class="d-flex justify-center align-center mb-6 bg-surface-variant"
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
            </v-card-text>
        </v-card>
        <br />
    </div>
</template>

<script setup>
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
})

const route = useRoute()
console.log(route.meta.title) // My home page
</script>

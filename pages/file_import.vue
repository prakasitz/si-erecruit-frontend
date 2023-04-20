<template>
    <div>
        <TopicBar :labels="['หนัาหลัก', 'นำเข้าไฟล์']" />
        <v-card class="mx-auto" width="90%">
            <v-toolbar density="compact" color="main-color">
                <v-card-title :style="{ 'font-weight': 'bold', 'font-size': '16px !important' }">
                    <span class="text-h5 font-weight-bold">Import File (*.xlsx)</span><br />
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
        <v-card class="mx-auto" width="400" prepend-icon="mdi-home">
            <template v-slot:title>Hello from Vuetify!</template>
            <v-card-text>When you see this inside a card, it worked!</v-card-text>
        </v-card>
    </div>
</template>

<script setup>
definePageMeta({
    title: 'Import File',
    pageTransition: {
        name: 'rotate',
    },
})

const route = useRoute()
console.log(route.meta.title) // My home page
</script>

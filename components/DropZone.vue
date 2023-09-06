<template>
    <!-- add `data-active` and the event listeners -->
    <div
        class="drop-zone"
        :class="{ active: active }"
        :data-active="active"
        :style="{ width: `100%`, height: `100%`, borderRadius: 'inherit' }"
        @dragenter.prevent="setActive"
        @dragover.prevent="setActive"
        @dragleave.prevent="setInactive"
        @drop.prevent="onDrop"
        @click="openFileExplorer"
    >
        <!-- share state with the scoped slot -->
        <input
            ref="fileInput"
            name="file"
            type="file"
            accept=".xls, .xlsx"
            style="display: none"
            @change="onFileInputChange"
        />
        <slot :dropZoneActive="active"></slot>
    </div>
</template>

<style scoped>
.drop-zone {
    cursor: pointer;
    background-color: inherit;
    filter: none;
    background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke-width='7' stroke-dasharray='8%2c 16%2c 19%2c 20' stroke-dashoffset='0' stroke='%238A8A8A' stroke-linecap='butt'/%3e%3c/svg%3e");

    /* Set the transition properties for the background-color and filter */
    transition-property: background-color, filter;
    transition-duration: 0.3s;
    transition-timing-function: ease-in-out;
}

.drop-zone:hover {
    background: linear-gradient(to right, #1e88e5, #b1afaf, #a86d3c);
    background-size: 400% 100%;
    animation: gradient 2s ease-in-out infinite;
}

@keyframes gradient {
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
}
.drop-zone.active {
    background-color: #4b0303;
    backdrop-filter: blur(4px);
}
</style>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface PropsDropZone {
    width: string
    height: string
}

const fileInput = ref<HTMLInputElement | null>(null)

const props = withDefaults(defineProps<PropsDropZone>(), {
    width: '80%',
    height: '100px',
})

const emit = defineEmits(['files-dropped'])

// Create `active` state and manage it with functions
let active = ref(false)
let inActiveTimeout: NodeJS.Timeout

function setActive() {
    active.value = true
    clearTimeout(inActiveTimeout) // clear the timeout
}
function setInactive() {
    // wrap it in a `setTimeout`
    inActiveTimeout = setTimeout(() => {
        active.value = false
    }, 50)
}

function onDrop(e: DragEvent) {
    setInactive() // add this line too
    const files = Array.from(e.dataTransfer?.files || [])
    emit('files-dropped', files)
}

function preventDefaults(e: Event) {
    e.preventDefault()
}

function openFileExplorer() {
    fileInput.value?.click() // Use the optional chaining operator to avoid errors if fileInput is null or undefined
}

function onFileInputChange(e: Event) {
    const files = [...((e.target as HTMLInputElement).files as FileList)]
    if (files) {
        emit('files-dropped', [...files])
    }
}

const events = ['dragenter', 'dragover', 'dragleave', 'drop']

onMounted(() => {
    events.forEach((eventName) => {
        document.body.addEventListener(eventName, preventDefaults)
    })
})

onUnmounted(() => {
    events.forEach((eventName) => {
        document.body.removeEventListener(eventName, preventDefaults)
    })
})
</script>

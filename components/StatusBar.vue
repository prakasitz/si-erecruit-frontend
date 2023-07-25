<template>
    <div class="container">
        <template v-for="node in nodeList">
            <div v-if="node.index != 0" class="line"></div>
            <div class="node" :class="getNodeFill(node.index, node.text)">
                <div class="text">{{ toCapitalizeCase(node.text) }}</div>
            </div>
        </template>
    </div>
</template>

<script setup lang="ts">
import { JobStatusType } from '~/utils/types';

export interface Props {
    status?: JobStatusType
}

type NodeList = {
    index: number
    text: JobStatusType
    class: string
}

const props = defineProps<Props>()
const nodeList: NodeList[] = [
    {
        index: 0,
        text: JobStatus.IMPORTED,
        class: 'inactive',
    },
    {
        index: 1,
        text: JobStatus.PUBLISHED,
        class: 'inactive',
    },
    {
        index: 2,
        text: JobStatus.VERIFYING,
        class: 'inactive',
    },
    {
        index: 3,
        text: JobStatus.APPROVED,
        class: 'inactive',
    },
    {
        index: 4,
        text: JobStatus.CLOSED,
        class: 'inactive',
    },
]

const getNodeFill = (index: number, status: JobStatusType) => {
    //check props.status in nodeList.class
    // check props not null
    let isInNodeList = nodeList.find((node) => node.text === status)
    if (!props.status || !isInNodeList) return 'inactive'
    let statusIndex = nodeList.findIndex((node) => node.text === props.status)
    if (index < nodeList.findIndex((node) => node.text === props.status)) {
        return 'actived'
    } else if (index == statusIndex) {
        return 'active'
    } else {
        return 'inactive'
    }
}
</script>

<style scoped>
.container {
    min-width: 318.64px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 70%;
    margin-right: 25px;
}

.text {
    position: relative;
    bottom: -43px;
    font-size: 14px;
}

.node.actived + .line {
    background-color: #64d364;
}

.node.actived {
    background-color: #64d364;
    box-shadow: 0 0 10px green;
    color: #64d364;
}

.node.active {
    background-color: rgb(112 185 255);
    box-shadow: 0 0 10px rgb(30, 136, 229);
    color: rgb(112 185 255);
    font-weight: 700;
}

.node.inactive {
    background-color: #ccc;
    box-shadow: 0 0 10px #ccc;
    color: #ccc;
}

.node {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    border: 2px solid #e6e6e6c2;
}

.line {
    height: 6px;
    background-color: #ccc;
    flex-grow: 1;
}
</style>

<template>
    <div class="container">
        <div class="node" :class="getNodeFill(0)">
            <div class="text">Imported</div>
        </div>
        <div class="line"></div>
        <div class="node" :class="getNodeFill(1)">
            <div class="text">Published</div>
        </div>
        <div class="line"></div>
        <div class="node" :class="getNodeFill(2)">
            <div class="text">Verified</div>
        </div>
        <div class="line"></div>
        <div class="node" :class="getNodeFill(3)">
            <div class="text">Approve</div>
        </div>
        <div class="line"></div>
        <div class="node" :class="getNodeFill(4)">
            <div class="text">Closed</div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            activeNode: 2, // set this to the index of the active node
        }
    },
    methods: {
        getNodeFill(index) {
            if (this.activeNode > index) {
                return 'actived'
            } else if (this.activeNode == index) {
                return 'active'
            } else {
                return 'inactive'
            }
        },
    },
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

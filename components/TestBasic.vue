<template>
    <p>Has published books:</p>
    <span>{{ publishedBooksMessage }}</span>
    <ul>
        <li v-for="book in author.books" :key="book">{{ book }}</li>
    </ul>
    <br />
    <button @click="addBook">Add book</button>
</template>
<script setup>
import { reactive, computed } from 'vue'

const author = reactive({
    name: 'John Doe',
    books: ['Vue 2 - Advanced Guide', 'Vue 3 - Basic Guide', 'Vue 4 - The Mystery'],
})

// a computed ref
const publishedBooksMessage = computed(() => {
    return author.books.length > 0 ? 'Yes' : 'No'
})

function addBook() {
    author.books.push('Vue 5 - The Next Generation')
}
</script>

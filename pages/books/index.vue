<script setup>
import { books } from '~/data/books'

const wipBooks = books.filter(b => b.wip)
const finishedBooks = books.filter(b => !b.wip)

const sortedFinishedBooks = finishedBooks.sort((a, b) => new Date(b.published) - new Date(a.published));

const sortedBooks = [...sortedFinishedBooks, ...wipBooks]
</script>

<template>
    <n-section class="bg-gray-100">
        <h2 class="text-4xl font-bold mb-4 text-center mt-16">Alle Bücher</h2>
        <div class="flex justify-center py-16 gap-16 flex-wrap">
            <n-book v-for="book in sortedBooks" :book="book" />
        </div>
    </n-section>
</template>
<script setup>
import { books } from '~/data/books'
</script>

<template>
    <n-section class="bg-gray-100">
        <h2 class="text-4xl font-bold mb-4 text-center">Alle Bücher</h2>
        <div class="flex justify-center py-16 gap-16 flex-wrap">
            <n-book v-for="book in books" :book="book" />
        </div>
    </n-section>
</template>
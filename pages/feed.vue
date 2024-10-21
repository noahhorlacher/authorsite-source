<script setup>
import { feed } from '~/data/feed'
</script>

<template>
    <n-section class="bg-gray-100">
        <h2 class="text-4xl font-bold mt-16 mb-4 text-center">Feed</h2>
        <p class="mb-32 text-center">Jetzt Frage stellen auf <nuxt-link class="underline" to="https://www.goodreads.com/author/52548579.Noah_Horlacher/questions">goodreads.com</nuxt-link></p>
        <div class="flex flex-col items-center gap-8">
            <article v-for="piece of feed" class="bg-white shadow-lg pt-8 pb-12 px-12 max-w-[700px] rounded-xl">
                <div class="flex flex-row justify-between items-center mb-8">
                    <div class="bg-gray-200 inline-block px-2 py-1 rounded-md">{{ piece.type }}</div>
                    <div class="flex flex-row items-center gap-2 opacity-70">
                        <Icon name="tabler:calendar" class="w-6 h-6" />
                        <p class="mt-1">{{ formatDate(piece.date) }}</p>
                    </div>
                </div>

                <h3 class="text-lg font-bold mb-4">{{ piece.title }}</h3>
                <div class="whitespace-pre-line mb-6">{{ piece.content }}</div>
            </article>
        </div>
    </n-section>
</template>
<script setup>
import { quotes } from '~/data/quotes'
</script>

<template>
    <n-section class="bg-gray-100 mt-16">
        <h2 class="text-4xl font-bold  text-center">Zitate</h2>
        <p class="text-center mb-16 md:mb-24 mt-4">Jetzt Zitat hinzufügen auf <nuxt-link class="underline" to="https://www.goodreads.com/author/quotes/52548579.Noah_Horlacher">goodreads.com</nuxt-link></p>

        <div class="flex gap-8 gap-y-12 flex-wrap justify-center text-center">
            <figure v-for="quote in quotes" class="max-w-[400px]">
                <Icon name="tabler:quote" class="w-14 h-14 text-gray-500" />
                <blockquote class="whitespace-pre-line italic text-md md:text-lg">
                    «{{  quote.text }}»
                </blockquote>
                <figcaption class="mt-6">
                    <cite class="italic text-md text-gray-600" v-if="quote.speaker">{{ quote.speaker }}</cite>
                    <div class="flex-col md:flex-row">
                        <cite class="italic text-sm text-gray-600">{{ quote.source }}</cite>
                    </div>
                </figcaption>
            </figure>
        </div>
    </n-section>
</template>
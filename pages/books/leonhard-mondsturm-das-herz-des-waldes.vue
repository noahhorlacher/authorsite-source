<script setup>
import { books } from '~/data/books'

const bookId = 'leonhard-mondsturm-das-herz-des-waldes'

const book = ref({
    title: '',
    subtitle: ''
})

book.value = books.find(b => b.id == bookId)

const reviews = []
</script>

<template>
    <n-section class="bg-gray-100">
        <img :src="book.img" class="mx-auto mt-12 max-h-[700px] shadow-2xl rounded-xl mb-16" />
        <h1 class="text-2xl md:text-4xl text-center font-bold mb-4">{{ book.title }}</h1>
        <h2 class="mb-4 text-center">{{ book.subtitle }}</h2>
        <h3 class="opacity-70 font-bold text-center">{{ formatDate(book.published) }}</h3>
    </n-section>

    <n-section class="!pb-6">
        <h3 class="mb-4 text-lg md:text-xl font-bold w-full whitespace-normal">Beschreibung</h3>
        <p>{{ book.description }}</p>
    </n-section>

    <n-section class="!py-6">
        <h3 class="text-lg md:text-xl mb-4 font-bold w-full whitespace-normal">Kauflinks & Leseprobe</h3>
        <p>Auf Amazon als eBook, gebundenes Buch und Taschenbuch erhältlich.</p>
        <div class="pt-8 flex gap-4 flex-wrap">
            <n-button variant="black" :link="book.amazonUrl">
                <Icon class="mr-4 w-5 h-5" name="tabler:brand-amazon" />
                <p>auf&nbsp;Amazon</p>
            </n-button>
        </div>
    </n-section>

    <n-section class="!pt-6 pb-32">
        <h3 class="text-lg md:text-xl mb-4 font-bold w-full whitespace-normal">Rezensionen</h3>
        <div class="flex items-center mb-8">
            <Icon class="mr-4 w-5 h-5" name="tabler:info-circle" />
            <p>von <nuxt-link class="underline" to="https://www.goodreads.com/book/show/220572266-leonhard-mondsturm">goodreads.com</nuxt-link></p>
        </div>

        <div class="py-8">
            <div class="italic" v-if="reviews.length == 0">
                Es existieren noch keine Rezensionen. <nuxt-link to="https://www.goodreads.com/book/show/220572266-leonhard-mondsturm" class="underline">Schreibe das erste Review</nuxt-link>
            </div>
        </div>
    </n-section>
</template>
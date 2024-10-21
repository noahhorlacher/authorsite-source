<script setup>
defineProps({
    book: Object
})
</script>

<template>
    <div class="max-w-xs grow-0 shrink-0">

        <nuxt-link :to="book.detailsUrl" v-if="book.img">
            <img class="shadow-xl rounded-xl mb-12 hover:shadow-2xl transition-shadow" :src="book.img" />
        </nuxt-link>
        <div class="relative" v-else-if="!book.img && !book.wip">
            <img class="shadow-xl rounded-xl mb-12 hover:shadow-2xl transition-shadow" src="/covers/book_placeholder.png" />
        </div>
        <div class="relative" v-else-if="book.wip">
            <img class="shadow-xl rounded-xl mb-12 hover:shadow-2xl transition-shadow" src="/covers/book_placeholder.png" />
            <div class="absolute text-center left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <Icon name="tabler:clock" class="w-8 h-8" />
                <p>Work in progress</p>
            </div>
        </div>


        <h3 class="text-black font-bold text-xl opacity-70 mb-1">{{ book.title }}</h3>
        <h4 v-if="book.subtitle" class="text-black font-bold text-md opacity-50 mb-4">{{ book.subtitle }}</h4>
        <p v-if="book.seriesDescription" class="font-bold mt-6 mb-2 opacity-70">{{ book.seriesDescription }}</p>
        <h4 v-if="book.published" class="opacity-70 mb-4">{{ formatDate(book.published) }}</h4>

        
        <p v-if="book.shortDescription" class="opacity-70">{{ book.shortDescription }}</p>
        <n-rating v-if="!book.wip" :value="book.rating" class="mt-8" />

        <div v-if="book.wip" class="flex flex-row gap-4 items-center mt-2">
            <Icon name="tabler:info-circle" />
            <p>An diesem Buch wird gearbeitet.</p>
        </div>
        
        <div v-if="book.published" class="pt-8 flex gap-4 flex-wrap">
            <n-button :link="book.detailsUrl" variant="black-outline">
                <Icon class="mr-4 w-5 h-5" name="tabler:eyeglass" />
                <p>Details</p>
            </n-button>
        </div>
    </div>
</template>
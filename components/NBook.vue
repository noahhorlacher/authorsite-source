<script setup>
defineProps({
    book: Object
})
</script>

<template>
    <div class="max-w-xs grow-0 shrink-0">

        <div v-if="book.cover" class="relative mb-12 group rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow" @click="flipBook">
            <img :src="'/covers/' + book.id + '/front.jpg'" alt="Front Cover" class="w-full h-full object-cover" />
            <img :src="'/covers/' + book.id + '/back.jpg'" alt="Back Cover" class="absolute top-0 left-0 w-full h-full object-cover opacity-0 transition-opacity group-hover:opacity-100" />
        </div>

        <div v-else-if="!book.cover && !book.wip">
            <div class="relative">
                <img class="shadow-xl rounded-xl mb-12 hover:shadow-2xl transition-shadow" src="/covers/book_placeholder.png" />
            </div>
        </div>
        <div v-else-if="!book.cover & book.wip">
            <div class="relative">
                <img class="shadow-xl rounded-xl mb-12 hover:shadow-2xl transition-shadow" src="/covers/book_placeholder.png" />
                <div class="absolute text-center left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Icon name="tabler:clock" class="w-8 h-8" />
                    <p>Work in progress</p>
                </div>
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
        
        <div class="pt-8 flex gap-4 flex-wrap">
            <n-button :link="'/books/' + book.id" variant="black-outline">
                <Icon class="mr-4 w-5 h-5" name="tabler:eyeglass" />
                <p>Details</p>
            </n-button>
        </div>
    </div>
</template>

<style scoped>
</style>
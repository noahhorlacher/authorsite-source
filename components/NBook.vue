<script setup>
defineProps({
    book: Object
})
</script>

<template>
    <div class="max-w-xs grow-0 shrink-0">

        <div v-if="book.hasCover" class="relative mb-12 group rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow">
            <img :src="'/covers/' + book.id + '/front.jpg'" alt="Front Cover" class="w-full h-full object-cover" />
            <img :src="'/covers/' + book.id + '/back.jpg'" alt="Back Cover" class="absolute top-0 left-0 w-full h-full object-cover opacity-0 transition-opacity group-hover:opacity-100" />
        </div>
        <div v-else>
            <div class="relative">
                <img class="shadow-xl rounded-xl mb-12 hover:shadow-2xl transition-shadow" src="/img/book_placeholder.png" />
                <div v-if="book.workInProgress" class="absolute text-center left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Icon name="tabler:clock" class="w-8 h-8" />
                    <p>Work in progress</p>
                </div>
            </div>
        </div>


        <h3 class="text-black font-bold text-xl md:text-3xl opacity-70 mb-1 md:mb-3">{{ book.title }}</h3>
        <h4 v-if="book.subtitle" class="text-black font-semibold text-lg opacity-70 mb-1">{{ book.subtitle }}</h4>
        
        <p v-if="book.description_short" class="opacity-70 mt-4">{{ book.description_short }}</p>

        <div v-if="book.workInProgress" class="flex flex-row gap-4 items-center mt-4">
            <Icon name="tabler:info-circle" />
            <p>An diesem Buch wird gearbeitet.</p>
        </div>
        
        <div class="pt-8 flex gap-4 flex-wrap">
            <n-button :link="'/books/' + book.id" variant="outline">
                <Icon class="mr-4 w-5 h-5" name="tabler:eyeglass" />
                <p>Details</p>
            </n-button>
        </div>
    </div>
</template>

<style scoped>
</style>
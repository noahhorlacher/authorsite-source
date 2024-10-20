<script setup>
defineProps({
    book: Object
})
</script>

<template>
    <div class="max-w-xs">

        <nuxt-link :to="book.detailsUrl" v-if="book.img">
            <img class="shadow-xl rounded-xl mb-12 hover:shadow-2xl transition-shadow" :src="book.img" />
        </nuxt-link>
        <div class="relative w-full pb-[141%] bg-gray-300 rounded-xl shadow-xl mb-12 hover:shadow-2xl transition-shadow" v-else>
            <div v-if="book.wip" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center gap-2">
                <Icon name="tabler:clock" />
                <p>Work&nbsp;in&nbsp;Progress</p>
            </div>
        </div>


        <h3 class="text-black font-bold text-xl opacity-70 mb-4">{{ book.subtitle ? book.title + ' – ' + book.subtitle :
            book.title }}
        </h3>
        <p v-if="book.seriesDescription" class="font-bold mt-6 mb-2 opacity-70">{{ book.seriesDescription }}</p>
        <h4 v-if="book.published" class="opacity-70 mb-4">{{ formatDate(book.published) }}</h4>
        <p v-if="book.shortDescription" class="opacity-70">{{ book.shortDescription }}</p>

        <div v-if="book.published" class="pt-8 flex gap-4 flex-wrap">
            <n-button :link="book.amazonUrl" variant="black-outline">
                <Icon class="mr-4 w-5 h-5" name="tabler:brand-amazon" />
                <p>auf&nbsp;Amazon</p>
            </n-button>
            <n-button :link="book.detailsUrl" variant="outline">
                <Icon class="mr-4 w-5 h-5" name="tabler:eyeglass" />
                <p>Details</p>
            </n-button>
        </div>
    </div>
</template>
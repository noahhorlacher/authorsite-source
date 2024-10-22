<script setup>
import { books } from '~/data/books'

const route = useRoute()
const id = route.params.id

const book = ref()
book.value = books.find(b => b.id == id)

const error = ref(false)

onMounted(() => {
    if(!book.value){
        error.value = true
    }
})
</script>

<template>
    <div v-if="book && !error">
        <n-section class="bg-gray-100">
            <div class="flex justify-center w-full select-none">
                <img v-if="book.img" :src="book.img" class="mx-auto mt-12 max-h-[700px] shadow-2xl rounded-xl mb-16" />
                <div v-else class="relative text-center max-h-[700px] w-full mt-12 mb-16">
                    <img class="shadow-xl mx-auto rounded-xl mb-12 max-h-[700px] hover:shadow-2xl transition-shadow" src="/covers/book_placeholder.png" />
                    <div class="absolute text-center left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                        <Icon name="tabler:clock" class="w-8 h-8" />
                        <p>Work in progress</p>
                    </div>
                </div>
            </div>
            <h1 class="text-2xl md:text-4xl text-center font-bold mb-4">{{ book.title }}</h1>
            <h2 class="mb-4 text-center">{{ book.subtitle }}</h2>
            <h3 v-if="book.published" class="opacity-70 font-bold text-center">{{ formatDate(book.published) }}</h3>
            <n-rating v-if="!book.wip" :rating="book.rating" class="text-center mt-8" />
            <div v-if="book.wip" class="flex flex-row gap-4 items-center justify-center mt-2">
                <Icon name="tabler:info-circle" />
                <p>An diesem Buch wird gearbeitet.</p>
            </div>
        </n-section>

        <n-section class="!pb-6">
            <h3 class="mb-4 text-lg md:text-xl font-bold w-full whitespace-normal">Beschreibung</h3>
            <p>{{ book.description }}</p>
        </n-section>

        <n-section class="!py-6" v-if="book.pdfReadingSample || book.epubReadingSample">
            <h3 class="text-lg md:text-xl mb-4 font-bold w-full whitespace-normal">Leseprobe</h3>
            <p>Die ersten 20% des Buches als Leseprobe.</p>
            <div class="pt-8 flex gap-4 flex-wrap">
                <n-button variant="black" :download="book.pdfReadingSample" v-if="book.pdfReadingSample">
                    <Icon class="mr-4 w-5 h-5" name="tabler:download" />
                    <p>Download .pdf</p>
                </n-button>
                <n-button variant="black" :download="book.epubReadingSample" v-if="book.epubReadingSample">
                    <Icon class="mr-4 w-5 h-5" name="tabler:download" />
                    <p>Download .epub</p>
                </n-button>
            </div>
        </n-section>

        <n-section class="!py-6" v-if="book.amazonUrl || (book.otherLinks && book.otherLinks.length > 0)">
            <h3 class="text-lg md:text-xl mb-4 font-bold w-full whitespace-normal">Kauflinks</h3>
            <p>Als eBook, gebundenes Buch und Taschenbuch erhältlich.</p>
            <div class="pt-8 flex gap-4 flex-wrap">
                <n-button variant="black" :link="book.amazonUrl" v-if="book.amazonUrl">
                    <Icon class="mr-4 w-5 h-5" name="tabler:brand-amazon" />
                    <p>Amazon</p>
                </n-button>
                <n-button variant="black" v-for="otherLink of book.otherLinks" :link="otherLink.url" v-if="book.otherLinks && book.otherLinks.length > 0">
                    <Icon class="mr-4 w-5 h-5" name="tabler:link" />
                    <p>{{ otherLink.label }}</p>
                </n-button>
            </div>
        </n-section>

        <n-section class="!pt-6 pb-32" v-if="!book.wip">
            <h3 class="text-lg md:text-xl mb-4 font-bold w-full whitespace-normal">Rezensionen</h3>
            <div class="flex items-center mb-8">
                <Icon class="mr-4 w-5 h-5" name="tabler:info-circle" />
                <p>von <nuxt-link class="underline" :to="book.reviewsUrl">goodreads.com</nuxt-link></p>
            </div>
            <n-rating :rating="book.rating" :url="book.reviewsUrl" />
            <div class="py-8">
                <p class="italic text-sm" v-if="book.reviews.length == 0">
                    Es existieren noch keine Rezensionen. <nuxt-link :to="book.reviewsUrl" class="underline">Schreibe das erste Review</nuxt-link>
                </p>
            </div>
        </n-section>
        <p  class="mb-12" v-else></p>
    </div>
    <div v-else-if="error">
        <div class="min-h-screen grid place-items-center">
        <div class="flex flex-col items-center">
            <h1 class="font-bold text-[3rem]">Hmm...</h1>
            <h2 class="mb-8">Etwas stimmt nicht.</h2>
            <n-button link="/" variant="outline">
                <Icon name="tabler:arrow-left" class="w-5 h-5 mr-4"></Icon>
                <p>
                    Zurück
                </p>
            </n-button>
        </div>
    </div>
    </div>

</template>
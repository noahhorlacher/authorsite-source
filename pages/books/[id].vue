<script setup>
import { booksIndex } from '~/data/books_index'

const route = useRoute()
const id = route.params.id

const book = ref()
book.value = booksIndex.find(b => b.id == id)

const error = ref(!book.value)
</script>

<template>
    <div v-if="book && !error">
        <n-section class="bg-gray-100">
            <div class="flex justify-center w-full select-none">
                <div v-if="book.cover" class="relative mb-12 group mx-auto mt-12 w-auto rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow" @click="flipBook">
                    <img class="max-h-[700px]" :src="'/covers/' + book.id + '/front.jpg'" alt="Front Cover" />
                    <img class="max-h-[700px] absolute top-0 left-0 opacity-0 transition-opacity group-hover:opacity-100" :src="'/covers/' + book.id + '/back.jpg'" alt="Back Cover" />
                </div>
                
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
            <h3 class="mb-4 text-lg md:text-xl font-bold w-full">Beschreibung</h3>
            <p>{{ book.description }}</p>
        </n-section>

        <n-section class="!pt-6" v-if="book.wip && book.excerpt">
            <h3 class="mb-4 text-lg md:text-xl font-bold w-full">Auszug</h3>
            <h4 v-if="book.excerpt.title" class="mb-4 text-md md:text-lg font-bold w-full">{{ book.excerpt.title }}</h4>
            <p class=" whitespace-pre-line">{{ book.excerpt.text }}</p>
        </n-section>

        <n-section class="!py-6" v-if="book.pdfReadingSample || book.epubReadingSample">
            <h3 class="text-lg md:text-xl mb-4 font-bold w-full">Leseprobe</h3>
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
            <div v-if="!book.wip && book.orderInformation" class="text-sm rounded-md max-w-[600px] bg-gray-200 py-4 px-6 italic my-6">
                <p>{{ book.orderInformation }}</p>
            </div>
            
            <p class="mb-8">Als eBook, gebundenes Buch und Taschenbuch erhältlich.</p>

            <p class="font-bold mt-4 mb-2">Empfohlen</p>
            <div class="flex gap-4 flex-wrap">
                <n-dropdown v-if="book.orellfuessli" :menu-items="book.orellfuessli">
                    <Icon class="mr-4 w-5 h-5" name="tabler:book" />
                    <p>Orell Füssli</p>
                </n-dropdown>
                <n-button variant="black" :link="book.amazonUrl" v-if="book.amazonUrl">
                    <Icon class="mr-4 w-5 h-5" name="tabler:brand-amazon" />
                    <p>Amazon</p>
                </n-button>
            </div>

            <p class="font-bold mt-4 mb-2">Andere</p>
            <div class="flex gap-4 flex-wrap">
                <n-button variant="outline" :link="book.playUrl" v-if="book.playUrl">
                    <Icon class="mr-4 w-5 h-5" name="tabler:brand-google-play" />
                    <p>Play Store</p>
                </n-button>
                <n-button variant="outline" :link="book.appleUrl" v-if="book.appleUrl">
                    <Icon class="mr-4 w-5 h-5" name="tabler:brand-appstore" />
                    <p>Apple Books</p>
                </n-button>
                <n-button variant="outline" v-for="otherLink of book.otherLinks" :link="otherLink.url" v-if="book.otherLinks && book.otherLinks.length > 0">
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
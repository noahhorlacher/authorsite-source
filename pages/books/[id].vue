<script setup>
const runtimeConfig = useRuntimeConfig()
const { findOne } = useStrapi()

const route = useRoute()
const id = route.params.id

const book = ref({
    coverBack: false,
    coverFront: false,
    workInProgress: true,
    recommendedBuyLinks: [],
    otherBuyLinks: []
})

const bookData = await useAsyncData('getBookById', async () => {
    try {
    const { data } = await findOne('books', id, {
        populate: '*'
    })

    const recommendedBuyLinks = []
    for(let recommendedBuyLink of data.recommendedBuyLinks) {
        const { data: links } = await findOne('labeled-link-collections', recommendedBuyLink.documentId, {
            populate: '*'
        })

        recommendedBuyLinks.push(links)
    }
    data.recommendedBuyLinks = recommendedBuyLinks

    const otherBuyLinks = []
    for(let otherBuyLink of data.otherBuyLinks) {
        const { data: links } = await findOne('labeled-link-collections', otherBuyLink.documentId, {
            populate: '*'
        })

        otherBuyLinks.push(links)
    }
    data.otherBuyLinks = otherBuyLinks

    return data
} catch(error) {
    throw createError({ statusCode: 404, message: 'Book not found.', fatal: true })
}
}, { deep: true })

book.value = bookData.data.value
</script>

<template>
    <div v-if="book" class="pb-16">
        <!-- Hero -->
        <n-section :class="['relative !pb-36 flex flex-col items-stretch', book.darkBackground ? 'text-white' : 'text-black']">
            <!-- Background -->
            <div class="absolute bg-fixed bg-gray-100 -z-10 w-full h-full top-0 left-0 bg-cover bg-center" :style="{ backgroundImage: `url(${runtimeConfig.public.mediaUrl + book.backgroundImage.formats.large.url})` }">
            </div>

            <!-- Cover -->
            <div class="flex justify-center w-full select-none">
                <div v-if="book.coverFront && book.coverBack"
                    class="relative mb-12 group mx-auto mt-12 w-auto rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow"
                    @click="flipBook">
                    <img class="max-h-[700px]" :src="runtimeConfig.public.mediaUrl + book.coverFront.formats.small.url" alt="Front Cover" />
                    <img class="max-h-[700px] absolute top-0 left-0 opacity-0 transition-opacity group-hover:opacity-100"
                        :src="runtimeConfig.public.mediaUrl + book.coverBack.formats.small.url" alt="Back Cover" />
                </div>

                <div v-else class="relative text-center max-h-[700px] w-full mt-12 mb-16">
                    <img class="shadow-xl mx-auto rounded-xl mb-12 max-h-[700px] hover:shadow-2xl transition-shadow"
                        src="/img/book_placeholder.png" />
                    <div v-if="book.workInProgress" class="absolute text-center left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-black">
                        <Icon name="tabler:clock" class="w-8 h-8" />
                        <p>Work in progress</p>
                    </div>
                </div>
            </div>

            <!-- Book Short Info -->
            <div :class="['bg-opacity-30 backdrop-blur-md rounded-xl overflow-hidden mx-auto px-7 py-5', book.darkBackground ? 'bg-black' : 'bg-white']">
                <h1 class="text-2xl md:text-4xl text-center font-bold mb-2 opacity-90">{{ book.title }}</h1>
                <h2 class="mb-6 text-center text-lg opacity-80">{{ book.subtitle }}</h2>
                
                <div v-if="book.publishedDate" class="flex items-center gap-2 justify-center opacity-90">
                    <Icon name="tabler:calendar" class="w-5 h-5" />
                    <h3 class="opacity-70 font-bold text-center">{{ formatDate(book.publishedDate) }}</h3>
                </div>
                
                <n-rating v-if="!book.workInProgress" :rating="book.rating" class="text-center mt-8 opacity-80" />
                <div v-if="book.workInProgress" class="flex flex-row gap-4 items-center justify-center mt-2 opacity-90">
                    <Icon name="tabler:info-circle" />
                    <p>An diesem Buch wird gearbeitet.</p>
                </div>
            </div>
        </n-section>

        <!-- Description -->
        <n-section class="!pb-6">
            <h3 class="mb-4 text-lg md:text-xl font-bold w-full">Beschreibung</h3>
            <p>{{ book.description }}</p>
        </n-section>

        <!-- Excerpt -->
        <n-section class="!pt-6" v-if="book.workInProgress && book.excerpt">
            <h3 class="mb-4 text-lg md:text-xl font-bold w-full">Auszug</h3>
            <h4 v-if="book.excerpt.title" class="mb-4 text-md md:text-lg font-bold w-full">{{ book.excerpt.title }}</h4>
            <p class=" whitespace-pre-line">{{ book.excerpt.text }}</p>
        </n-section>

        <!-- Reading Samples -->
        <n-section class="!py-6" v-if="book.readingSamplePdf || book.readingSampleEpub">
            <h3 class="text-lg md:text-xl mb-4 font-bold w-full">Leseprobe</h3>
            <p>Die ersten 20% des Buches als Leseprobe.</p>
            <div class="pt-8 flex gap-4 flex-wrap">
                <n-button variant="black" :download="runtimeConfig.public.mediaUrl + book.readingSamplePdf.url" v-if="book.readingSamplePdf">
                    <Icon class="mr-4 w-5 h-5" name="tabler:download" />
                    <p>Download .pdf</p>
                </n-button>
                <n-button variant="black" :download="runtimeConfig.public.mediaUrl + book.readingSampleEpub.url" v-if="book.readingSampleEpub">
                    <Icon class="mr-4 w-5 h-5" name="tabler:download" />
                    <p>Download .epub</p>
                </n-button>
            </div>
        </n-section>

        <!-- Buy Links -->
        <n-section class="!py-6" v-if="!book.workInProgress && book.recommendedBuyLinks.length + book.otherBuyLinks.length > 0">
            <h3 class="text-lg md:text-xl mb-4 font-bold w-full whitespace-normal">Kauflinks</h3>
            <div v-if="!book.workInProgress && book.orderInformation"
                class="text-sm rounded-md max-w-[600px] bg-gray-200 py-4 px-6 italic my-6">
                <p>{{ book.orderInformation }}</p>
            </div>

            <p class="mb-8">{{ book.mediaText }}</p>

            <p class="font-bold mt-4 mb-2">Empfohlen</p>
            <div class="flex gap-4 flex-wrap">
                <div v-for="link of book.recommendedBuyLinks">
                    <n-dropdown v-if="link.labeled_links.length > 1" :menu-items="link.labeled_links">
                        <Icon class="mr-4 w-5 h-5" :name="link.iconName" />
                        <p>{{ link.title }}</p>
                    </n-dropdown>
                    <n-button v-else variant="black" :link="link.labeled_links[0].url">
                        <Icon class="mr-4 w-5 h-5" :name="link.iconName" />
                        <p>{{ link.title }}</p>
                    </n-button>
                </div>
            </div>

            <p class="font-bold mt-4 mb-2">Andere</p>
            <div class="flex gap-4 flex-wrap">
                <div v-for="link of book.otherBuyLinks">
                    <n-dropdown v-if="link.labeled_links.length > 1" :menu-items="link.labeled_links">
                        <Icon class="mr-4 w-5 h-5" :name="link.iconName" />
                        <p>{{ link.title }}</p>
                    </n-dropdown>
                    <n-button v-else variant="outline" :link="link.labeled_links[0].url">
                        <Icon class="mr-4 w-5 h-5" :name="link.iconName" />
                        <p>{{ link.title }}</p>
                    </n-button>
                </div>
            </div>

        </n-section>

        <!-- Reviews -->
        <n-section class="!pt-6 pb-32" v-if="!book.workInProgress">
            <h3 class="text-lg md:text-xl mb-4 font-bold w-full whitespace-normal">Rezensionen</h3>
            <div class="flex items-center mb-8">
                <Icon class="mr-4 w-5 h-5" name="tabler:info-circle" />
                <p>von <nuxt-link class="underline" :to="book.reviewsUrl">goodreads.com</nuxt-link></p>
            </div>
            <n-rating v-if="!book.workInProgress" :value="book.rating" :url="book.reviewsUrl" />
        </n-section>
        <p class="mb-12" v-else></p>
    </div>
</template>
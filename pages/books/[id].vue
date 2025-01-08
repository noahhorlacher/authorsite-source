<script setup>
const { getItemById, getItems } = useDirectusItems()
const { getThumbnail } = useDirectusFiles()

const route = useRoute()
const id = route.params.id

const book = ref({})
const buylinks = ref([])

const { data } = await useAsyncData(
    async () => {
        const bookItem = await getItemById({
            collection: 'books',
            id: id
        })

        return bookItem
    }
)

book.value = data.value

const buylinksFormats = ref(['eBook', 'gebundene Ausgabe', 'Taschenbuch']) 

const { data: buylinksData } = await useAsyncData(
    async () => {
        const platforms = await getItems({
            collection: 'releaseplatforms',
        })

        const buylinksItems = await getItems({
            collection: 'buylinks',
            params: {
                filter: {
                    book: id
                }
            }
        })

        for(let i = 0; i < buylinksItems.length; i++){
            buylinksItems[i].platform = platforms.find(p => p.id == buylinksItems[i].platform).name
        }

        return buylinksItems
    }
)

buylinks.value = buylinksData.value
</script>

<template>
    <div v-if="book" class="pb-16">
        <!-- Hero -->
        <n-section :class="['relative !pb-36 flex flex-col items-stretch text-black']">
            <!-- Background -->
            <div
                class="absolute bg-fixed bg-gradient-to-b from-gray-500 to-gray-900 -z-10 w-full h-full top-0 left-0 bg-cover bg-center">
            </div>

            <div class="relative rounded-xl -mb-32 mt-16 flex flex-col items-stretch">
                <!-- Cover -->
                <div class="flex justify-center w-full select-none">
                    <div v-if="book.cover_front && book.cover_back"
                        class="relative group w-auto rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow"
                        @click="flipBook">
                        <img class="max-h-[700px]" :src="getThumbnail(book.cover_front)" alt="Front Cover" />
                        <img class="max-h-[700px] absolute top-0 left-0 opacity-0 transition-opacity group-hover:opacity-100"
                            :src="getThumbnail(book.cover_back)" alt="Back Cover" />
                    </div>

                    <div v-else class="relative text-center max-h-[700px] w-full">
                        <img class="shadow-xl mx-auto rounded-xl mb-12 max-h-[700px] hover:shadow-2xl transition-shadow"
                            src="/img/book_placeholder.png" />
                        <div v-if="book.workInProgress"
                            class="absolute text-center left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-black">
                            <Icon name="tabler:clock" class="w-8 h-8" />
                            <p>Work in progress</p>
                        </div>
                    </div>
                </div>

                <!-- Book Short Info -->
                <div
                    class="max-w-[400px] mt-8 bg-gray-200 shadow-xl rounded-xl overflow-hidden pt-36 pb-10 -translate-y-32 -z-10 mx-auto px-7 py-5">
                    <h1 class="text-2xl md:text-4xl text-center font-bold mb-2 opacity-90">{{ book.title }}</h1>
                    <h2 class="mb-6 text-center text-lg opacity-80">{{ book.subtitle }}</h2>

                    <div v-if="book.published" class="flex items-center gap-2 justify-center opacity-90">
                        <Icon name="tabler:calendar" class="w-5 h-5" />
                        <h3 class="opacity-70 font-bold text-center">{{ formatDate(book.published) }}</h3>
                    </div>

                    <div v-else class="flex flex-row gap-4 items-center justify-center mt-2 opacity-90">
                        <Icon name="tabler:info-circle" />
                        <p>An diesem Buch wird gearbeitet.</p>
                    </div>
                </div>
            </div>

        </n-section>

        <!-- Description -->
        <n-section class="!pb-6">
            <h3 class="mb-4 text-lg md:text-xl font-bold w-full">Beschreibung</h3>
            <p>{{ book.description_long }}</p>
        </n-section>

        <!-- Reading Samples -->
        <!-- <n-section class="!py-6" v-if="book.readingSamples && book.readingSamples.length > 0">
            <h3 class="text-lg md:text-xl mb-4 font-bold w-full">Leseprobe</h3>
            <p>Die ersten 20% des Buches als Leseprobe.</p>
            <div class="pt-8 flex gap-4 flex-wrap">
                <n-button v-for="readingSample in book.readingSamples" variant="black" :download="readingSample">
                    <Icon class="mr-4 w-5 h-5" name="tabler:download" />
                    <p>{{ readingSample }}</p>
                </n-button>
            </div>
        </n-section> -->

        <!-- Buy Links -->
        <n-section class="!py-6" v-if="!book.workInProgress">
            <h3 class="text-lg md:text-xl mb-4 font-bold w-full whitespace-normal">Kauflinks</h3>

            <div class="flex gap-4 flex-wrap mb-8">
                <div v-for="format of buylinksFormats">
                    <n-dropdown v-if="buylinks.filter(l => l.format == format).length > 0" :menu-items="buylinks.filter(l => l.format == format).map(l => { return { url: l.url, label: l.platform } })">
                        <p>{{ format }}</p>
                    </n-dropdown>
                </div>
            </div>

        </n-section>
    </div>
</template>
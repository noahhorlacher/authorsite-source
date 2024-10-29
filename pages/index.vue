<script setup>
const { find, findOne } = useStrapi()
const books = ref([])

const landingPage = ref()
const heroImageUrl = ref('')
const profilePicUrl = ref('')

const heroTitle = ref('')
const heroDescription = ref('')

const goodreadsUrl = ref('')

const authorVita = ref('')

const { data } = await useAsyncData(
    'getAllBooksIndex',
    async () => {
            const { data } = await find('books', {
                populate: '*'
            })
            
            return { data }
        },
)

books.value = sortBooks(data.value.data)

function sortBooks(booksData){
    const wipBooks = booksData.filter(b => b.wip)
    const finishedBooks = booksData.filter(b => !b.wip)
    const sortedFinishedBooks = finishedBooks.sort((a, b) => new Date(b.published) - new Date(a.published))

    return [...sortedFinishedBooks, ...wipBooks]
}

const { data: landingPageData } = await useAsyncData('getProfilePic',
    async () => {
        const { data } = await findOne('landing-page', {
            populate: '*'
        })

        return { data }
    }
)

landingPage.value = landingPageData.value.data

heroImageUrl.value = landingPageData.value.data.heroimage.formats.large.url
profilePicUrl.value = '/media-library' + landingPageData.value.data.profilepicture.formats.thumbnail.url

heroTitle.value = landingPageData.value.data.herotitle
heroDescription.value = landingPageData.value.data.herodescription

authorVita.value = landingPageData.value.data.authorvita

goodreadsUrl.value = landingPageData.value.data.goodreadsurl
</script>

<template>
    <div class="min-h-screen relative bg-[#cec09b] bg-cover bg-center"
        :style="`background-image: linear-gradient(transparent, rgba(0,0,0,0.5)), url('/media-library${heroImageUrl}')`">
        <n-section class="text-white absolute left-0 bottom-32">
            <h2 class="text-2xl md:text-4xl font-bold mb-4">{{ heroTitle }}</h2>
            <p class="mb-8 max-w-[400px]">{{ heroDescription }}</p>
            <div class="flex gap-4 flex-col md:flex-row">
                <n-button variant="white" link="/books">
                    <Icon name="tabler:book" class="mr-4 w-5 h-5"></Icon>
                    <p>Bücher</p>
                </n-button>
                <n-button variant="white-outline" link="/contact">
                    <Icon name="tabler:mail" class="mr-4 w-5 h-5"></Icon>
                    <p>Kontakt</p>
                </n-button>
            </div>
        </n-section>
    </div>

    <n-section class="bg-gray-100">
        <h2 class="text-4xl font-bold mb-4 text-center">Spotlight</h2>
        <div class="flex justify-center py-16 gap-16 flex-wrap grow-0 shrink-0">
            <n-book v-if="books" v-for="book in books.slice(0, 3)" :book="book" />
        </div>
        <div class="w-auto flex justify-center" v-if="books && books.length > 3">
            <n-button link="/books" variant="black">
                <p>Alle Bücher anzeigen</p>
                <Icon name="tabler:arrow-narrow-right" class="ml-4 w-5 h-5"></Icon>
            </n-button>
        </div>
    </n-section>

    <n-section>
        <h2 class="text-4xl font-bold mb-12 text-center">Über den Autor</h2>

        <div class="flex flex-col items-center gap-8 mb-12">
            <img class="h-64 rounded-xl shadow-md" :src="profilePicUrl"></img>
            <div class="text-center">
                <h4 class="font-bold text-2xl mb-2">Noah Horlacher</h4>
                <h5 class="text-xl opacity-70">Schweizer Autor</h5>
            </div>
        </div>
        
        <p v-html="authorVita"></p>

        <div class="flex flex-col mt-12 gap-2">
            <div class="flex gap-x-4 items-center">
                <Icon name="tabler:globe" class="w-6 h-6" />
                <p class="mr-4">Immersive Welten</p>
            </div>
            <div class="flex gap-x-4">
                <Icon name="tabler:alien" class="w-6 h-6" />
                <p class="mr-4">Exzentrikergarantie</p>
            </div>
            <div class="flex gap-x-4">
                <Icon name="tabler:book" class="w-6 h-6" />
                <p class="mr-4">Philosophische Hinterfragungen</p>
            </div>
        </div>

        <n-button variant="black" class="mt-12" :link="goodreadsUrl">
            <Icon name="tabler:link" class="mr-4 w-5 h-5"></Icon>
            <p>goodreads.com</p>
        </n-button>
    </n-section>
</template>
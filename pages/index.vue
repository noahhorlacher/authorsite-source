<script setup>
const { getItems, getSingletonItem } = useDirectusItems()

const books = ref([])
const { data: bookData } = await useAsyncData(
    async () => {
        const items = await getItems({
            collection: 'books',
        })

        return items
    }
)

books.value = sortBooks(bookData.value)


const { data: heroContent } = await useAsyncData(
    async () => {
            const data = await getSingletonItem({
                collection: 'herocontent',
            })

            return data
        }
)

const authorVita = `Noah Horlacher ist Fantasy-Autor und Schöpfer der «Leonhard Mondsturm»-Serie. Schon seit seiner Kindheit erforscht er in seinen Geschichten die fantastischen Welten, die in seinem Kopf entstehen. Mit einem einzigartigen Stil verbindet Noah Horlacher phantasievolle Abenteuer mit tiefgründigen, philosophischen Elementen. Seine grössten literarischen Einflüsse sind Hermann Hesse und Walter Moers, deren Werke ihn inspiriert haben, die Leser auf Reisen in aussergewöhnliche Welten mitzunehmen.<br><br>Durch seine Texte möchte er Menschen dazu ermutigen, ihre eigene Fantasie zu entfalten und neue Dimensionen der Vorstellungskraft zu entdecken. Als passionierter Gitarrenspieler und Naturfreund schöpft er seine Kreativität oft aus der Ruhe am Lagerfeuer oder beim Vögelbeobachten. Seine Geschichten richten sich an all jene, die das Abenteuer und die Flucht in fantastische Welten suchen.`

function sortBooks(booksData){
    const wipBooks = booksData.filter(b => b.wip)
    const finishedBooks = booksData.filter(b => !b.wip)
    const sortedFinishedBooks = finishedBooks.sort((a, b) => new Date(b.published) - new Date(a.published))

    return [...sortedFinishedBooks, ...wipBooks]
}

</script>

<template>
    <div class="min-h-screen relative bg-cover bg-center bg-black"
        :style="`background-image: linear-gradient(transparent, rgba(0,0,0,0.5)), url('/img/hero_image.jpg')`">
        <n-section class="text-white absolute left-0 bottom-32">
            <div class="mb-8 max-w-[400px]" v-html="heroContent.content"></div>
            <div class="flex gap-4 flex-col md:flex-row">
                <n-button variant="white" link="/books">
                    <Icon name="tabler:book" class="mr-4 w-5 h-5"></Icon>
                    <p>Bücher</p>
                </n-button>
                <n-button variant="white-outline" link="https://www.etsy.com/ch/shop/NoahHorlacherStore">
                    <Icon name="tabler:building-store" class="mr-4 w-5 h-5"></Icon>
                    <p>Merchandise</p>
                </n-button>
            </div>
        </n-section>
    </div>

    <n-section class="bg-gray-100">
        <h2 class="text-4xl font-bold mb-4 text-center">Spotlight</h2>
        <div class="flex justify-center py-16 gap-16 md:gap-32 flex-wrap grow-0 shrink-0">
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
            <img class="h-64 rounded-xl shadow-md" src="/img/portrait.jpg"></img>
            <div class="text-center">
                <h4 class="font-bold text-2xl mb-2">Noah Horlacher</h4>
                <h5 class="text-xl opacity-70">Schweizer Autor</h5>
            </div>
        </div>
        
        <!-- Vita -->
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
    </n-section>
</template>
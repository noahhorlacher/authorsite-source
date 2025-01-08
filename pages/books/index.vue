<script setup>
const { getItems } = useDirectusItems()

const books = ref([])

const { data } = await useAsyncData(
    async () => {
        const items = await getItems({
            collection: 'books',
        })

        return items
    }
)

books.value = sortBooks(data.value)

function sortBooks(booksData){
    const wipBooks = booksData.filter(b => b.workInProgress)
    const finishedBooks = booksData.filter(b => !b.workInProgress)
    const sortedFinishedBooks = finishedBooks.sort((a, b) => new Date(b.published) - new Date(a.published))

    return [...sortedFinishedBooks, ...wipBooks]
}
</script>

<template>
    <n-section class="bg-gray-100">
        <h2 class="text-4xl font-bold mb-4 text-center mt-16">Alle Bücher</h2>
        <div class="flex justify-center py-16 gap-16 md:gap-32 flex-wrap">
            <n-book v-for="book in books" :book="book" />
        </div>
    </n-section>
</template>
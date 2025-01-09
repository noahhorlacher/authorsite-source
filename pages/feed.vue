<script setup>
const { getItems } = useDirectusItems()

const feed = ref([])
const shownFeed = ref([])

const { data } = await useAsyncData(
    async () => {
        const data = await getItems({
            collection: 'posts',
        })

        return data
    }
)

feed.value = data.value

onMounted(async () => {
    feed.value = [...feed.value].sort((a, b) => new Date(b.date_created) - new Date(a.date_created))

    shownFeed.value = [...feed.value].sort((a, b) => new Date(b.date_created) - new Date(a.date_created))
})

const filter = ref(null)

watch(filter, () => {
    if(filter.value){
        shownFeed.value = [...feed.value]
            .filter(post => post.type == filter.value)
            .sort((a, b) => new Date(b.date) - new Date(a.date))
    } else {
        shownFeed.value = [...feed.value]
            .sort((a, b) => new Date(b.date) - new Date(a.date))
    }
})

function toggleFilter(val){
    filter.value = filter.value == val ? null : val
}

const colors = {
    'Update': 'bg-purple-100 text-purple-800',
    'Q&A': 'bg-green-100 text-green-800',
}
</script>

<template>
    <n-section class="bg-gray-100">
        <h2 class="text-4xl font-bold mt-16 mb-4 text-center">Feed</h2>
        <p class="mb-8 text-center">Jetzt Frage stellen auf <nuxt-link class="underline" to="https://www.goodreads.com/author/52548579.Noah_Horlacher/questions">goodreads.com</nuxt-link></p>
        
        <div class="flex gap-3 justify-center mb-3">
            <Icon name="tabler:filter" class="w-5 h-5" />
            <h3>Filter</h3>
        </div>
        <div class="flex justify-center mb-16 gap-4">
            <div v-for="filterType in ['Update', 'Q&A']" @click="toggleFilter(filterType)" :class="['px-4 py-1 rounded-lg cursor-pointer transition-all hover:opacity-90 select-none', filter == filterType ? '' : 'opacity-50', colors[filterType]]">{{ filterType }}</div>
        </div>
        
        <div class="flex flex-col items-center gap-8">
            <n-post v-for="post of shownFeed" :post="post" />
        </div>
    </n-section>
</template>
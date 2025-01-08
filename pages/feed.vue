<script setup>
const { getItems } = useDirectusItems()

const feed = ref([])
const shownFeed = ref([])

const askQuestionUrl = ref('')

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

// const { data: landingPageData } = await useAsyncData('getProfilePic',
//     async () => {
//         const { data } = await findOne('landing-page', {
//             populate: '*'
//         })

//         return { data }
//     }
// )

// askQuestionUrl.value = landingPageData.value.data.askquestionurl
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
            <div v-for="filterType in ['Update', 'Q&A']" @click="toggleFilter(filterType)" :class="['px-4 py-1 rounded-lg cursor-pointer transition-all hover:opacity-90', filter == filterType ? '' : 'opacity-50', colors[filterType]]">{{ filterType }}</div>
        </div>
        
        <div class="flex flex-col items-center gap-8">
            <article v-for="post of shownFeed" class="bg-white shadow-lg pt-4 pb-6 px-6 md:pt-8 md:pb-12 md:px-12 max-w-[700px] rounded-xl">
                <div class="flex flex-row justify-between items-center mb-8">
                    <div class="flex flex-row text-sm items-center gap-2 opacity-70">
                        <Icon name="tabler:calendar" class="w-5 h-5" />
                        <p>{{ formatDate(post.date_created) }}</p>
                    </div>
                    <p :class="['rounded-md inline-block text-sm px-2 py-1', colors[post.type]]">{{ post.type }}</p>
                </div>

                <h3 class="text-2xl font-bold mb-4">{{ post.title }}</h3>
                <p class="whitespace-pre-line mb-6" v-html="post.content"></p>
            </article>
        </div>
    </n-section>
</template>
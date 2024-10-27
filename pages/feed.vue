<script setup>
import { feed } from '~/data/feed'

const shownFeed = ref([...feed])

const filter = ref(null)

watch(filter, () => {
    if(filter.value){
        shownFeed.value = [...feed].filter(post => post.type == filter.value)
    } else {
        shownFeed.value = [...feed]
    }
})

function toggleFilter(val){
    filter.value = filter.value == val ? null : val
}

const colors = {
    'Post': 'bg-indigo-100 text-indigo-800',
    'Q&A': 'bg-emerald-100 text-emerald-800',
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
            <div v-for="filterType in ['Post', 'Q&A']" @click="toggleFilter(filterType)" :class="['px-4 py-1 rounded-lg cursor-pointer transition-all hover:opacity-90', filter == filterType ? 'shadow-md' : 'opacity-50', colors[filterType]]">{{ filterType }}</div>
        </div>
        
        <div class="flex flex-col items-center gap-8">
            <article v-for="post of shownFeed" class="bg-white shadow-lg pt-8 pb-12 px-12 max-w-[700px] rounded-xl">
                <div class="flex flex-row justify-between items-center mb-8">
                    <div class="flex flex-row items-center gap-2 opacity-70">
                        <Icon name="tabler:calendar" class="w-6 h-6" />
                        <p class="mt-1">{{ formatDate(post.date) }}</p>
                    </div>
                    <p :class="['rounded-md inline-block text-sm px-2 py-1', colors[post.type]]">{{ post.type }}</p>
                </div>

                <h3 class="text-lg font-bold mb-4">{{ post.title }}</h3>
                <p class="whitespace-pre-line mb-6">{{ post.content }}</p>
            </article>
        </div>
    </n-section>
</template>
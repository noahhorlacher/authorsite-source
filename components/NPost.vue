<script setup>
const props = defineProps({
    post: {
        type: Object,
        default: {
            id: 0,
            date_created: '2025-01-01',
            title: '',
            content: '',
            type: 'Q&A'
        }
    }
})

const colors = {
    'Update': 'bg-purple-100 text-purple-800',
    'Q&A': 'bg-green-100 text-green-800',
}
</script>

<template>
    <article class="bg-white shadow-lg pt-4 pb-6 px-6 md:pt-8 md:pb-12 md:px-12 max-w-[700px] rounded-xl">
        <div class="flex flex-row justify-between items-center mb-8 gap-4">
            <div class="flex flex-row text-sm items-center gap-2 opacity-70">
                <Icon name="tabler:calendar" class="w-5 h-5" />
                <p>{{ formatDate(post.date_created) }}</p>
            </div>
            <p :class="['rounded-md inline-block text-sm px-2 py-1', colors[post.type]]">{{ post.type }}</p>
        </div>

        <h3 class="text-2xl font-bold mb-4">{{ post.title }}</h3>
        <p class="whitespace-pre-line mb-6 bluelink" v-html="post.content"></p>
    </article>
</template>
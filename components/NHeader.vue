<script setup>
const route = useRoute()

const links = [
    {
        url: '/',
        text: 'Home'
    },
    {
        url: '/books',
        text: 'Bücher'
    },
    {
        url: '/quotes',
        text: 'Zitate'
    },
    {
        url: '/goodies',
        text: 'Goodies'
    },
    {
        url: '/contact',
        text: 'Kontakt'
    },
]
</script>

<template>
    <header class="flex justify-between shadow-sm items-center p-4 w-full fixed z-10 top-0 left-0 bg-white">
        <div class="flex justify-start items-center gap-x-4 w-full">
            <img src="/favicon.svg" class="w-8 h-8 rounded-md" />
            <nuxt-link to="/">
                <h1 class="font-bold">Noah Horlacher</h1>
            </nuxt-link>
        </div>
        <div class="flex items-center justify-end grow gap-x-4">
            <nuxt-link
                v-for="link of links"
                :to="link.url"
                :key="link.url"
                :class="{ 'font-bold': route.path === link.url }"
            >
                {{ link.text }}
            </nuxt-link>
        </div>
    </header>
</template>
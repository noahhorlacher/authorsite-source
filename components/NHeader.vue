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

const menuOpen = ref(false)
</script>

<template>
    <header class="flex justify-between shadow-sm items-center p-4 w-full fixed z-10 top-0 left-0 bg-white">
        <div class="flex justify-start items-center gap-x-4 w-full">
            <img src="/favicon.svg" class="w-8 h-8 rounded-md" />
            <nuxt-link to="/">
                <h1 class="font-bold">Noah Horlacher</h1>
            </nuxt-link>
        </div>
        <div class="hidden md:flex items-center justify-end grow gap-x-4">
            <nuxt-link
                v-for="link of links"
                :to="link.url"
                :key="link.url"
                :class="{ 'font-bold': route.path === link.url }"
            >
                {{ link.text }}
            </nuxt-link>
        </div>
        <div class="block md:hidden">
            <Icon name="tabler:menu" class="w-6 h-6 text-black cursor-pointer" @click="menuOpen = true" />
        </div>
        <div :class="['fixed top-0 left-0 z-10', menuOpen ? 'block' : 'hidden']">
            <Icon name="tabler:x" @click="menuOpen = false" :class="['cursor-pointer z-20 top-8 right-8 text-black w-8 h-8', menuOpen ? 'flex' : 'hidden']" />
            <div :class="['md:hidden flex-col text-2xl gap-4 fixed pt-32 w-screen h-screen bg-white left-0 top-0 place-items-center', menuOpen ? 'flex' : 'hidden']">
                <nuxt-link
                    v-for="link of links"
                    :to="link.url"
                    :key="link.url"
                    :class="{ 'font-bold': route.path === link.url }"
                    @click="menuOpen = false"
                >
                    {{ link.text }}
                </nuxt-link>
            </div>
        </div>
    </header>
</template>
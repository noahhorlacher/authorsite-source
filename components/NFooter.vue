<script setup>
const footerLinks = [
    {
        label: 'Frage stellen',
        url: 'https://www.goodreads.com/author/52548579.Noah_Horlacher/questions'
    },
    {
        label: 'Goodreads Profil',
        url: 'https://www.goodreads.com/author/show/52548579.Noah_Horlacher'
    },
    {
        label: 'Kontakt',
        url: '/contact'
    },
]
</script>

<template>
    <footer class="flex flex-col items-center p-16 pb-24 pt-28 bg-gray-300">
        <div class="flex flex-col gap-2">
            <nuxt-link class="underline" :to="link.url" v-for="link in footerLinks">{{ link.label }}</nuxt-link>
        </div>

        <p class="text-sm mt-16">© 2024 Noah Horlacher</p>
    </footer>
</template>
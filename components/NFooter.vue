<script setup>
// const { findOne } = useStrapi()

// const { data: landingPageData } = await useAsyncData('getProfilePic',
//     async () => {
//         const { data } = await findOne('landing-page', {
//             populate: '*'
//         })

//         return { data }
//     }
// )

const footerLinks = [
    {
        label: 'Merchandise Shop',
        url: 'https://www.etsy.com/ch/shop/NoahHorlacherStore'
    },
    // {
    //     label: 'Frage stellen',
    //     url: landingPageData.value.data.askquestionurl
    // },
    // {
    //     label: 'Goodreads Profil',
    //     url: landingPageData.value.data.goodreadsurl
    // },
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

        <p class="text-sm mt-16">© 2025 Noah Horlacher</p>
    </footer>
</template>
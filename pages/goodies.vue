<script setup>
const runtimeConfig = useRuntimeConfig()

const { find } = useStrapi()
const goodies = ref([])

const { data } = await useAsyncData('git gud', async () => {
    const { data: goodiesData} = await find('goodies', {
        populate: '*'
    })

    return goodiesData
})

goodies.value = data.value.reverse()
</script>

<template>
    <n-section class="bg-gray-100">
        <h2 class="text-4xl font-bold mt-16 mb-32 text-center">Zusätzliche Materialien</h2>
        
        <div class="flex flex-wrap gap-8 justify-center">
            <a v-for="goodie in goodies" :href="runtimeConfig.public.mediaUrl + goodie.asset.formats.large.url">
                <n-card
                    :title="goodie.title"
                    :link="goodie.link"
                    :icon="goodie.icon"
                    class=min-w-[300px]
                >
                    <h4 class="font-bold opacity-70 mb-2">Serie</h4>
                    <p>{{ goodie.series }}</p>
                    
                    <h4 class="font-bold opacity-70 mt-4 mb-2">Typ</h4>
                    <p class="bg-gray-100 rounded-md inline-block px-3 py-1">
                        {{ goodie.type }}
                    </p>
                </n-card>
            </a>
        </div>
    </n-section>
</template>
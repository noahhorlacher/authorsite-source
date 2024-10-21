<script setup>
const goodies = [
    {
        title: 'Landkarte Lyranthia',
        icon: 'tabler:compass',
        series: 'Leonhard Mondsturm',
        link: '/goodies/maps/lyranthia.jpg',
        type: 'Landkarte'
    },
    {
        title: 'Landkarte Eichenthal',
        icon: 'tabler:compass',
        series: 'Leonhard Mondsturm',
        link: '/goodies/maps/eichenthal.jpg',
        type: 'Landkarte'
    }
]
</script>

<template>
    <n-section class="bg-gray-100">
        <h2 class="text-4xl font-bold mt-16 mb-32 text-center">Zusätzliche Materialien</h2>
        
        <div class="flex flex-wrap gap-8 justify-center">
            <a v-for="goodie in goodies" :href="goodie.link">
                <n-card
                    :title="goodie.title"
                    :link="goodie.link"
                    :icon="goodie.icon"
                    class=min-w-[300px]
                >
                    <h4 class="font-bold opacity-70 mb-2">Serie</h4>
                    <p>{{ goodie.series }}</p>
                    
                    <h4 class="font-bold opacity-70 mt-4 mb-2">Typ</h4>
                    <div class="bg-gray-100 rounded-md inline-block px-3 py-1">
                        <p>{{ goodie.type }}</p>
                    </div>
                </n-card>
            </a>
        </div>
    </n-section>
</template>
<script setup>
const goodies = [
    {
        title: 'Landkarte Lyranthia',
        type: 'map',
        series: 'Leonhard Mondsturm',
        link: '/goodies/maps/lyranthia.jpg'
    },
    {
        title: 'Landkarte Eichenthal',
        type: 'map',
        series: 'Leonhard Mondsturm',
        link: '/goodies/maps/eichenthal.jpg'
    }
]

const tags = {
    'map': 'Landkarte',
}

const icons = {
    'map': 'tabler:compass'
}
</script>

<template>
    <n-section class="bg-gray-100">
        <h2 class="text-4xl font-bold mb-32 text-center">Zusätzliche Materialien</h2>
        
        <div class="flex flex-wrap gap-8 justify-center">
            <a v-for="goodie in goodies" :href="goodie.link">
                <n-card
                    :title="goodie.title"
                    :link="goodie.link"
                    :icon="icons[goodie.type]"
                    class=min-w-[300px]
                >
                    <h4 class="font-bold opacity-70 mb-2">Serie</h4>
                    <p>{{ goodie.series }}</p>
                    
                    <h4 class="font-bold opacity-70 mt-4 mb-2">Typ</h4>
                    <div class="bg-gray-100 rounded-md inline-block px-3 py-1">
                        <p>{{ tags[goodie.type] }}</p>
                    </div>
                </n-card>
            </a>
        </div>
    </n-section>
</template>
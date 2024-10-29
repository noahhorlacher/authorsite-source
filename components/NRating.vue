<script setup>
const props = defineProps({
  value: {
    type: String
  }
})

const ratingMap = {
  'none': null,
  'rating_0': 0,
  'rating_0.5': .5,
  'rating_1': 1,
  'rating_1.5': 1.5,
  'rating_2': 2,
  'rating_2.5': 2.5,
  'rating_3': 3,
  'rating_3.5': 3.5,
  'rating_4': 4,
  'rating_4.5': 4.5,
  'rating_5': 5,
}

const numberValue = ref(ratingMap[props.value])
</script>

<template>
  <div>
    <div v-if="value == 'none' || value === null || value === undefined" title="Noch keine Bewertungen.">
        <!-- Empty stars for the remaining spots up to 5 stars -->
        <Icon class="w-8 h-8 text-gray-500" name="tabler:star-filled" v-for="i in 5" :key="'empty-' + i" />
        <p class="italic mt-2 text-sm">Noch keine Bewertungen. <nuxt-link class="underline" to="https://www.goodreads.com/book/show/220572266-leonhard-mondsturm">Sei der/die Erste</nuxt-link></p>
    </div>
    <div v-else :title="`Bewertung: ${numberValue}`">
        <!-- Full stars -->
        <Icon class="w-8 h-8 text-amber-500" name="tabler:star-filled" v-for="i in Math.floor(numberValue)" :key="'full-' + i" />
        
        <!-- Half star if applicable -->
        <Icon class="w-8 h-8 text-amber-500" name="tabler:star-half-filled" v-if="value - Math.floor(numberValue) > 0" :key="'half'" />
            
        <!-- Empty stars for the remaining spots up to 5 stars -->
        <Icon class="w-8 h-8 text-amber-500" name="tabler:star" v-for="i in 5 - Math.ceil(numberValue)" :key="'empty-' + i" />
    </div>
  </div>
</template>

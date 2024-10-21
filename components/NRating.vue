<script setup>
defineProps({
  value: {
    type: Number
  }
});
</script>

<template>
  <div>
    <div v-if="value === undefined || value === null">
        <!-- Empty stars for the remaining spots up to 5 stars -->
        <Icon class="w-8 h-8 text-gray-500" name="tabler:star-filled" v-for="i in 5" :key="'empty-' + i" />
        <p class="italic mt-2">Noch keine Bewertungen. <nuxt-link class="underline" to="https://www.goodreads.com/book/show/220572266-leonhard-mondsturm">Sei der/die Erste</nuxt-link></p>
    </div>
    <div v-else>
        <!-- Full stars -->
        <Icon class="w-8 h-8 text-amber-500" name="tabler:star-filled" v-for="i in Math.floor(value)" :key="'full-' + i" />
        
        <!-- Half star if applicable -->
        <Icon class="w-8 h-8 text-amber-500" name="tabler:star-half-filled" v-if="value - Math.floor(value) > 0" :key="'half'" />
            
        <!-- Empty stars for the remaining spots up to 5 stars -->
        <Icon class="w-8 h-8 text-amber-500" name="tabler:star" v-for="i in 5 - Math.ceil(value)" :key="'empty-' + i" />
    </div>
  </div>
</template>

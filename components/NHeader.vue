<script setup>
const route = useRoute()

const links = [
  { url: '/', text: 'Home' },
  { url: '/books', text: 'Bücher' },
  { url: 'https://www.etsy.com/ch/shop/NoahHorlacherStore', text: 'Merchandise' },
  { url: '/feed', text: 'Feed' },
  { url: '/quotes', text: 'Zitate' },
  { url: '/contact', text: 'Kontakt' },
]

const mobileMenuOpen = ref(false)

function toggleMobileMenu() {
  mobileMenuOpen.value = !mobileMenuOpen.value
}
</script>

<template>
    <header class="fixed top-0 left-0 z-10 flex w-full items-center justify-between p-4 bg-white shadow-sm">
      
      <!-- Title and Logo -->
      <div class="flex items-center gap-4">
        <img src="/favicon.svg" class="h-8 w-8 rounded-md" />
        <nuxt-link to="/" class="font-bold">Noah Horlacher</nuxt-link>
      </div>
  
      <!-- Desktop Links -->
      <nav class="hidden md:flex grow items-center justify-end gap-4">
        <nuxt-link
          v-for="link in links"
          :key="link.url"
          :to="link.url"
          :class="['font-semibold', route.path === link.url ? 'text-black' : 'text-gray-500 hover:text-black' ]"
        >
          {{ link.text }}
        </nuxt-link>
      </nav>
  
      <!-- Mobile Links (Checkbox controlled) -->
      <div :class="['fixed inset-0 z-20 flex flex-col items-center justify-center gap-4 bg-white text-2xl', mobileMenuOpen ? 'block md:hidden' : 'hidden']">
        <nuxt-link
          v-for="link in links"
          :key="link.url"
          :to="link.url"
          :class="['font-semibold', route.path === link.url ? 'text-black' : 'text-gray-500 hover:text-black' ]"
          @click="mobileMenuOpen = false"
        >
          {{ link.text }}
        </nuxt-link>
      </div>
  
      <!-- Mobile Menu Icon -->
      <div class="block z-40 cursor-pointer md:hidden" @click="toggleMobileMenu">
        <Icon
          name="tabler:menu"
          v-if="!mobileMenuOpen"
          class="h-6 w-6 text-black"
        />
        <Icon
          v-else
          name="tabler:x"
          class="h-6 w-6 text-black"
        />
      </div>
    </header>
  </template>

<style scoped>
/* Hide the checkbox but use it to toggle the mobile menu */
input[type="checkbox"]:checked ~ div {
  display: flex;
}

input[type="checkbox"]:not(:checked) ~ div {
  display: none;
}
</style>
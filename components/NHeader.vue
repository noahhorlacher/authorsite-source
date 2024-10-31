<script setup>
const route = useRoute()

const links = [
  { url: '/', text: 'Home' },
  { url: '/books', text: 'Bücher' },
  { url: '/feed', text: 'Feed' },
  { url: '/quotes', text: 'Zitate' },
  { url: '/contact', text: 'Kontakt' },
]

const mobileMenuOpen = ref(false)

function toggleMobileMenu() {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const headerTransparent = ref(true)

function headerIsHomeAndTransparent() {
  headerTransparent.value =  route.path == '/' && window.scrollY == 0
}

onMounted(() => document.addEventListener('scroll', headerIsHomeAndTransparent))
onUnmounted(() => document.removeEventListener('scroll', headerIsHomeAndTransparent))
watch(() => route.path, headerIsHomeAndTransparent)
</script>

<template>
    <header :class="['fixed top-0 left-0 z-10 flex w-full items-center justify-between p-4 shadow-sm transition-colors', headerTransparent ? '' : 'bg-white']">
      
      <!-- Title and Logo -->
      <div class="flex items-center gap-4">
        <img src="/favicon.svg" class="h-8 w-8 rounded-md" />
        <nuxt-link to="/" :class="['font-bold transition-colors', headerTransparent ? 'text-white' : 'text-black']">Noah Horlacher</nuxt-link>
      </div>
  
      <!-- Desktop Links -->
      <nav class="hidden md:flex grow items-center justify-end gap-4">
        <nuxt-link
          v-for="link in links"
          :key="link.url"
          :to="link.url"
          :class="['font-semibold transition-opacity', headerTransparent ?
            (route.path === link.url ? 'text-white' : 'text-white opacity-70 hover:opacity-100') :
            (route.path === link.url ? 'text-black' : 'text-black opacity-70 hover:opacity-100')
          ]"
        >
          {{ link.text }}
        </nuxt-link>

        <n-button :variant="headerTransparent ? 'white-outline' : 'outline'" class="ml-4 flex items-center" link="https://www.etsy.com/ch/shop/NoahHorlacherStore">
          <Icon name="tabler:building-store" class="w-5 h-5 mr-2" />
          <p>Fan Shop</p>
        </n-button>

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

        <n-button variant="outline" class="mt-8 flex items-center" link="https://www.etsy.com/ch/shop/NoahHorlacherStore">
          <Icon name="tabler:building-store" class="w-5 h-5 mr-2" />
          <p>Fan Shop</p>
        </n-button>

      </div>
  
      <!-- Mobile Menu Icon -->
      <div :class="['block z-40 cursor-pointer md:hidden transition-colors', headerTransparent ? 'text-white' : 'text-black']" @click="toggleMobileMenu">
        <Icon
          name="tabler:menu"
          v-if="!mobileMenuOpen"
          class="h-6 w-6"
        />
        <Icon
          v-else
          name="tabler:x"
          class="h-6 w-6"
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
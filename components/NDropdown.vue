<script setup>
defineProps({
    menuItems: {
        type: Array,
        default: []
    }
})
</script>

<template>
    <HeadlessMenu as="div" class="relative block text-left">
      <div>
        <HeadlessMenuButton class="flex text-white w-full justify-center gap-4 rounded-md bg-black px-4 py-2 border-2 text-sm border-black">
          <div class="flex">
              <slot></slot>
            </div>
          <Icon name="tabler:chevron-down" class="h-5 w-5 -mr-1" aria-hidden="true" />
        </HeadlessMenuButton>
      </div>
  
      <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
        <HeadlessMenuItems class="absolute left-0 z-10 mt-2 w-56 origin-top-left rounded-md overflow-hidden bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
            <p class="text-sm px-6 py-4 border-b-[1px] border-gray-20 bg-black text-white">Ausgabe wählen</p>
            <HeadlessMenuItem v-for="menuItem of menuItems" v-slot="{ active }">
                <nuxt-link :to="menuItem.url" :class="[active ? 'bg-gray-200 text-black' : 'bg-white text-black', 'px-6 py-4 gap-x-3 text-sm flex items-center justify-between']">
                    <p>{{ menuItem.label }}</p>
                    <Icon name="tabler:arrow-bar-right" class="w-5 h-5"/>
                </nuxt-link>
            </HeadlessMenuItem>
        </HeadlessMenuItems>
      </transition>
    </HeadlessMenu>
  </template>
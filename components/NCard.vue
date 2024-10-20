<script setup>
defineProps({
    title: String,
    icon: String
})
</script>

<template>
    <div class="bg-white max-w-[300px] shadow-xl hover:shadow-2xl transition-shadow rounded-xl overflow-hidden">
        <div class="bg-gradient-to-r from-emerald-400 to-cyan-400 px-8 py-4 flex justify-center">
            <Icon class="w-8 h-8 text-white" :name="icon" />
        </div>
        
        <div class="p-8">
            <h3 class="text-black font-bold text-xl opacity-70 mb-4">{{ title }}</h3>
            <slot />
        </div>
    </div>
</template>
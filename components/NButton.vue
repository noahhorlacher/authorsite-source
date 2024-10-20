<script setup>
const props = defineProps({
    variant: {
        type: String,
        default: 'black'
    },
    link: {
        type: String
    }
})

const typeStyle = computed(() => {
    if (props.variant == 'white')
        return 'text-black bg-white border-white hover:text-white hover:bg-transparent'
    else if (props.variant == 'outline') {
        return 'b-4 border-black bg-transparent text-black hover:bg-black hover:text-white'
    } else if (props.variant == 'white-outline') {
        return 'text-white b-4 border-white bg-transparent hover:bg-white hover:text-black'
    } else {
        return 'text-white bg-black border-black hover:bg-transparent hover:text-black hover:shadow-md'
    }
})
</script>

<template>
    <nuxt-link v-if="link" :to="link" class="inline-flex items-center">
        <div :class="`inline-flex items-center transition-all py-2 text-sm px-4 border-2 cursor-pointer ${typeStyle} rounded-md`">
            <slot />
        </div>
    </nuxt-link>
    <div v-else :class="`inline-flex items-center transition-all py-2 text-sm px-4 border-2 cursor-pointer ${typeStyle} rounded-md`">
            <slot />
        </div>
</template>

<script setup lang="ts">
 
    const props = defineProps<{
        type?: 'prev' | 'next',
        toPage: number,
        currentPage: boolean,
        isDisabled: boolean
    }>()

    const emit = defineEmits(['pageBy'])

    const isActive = ref(props.currentPage)
    const isDisabled = ref(props.isDisabled)


    function clickButton() {
        emit('pageBy', props.toPage)

        isActive.value = props.currentPage
    
    }
    
    const classButton = computed(() => ({
        'border-transparent border-slate-200 hover:bg-slate-100': !isActive.value,
        'border border-slate-200': isActive.value,
    })) 
        
</script>

<template>
    <button 
        type="button"
        :disabled="isDisabled" 
        @click="clickButton" 
        class="min-h-[38px] min-w-[38px] flex justify-center items-center py-2 px-3 text-sm rounded-lg focus:outline-none focus:bg-slate-200 disabled:opacity-50 disabled:pointer-events-none"
        :class="classButton"        
        aria-current="page"
    >
        <template v-if="type === 'prev'" >
            <svg class="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="m15 18-6-6 6-6"></path>
            </svg>
            <span class="sr-only">Previous</span>   
        </template>
        <template v-else-if="type === 'next'" >
            <span class="sr-only">Next</span>
            <svg class="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="m9 18 6-6-6-6"></path>
            </svg>  
        </template>
        <template v-else>
            {{ toPage }}
        </template>
    </button>
</template>
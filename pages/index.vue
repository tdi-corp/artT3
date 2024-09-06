<script setup lang="ts">
import { usePostsStore } from '~/stores/posts';
import { storeToRefs } from 'pinia';

const store = usePostsStore()
const modal = useModalStore()

// toggle
const {toggleModal} = modal
const {toggle} = storeToRefs(modal)

// posts
const {fetchAllPosts, toggleOrderById} = store

await fetchAllPosts()

const {status, orderById, getPostsSortById} = storeToRefs(store)

const classBlur = computed(() => ({
    'absolute top-0 w-full h-full backdrop-blur-sm bg-white/30 z-10': status.value === 'pending'
}))

const classOrderToggle = computed(() => ({
    'text-slate-900': orderById.value
}))


</script>

<template>
    <header class="relative z-50 w-full flex-none text-slate-900">
        <nav class="mx-auto max-w-container px-4 sm:px-6 lg:px-8">
            <div class="relative py-5 flex justify-center">
                <div class=" text-4xl sm:text-xl font-bold underline decoration-pink-500">
                    Art Accessor
                </div>
            </div>
        </nav>
    </header>
    <main>
        <section class="">
            <div class="mx-auto max-w-7xl relative px-4">
                <div class="flex justify-end mb-4">
                    <button @click="toggleModal" class="inline-flex justify-center rounded-lg text-sm font-semibold py-3 px-4 bg-slate-900 text-white hover:bg-slate-700">Add Post</button>
                </div>
            </div>
            <div class="mx-auto max-w-7xl relative overflow-x-auto sm:px-4 mb-5">
                <div :class="classBlur" class="tablet:w-[50rem]">
                    <svg v-if="status === 'pending'" class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.72,19.9a8,8,0,0,1-6.5-9.79A7.77,7.77,0,0,1,10.4,4.16a8,8,0,0,1,9.49,6.52A1.54,1.54,0,0,0,21.38,12h.13a1.37,1.37,0,0,0,1.38-1.54,11,11,0,1,0-12.7,12.39A1.54,1.54,0,0,0,12,21.34h0A1.47,1.47,0,0,0,10.72,19.9Z" class="spinner_6kVp"/>
                    </svg>
                </div>
                <table class="border-collapse table-auto w-full tablet:w-[50rem] text-sm relative z-0">
                    <!-- <caption class="text-slate-500 pb-4 text-xs caption-top">
                        Table
                    </caption> -->
                    <thead>
                    <tr>
                        <th class="border font-medium p-4 pl-8 pt-3 pb-3 text-slate-400 text-left">
                            <button type="button" @click="toggleOrderById" class=" px-0 py-2.5 text-center inline-flex items-center" :class="classOrderToggle">
                                id
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true" class="w-5 h-5 ml-1">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
                                </svg>   
                            </button>                                                               
                        </th>
                        <th class="border font-medium p-4 pr-8 pt-3 pb-3 text-slate-400 text-left">
                            userId
                        </th>
                        <th class="border font-medium p-4 pr-8 pt-3 pb-3 text-slate-400 text-left">
                            Title
                        </th>
                        <th class="border font-medium p-4 pr-8 pt-3 pb-3 text-slate-400 text-left">
                            Body
                        </th>                                                
                    </tr>
                    </thead>
                    <tbody class="bg-white dark:bg-slate-800">
                        <tr v-for="post in getPostsSortById" :key="post.id">
                            <td class="border border-slate-200 p-4 pl-8 text-slate-500">
                                {{ post.id }}
                            </td>
                            <td class="border border-slate-200 p-4 pr-8 text-slate-500">
                                {{ post.userId }}
                            </td>
                            <td class="border border-slate-200 p-4 pr-8 text-slate-500">
                                {{ post.title }}
                            </td>
                            <td class="border border-slate-200 p-4 pr-8 text-slate-500">
                                {{ post.body }}
                            </td>                                                        
                        </tr>
                    </tbody>
                </table>              
            </div>
            <div class="mx-auto max-w-7xl px-4">
                <div class="flex justify-between">
                    <Pagination />
                </div>
            </div>

        </section>

    </main>

    <Modal v-if="toggle" title="Create new post">
        <Form></Form>
    </Modal>

</template>

<style>
    .spinner_6kVp{transform-origin:center;animation:spinner_irSm .75s infinite linear}@keyframes spinner_irSm{100%{transform:rotate(360deg)}}
</style>
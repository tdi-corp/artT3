<script setup lang="ts">
    import { usePostsStore } from '#imports';

    const store = usePostsStore()

    const {updatePagination} = store

    const {pagination} = storeToRefs(store)

    async function nextPage(toPage: any) {   
        await updatePagination(toPage)  
    }
</script>

<template >
    <!-- Pagination -->
    <nav class="flex items-center gap-x-1" aria-label="Pagination">
        <PaginationButton v-if="pagination.page === 1" @page-by="nextPage" :toPage="pagination.page > 0 ? pagination.page - 1 : 1" :current-page="false" :isDisabled="true" type="prev"/>
        <PaginationButton v-else @page-by="nextPage" :toPage="pagination.page > 0 ? pagination.page - 1 : 1" :current-page="false" :isDisabled="false" type="prev"/>

        <div class="flex items-center gap-x-1">
            <template v-for="(item, index) in pagination.countPages" :key="index" >    
                    <PaginationButton v-if="item === pagination.page" @page-by="nextPage" :toPage="item" :current-page="true" :isDisabled="false"/>
                    <PaginationButton v-else @page-by="nextPage" :toPage="item" :current-page="false" :isDisabled="false"/>
            </template>
            
            <!-- <button @click="nextPage(2)" type="button" class="min-h-[38px] min-w-[38px] flex justify-center items-center border border-transparent text-gray-800 hover:bg-gray-100 py-2 px-3 text-sm rounded-lg focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-transparent dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">2</button>
            <button @click="nextPage(3)" type="button" class="min-h-[38px] min-w-[38px] flex justify-center items-center border border-transparent text-gray-800 hover:bg-gray-100 py-2 px-3 text-sm rounded-lg focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-transparent dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">3</button>
             -->
            <!-- <div class="hs-tooltip inline-block">
            <button type="button" class="group min-h-[38px] min-w-[38px] flex justify-center items-center text-gray-400 p-2 text-sm rounded-lg disabled:opacity-50 pointer-events-none">
                <span class="text-xs">•••</span>
            </button>
            </div> -->
    
        </div>
        <PaginationButton v-if="pagination.page === 10" @page-by="nextPage" :toPage="pagination.page < 10 ? pagination.page + 1 : pagination.page" :current-page="false" :isDisabled="true" type="next"/>
        <PaginationButton v-else @page-by="nextPage" :toPage="pagination.page < 10 ? pagination.page + 1 : pagination.page" :current-page="false" :isDisabled="false" type="next"/>
    </nav>
    <!-- End Pagination -->
</template>
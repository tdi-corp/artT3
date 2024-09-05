<script setup lang="ts">
    import type { IPost } from '~/types/posts';

    const modal = useModalStore()
    const post = usePostsStore()

    const {createPost} = post

    const {toggleModal} = modal
    const {toggle} = storeToRefs(modal)

    const formData = reactive<Omit<IPost, 'id'>>({
        title: 'title example',
        body: 'body example',
        userId: 101
    })

    const handleSubmit = (data: any) => {
        createPost(formData)        
    }

</script>
<template>
    <div>
        <form @submit.prevent="handleSubmit">
            <!-- Modal body -->
            <div class="p-4 md:p-5 space-y-4">
                <div class="mb-5">
                    <label for="title" class="block mb-2 font-medium">title</label>
                    <input type="text" v-model="formData.title" id="title" class="rounded-lg focus:outline-none focus:ring-0 focus:border-blue-500 bg-slate-50 border-2 border-slate-200 block w-full p-2.5" />
                </div>
                <div class="mb-5">
                    <label for="body" class="block mb-2 font-medium">body</label>
                    <input type="text" v-model="formData.body" id="body" class="rounded-lg focus:outline-none focus:ring-0 focus:border-blue-500 bg-slate-50 border-2 border-slate-200 block w-full p-2.5"  />
                </div>
                <div class="mb-5">
                    <label for="userId" class="block mb-2 font-medium">userId</label>
                    <input type="text" v-model="formData.userId" id="userId" class="rounded-lg focus:outline-none focus:ring-0 focus:border-blue-500 bg-slate-50 border-2 border-slate-200 block w-full p-2.5" />
                </div>                                
            </div>
            <!-- Modal footer -->
            <div class="flex items-center p-4 md:p-5 rounded-b">
                <button data-modal-hide="static-modal" type="submit" class="inline-flex justify-center rounded-lg font-semibold py-3 px-4 bg-slate-900 text-white hover:bg-slate-700">I accept</button>
                <button @click="toggleModal" data-modal-hide="static-modal" type="button" class="py-2.5 px-5 ms-3 font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-500 focus:z-10 focus:ring-4 focus:ring-gray-100">Decline</button>
            </div>  
        </form>

    </div>
</template>
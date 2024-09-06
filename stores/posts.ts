import type {IPost, IPostState} from "~/types/posts";

const config = useRuntimeConfig()

export const usePostsStore = defineStore('postsStore', {
    
    state: (): IPostState => ({
        data: [],
        pagination: {
            page: 1,
            countPages: 0,

            startPage: 1,
            itemsPerPage: 10,
        },
        orderById: false,
        status: 'pending'
    }),
    actions: {
        async fetchAllPosts() {            
            this.status = 'pending'

            const {data, status}: any = await useFetch(`${config.public.apiBase}`)
    
            this.data = data.value
            this.pagination.countPages = countPages(data.value.length, this.pagination.itemsPerPage)
            this.status = status.value
          
        },
        async createPost(formData: Omit<IPost, 'id'>) {
            this.status = 'pending'
            const {title, body, userId} = formData

            await fakeLoading()

            this.data.push({...formData, id: maxId(this.data)})
            this.pagination.countPages = countPages(this.data.length, this.pagination.itemsPerPage) 
            this.status = 'success'          
        },
        async updatePagination(page: number){

            this.status = 'pending'
            await fakeLoading()
            this.pagination.page = page || this.pagination.page
            this.status = 'success'
        },
        toggleOrderById() {
            this.orderById = !this.orderById
        }
    },
    getters: {
        getPostsSortById(state): IPost[] {
            const posts = state.data

            const {startIndex, endIndex} = startEndIndexes(state.pagination.page, state.pagination.itemsPerPage)

            let res = posts.slice(startIndex, endIndex)

            if(state.orderById){
                res.sort((a, b) => b.id - a.id)
            }

            return res
        }
    }
})
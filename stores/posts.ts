import type {IPost, IPostState} from "~/types/posts";

const config = useRuntimeConfig()

const startEndIndexes = (page: number, itemsPerPage: number) => {

    let startIndex = 0;
    let endIndex = itemsPerPage;

    if(page > 1) {
        for(let i = 1; i < page; i++){
            startIndex += itemsPerPage;
            endIndex += itemsPerPage;
        }
    }
    // console.log('page: ', page, 'itemsPerPage: ', itemsPerPage, 'startIndex: ', startIndex, 'endIndex', endIndex);

    return {
        startIndex: startIndex,
        endIndex: endIndex
    }
}

const countPages = (allItemsCount: number, itemsPerPage: number): number => Math.ceil(allItemsCount / itemsPerPage)


const maxId = (dt: IPost[]) => {
    const lastItem = dt.length > 0 ? dt[dt.length - 1] : null
    return lastItem === null ? 1 : (lastItem?.id ? lastItem.id + 1 : 101) 
}

const fakeLoading = (ms = 400) => new Promise((resolve, reject) =>{
    setTimeout(() => resolve(''), ms)
})

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
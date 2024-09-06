import type {IPost} from "~/types/posts";

export const fakeLoading = (ms = 400) => new Promise((resolve, reject) =>{
    setTimeout(() => resolve(''), ms)
})
  
export const startEndIndexes = (page: number, itemsPerPage: number) => {

    let startIndex = 0;
    let endIndex = itemsPerPage;

    if(page > 1) {
        for(let i = 1; i < page; i++){
            startIndex += itemsPerPage;
            endIndex += itemsPerPage;
        }
    }

    return {
        startIndex: startIndex,
        endIndex: endIndex
    }
}

export const countPages = (allItemsCount: number, itemsPerPage: number): number => Math.ceil(allItemsCount / itemsPerPage)


export const maxId = (data: IPost[]) => {
    const lastItem = data.length > 0 ? data[data.length - 1] : null
    return lastItem === null ? 1 : (lastItem?.id ? lastItem.id + 1 : 101) 
} 
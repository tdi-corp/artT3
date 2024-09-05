export interface IPost {
    userId: number;
    id: number;
    title: string;
    body: string;
}

export interface IPagination {
    page: number;
    startPage: number;
    itemsPerPage: number;
    countPages: number;
}

export interface IPostState {
    data: IPost[];
    pagination: IPagination;
    orderById: boolean;
    status: string;
}

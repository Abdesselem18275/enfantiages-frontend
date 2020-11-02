export type PaginatedResponseType<T> = {
    count:number,
    next:string,
    previous:string,
    results: T[]
}
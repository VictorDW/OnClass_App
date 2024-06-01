
export interface Page<T> {
    content: T[],
    pageNumber: number,
    pageSize: number,
    totalElements: number,
    totalPages: number,
    first: boolean,
    last: boolean,
    empty: boolean
  }
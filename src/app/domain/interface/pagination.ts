export interface Pagination {
    size: number;
    direction: string
    page: number,
    orderBy?: string
}

export enum KeyEnum {
  SIZE = 'size',
  DIRECTION = 'direction',
  PAGE = 'page',
  ORDERBY = 'orderBy'
}

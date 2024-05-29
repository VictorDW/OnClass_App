export interface Pagination {
    size: number;
    direction: string
    page: number
}

export enum KeyEnum {
  SIZE = 'size',
  DIRECTION = 'direction',
  PAGE = 'page'
}
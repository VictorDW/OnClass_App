export interface Pagination {
    size: number | string;
    direction: number | string
    page: number | string
}

export enum KeyEnum {
  SIZE = 'size',
  DIRECTION = 'direction',
  PAGE = 'page'
}
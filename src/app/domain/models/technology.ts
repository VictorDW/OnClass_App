export interface Technology {
  id?: number;
  name: string;
  description: string;
}

export interface Technologies {
  content: Technology[],
  pageNumber: number,
  pageSize: number,
  totalElements: number,
  totalPages: number,
  first: boolean,
  last: boolean,
  empty: boolean
}

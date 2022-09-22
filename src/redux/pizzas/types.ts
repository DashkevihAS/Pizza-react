export type PizzaItem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface PizzaSliceState {
  items: PizzaItem[];
  status: Status;
}

export type SearchPizzaParams = {
  category: string;
  sortBy: string;
  order: string;
  search: string;
  currentPage: string;
};

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { URI_API } from '../../const/const';
import { RootState } from '../store';

type PizzaItem = {
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

interface PizzaSliceState {
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

//  Record<string, string>  - все ключи строчки, все значения строчки
export const fetchPizzas = createAsyncThunk(
  'pizzas/fetchPizzas',
  async (params: SearchPizzaParams) => {
    const { category, sortBy, order, search, currentPage } = params;
    const { data } = await axios.get<PizzaItem[]>(
      // eslint-disable-next-line max-len
      `${URI_API}?page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${order}${search}`,
    );
    return data as PizzaItem[];
  },
);

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING,
};

export const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state, action) => {
      state.items = [];
      state.status = Status.LOADING;
    });

    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });

    builder.addCase(fetchPizzas.rejected, (state, action) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
  // extraReducers: {
  //   [fetchPizzas.pending]: (state) => {
  //     state.items = [];
  //     state.status = 'loading';
  //   },
  //   [fetchPizzas.fulfilled]: (state, action) => {
  //     state.items = action.payload;
  //     state.status = 'success';
  //   },
  //   [fetchPizzas.rejected]: (state, action) => {
  //     state.status = 'error';
  //     state.items = [];
  //   },
  // },
});

export const selectPizzasData = (state: RootState) => state.pizzas;

export default pizzasSlice.reducer;

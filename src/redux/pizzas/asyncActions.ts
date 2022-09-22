import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { URI_API } from '../../const/const';
import { PizzaItem, SearchPizzaParams } from './types';

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

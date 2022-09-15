import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { URI_API } from '../../const/const';

export const fetchPizzas = createAsyncThunk(
  'pizzas/fetchPizzas',
  async (params) => {
    const { category, sortBy, order, search, currentPage } = params;
    const response = await axios.get(
      // eslint-disable-next-line max-len
      `${URI_API}?page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${order}${search}`
    );
    return response.data;
  }
);

const initialState = {
  items: [],
  status: '',
  error: {},
};

export const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.items = [];
      state.status = 'loading';
      state.error = {};
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = 'success';
      state.error = {};
    },
    [fetchPizzas.rejected]: (state, action) => {
      state.status = 'error';
      state.error = action.payload;
      state.items = [];
    },
  }
});
export const {
  setItems,
} = pizzasSlice.actions;

export const selectPizzasData = state => state.pizzas;

export default pizzasSlice.reducer;

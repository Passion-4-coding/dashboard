import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IArticlesSliceState } from './types';
import { ApiStatuses, IPaginationProps } from '../../app/types';
import { getArticles } from './api';

export const initialState: IArticlesSliceState = {
  list: [],
  status: ApiStatuses.initial,
  pagination: {
    page: 1,
    pageSize: 10
  },
  total: 0
};

export const fetchArticles = createAsyncThunk(
  'articles/fetchArticles',
  async (pagination: IPaginationProps) => {
    const response = await getArticles(pagination);
    return response.data;
  }
);

const slice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    setPagination(state: IArticlesSliceState, action: PayloadAction<IPaginationProps>) {
      state.pagination = action.payload;
    },
  },
  extraReducers: (builder) => builder
  // fetchArticles
  .addCase(fetchArticles.pending, (state) => {
    state.status = ApiStatuses.loading;
  })
  .addCase(fetchArticles.fulfilled, (state, action) => {
    state.status = ApiStatuses.success;
    state.list = action.payload.list;
    state.total = action.payload.total;
  })
  .addCase(fetchArticles.rejected, (state) => {
    state.status = ApiStatuses.fail;
  })
});

export const articles = slice.reducer;
export const actions = slice.actions;
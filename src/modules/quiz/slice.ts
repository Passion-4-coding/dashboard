import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IQuizSliceState } from './types';
import { ApiStatuses, IPaginationProps } from '../../app/types';
import { getQuestions } from './api';

export const initialState: IQuizSliceState = {
  list: [],
  status: ApiStatuses.initial,
  isCreateDrawerOpen: false,
  selectedQuestionId: null,
  pagination: {
    page: 1,
    pageSize: 10
  },
  total: 0
};

export const fetchQuestions = createAsyncThunk(
  'quiz/fetchQuestions',
  async (pagination: IPaginationProps) => {
    const response = await getQuestions(pagination);
    return response.data;
  }
);

const slice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setIsCreateDrawerOpen(state: IQuizSliceState, action: PayloadAction<boolean>) {
      state.isCreateDrawerOpen = action.payload;
    },
    setPagination(state: IQuizSliceState, action: PayloadAction<IPaginationProps>) {
      state.pagination = action.payload;
    },
  },
  extraReducers: (builder) => builder
  // fetchList
  .addCase(fetchQuestions.pending, (state) => {
    state.status = ApiStatuses.loading;
  })
  .addCase(fetchQuestions.fulfilled, (state, action) => {
    state.status = ApiStatuses.success;
    state.list = action.payload.list;
    state.total = action.payload.total;
  })
  .addCase(fetchQuestions.rejected, (state) => {
    state.status = ApiStatuses.fail;
  })
});

export const quiz = slice.reducer;
export const actions = slice.actions;
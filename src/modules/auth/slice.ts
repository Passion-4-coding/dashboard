import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IAuthSliceState } from './types';
import { ApiStatuses } from '../../app/types';
import { getUser } from './api';

export const initialState: IAuthSliceState = {
  user: null,
  status: ApiStatuses.initial
};

export const fetchUser = createAsyncThunk(
  'auth/fetchUser',
  async () => {
    const response = await getUser();
    return response.data;
  }
);

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => builder
  // fetchList
  .addCase(fetchUser.pending, (state) => {
    state.status = ApiStatuses.loading;
  })
  .addCase(fetchUser.fulfilled, (state, action) => {
    state.status = ApiStatuses.success;
    state.user = action.payload
  })
  .addCase(fetchUser.rejected, (state) => {
    state.status = ApiStatuses.fail;
  })
});

export const auth = slice.reducer;
export const actions = slice.actions;
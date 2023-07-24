import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IKarmaSliceState } from './types';
import { ApiStatuses, IPaginationProps } from '../../app/types';
import { getTelegramMembers, updateTelegramMemberActive as _updateTelegramMemberActive } from './api';

export const initialState: IKarmaSliceState = {
  telegramMembers: [],
  statusTelegramMembers: ApiStatuses.initial,
  telegramMembersPagination: {
    page: 1,
    pageSize: 10
  },
  telegramMembersTotal: 0
};


export const fetchTelegramMembers = createAsyncThunk(
  'karma/fetchTelegramMembers',
  async (pagination: IPaginationProps) => {
    const response = await getTelegramMembers(pagination);
    return response.data;
  }
);

export const updateTelegramMemberActive = createAsyncThunk(
  'karma/updateTelegramMemberActive',
  async ({ memberId, active }: { memberId: string, active: boolean }) => {
    const response = await _updateTelegramMemberActive(memberId, active);
    return response.data;
  }
);

const slice = createSlice({
  name: "karma",
  initialState,
  reducers: {
    setPagination(state: IKarmaSliceState, action: PayloadAction<IPaginationProps>) {
      state.telegramMembersPagination = action.payload;
    },
  },
  extraReducers: (builder) => builder
  // fetchArticles
  .addCase(fetchTelegramMembers.pending, (state) => {
    state.statusTelegramMembers = ApiStatuses.loading;
  })
  .addCase(fetchTelegramMembers.fulfilled, (state, action) => {
    state.statusTelegramMembers = ApiStatuses.success;
    state.telegramMembers = action.payload.list;
    state.telegramMembersTotal = action.payload.total;
  })
  .addCase(fetchTelegramMembers.rejected, (state) => {
    state.statusTelegramMembers = ApiStatuses.fail;
  })
  .addCase(updateTelegramMemberActive.fulfilled, (state, action) => {
    state.telegramMembers = state.telegramMembers.map((member => {
      if (member._id === action.payload._id) {
        return action.payload;
      }
      return member;
    }))
  })
});

export const karma = slice.reducer;
export const actions = slice.actions;
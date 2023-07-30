import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IKarmaEntriesFilters, IKarmaSliceState } from './types';
import { ApiStatuses, IPaginationProps } from '../../app/types';
import { getTelegramMembers, updateTelegramMemberActive as _updateTelegramMemberActive, getEntries } from './api';

export const initialState: IKarmaSliceState = {
  telegramMembers: [],
  statusTelegramMembers: ApiStatuses.initial,
  telegramMembersPagination: {
    page: 1,
    pageSize: 10
  },
  telegramMembersTotal: 0,
  entries: [],
  statusEntries: ApiStatuses.initial,
  entriesPagination: {
    page: 1,
    pageSize: 10
  },
  entriesTotal: 0,
  entriesFilters: {},
};


export const fetchTelegramMembers = createAsyncThunk(
  'karma/fetchTelegramMembers',
  async (pagination: IPaginationProps) => {
    const response = await getTelegramMembers(pagination);
    return response.data;
  }
);

export const fetchKarmaEntries = createAsyncThunk(
  'karma/fetchKarmaEntries',
  async ({ pagination, filters }: { pagination: IPaginationProps, filters: Partial<IKarmaEntriesFilters> }) => {
    const response = await getEntries(pagination, filters);
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
    setTelegramMembersPagination(state: IKarmaSliceState, action: PayloadAction<IPaginationProps>) {
      state.telegramMembersPagination = action.payload;
    },
    setKarmaEntriesPagination(state: IKarmaSliceState, action: PayloadAction<IPaginationProps>) {
      state.entriesPagination = action.payload;
    },
    setKarmaEntriesFilters(state: IKarmaSliceState, action: PayloadAction<Partial<IKarmaEntriesFilters>>) {
      state.entriesFilters = {
        ...state.entriesFilters,
        ...action.payload
      }
    },
  },
  extraReducers: (builder) => builder
  // fetchKarmaEntries
  .addCase(fetchKarmaEntries.pending, (state) => {
    state.statusEntries = ApiStatuses.loading;
  })
  .addCase(fetchKarmaEntries.fulfilled, (state, action) => {
    state.statusEntries = ApiStatuses.success;
    state.entries = action.payload.list;
    state.entriesTotal = action.payload.total;
  })
  .addCase(fetchKarmaEntries.rejected, (state) => {
    state.statusEntries = ApiStatuses.fail;
  })
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
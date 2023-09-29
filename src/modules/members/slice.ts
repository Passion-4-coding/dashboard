import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IMembersListFilters, IMembersSliceState } from './types';
import { ApiStatuses, IPaginationProps } from '../../app/types';
import { getMembers, getMembersForSelection } from './api';

export const initialState: IMembersSliceState = {
  list: [],
  membersForSelection: [],
  status: ApiStatuses.initial,
  membersForSelectionStatus: ApiStatuses.initial,
  pagination: {
    page: 1,
    pageSize: 10
  },
  total: 0,
  filters: {},
};

export const fetchMembers = createAsyncThunk(
  'karma/fetchMembers',
  async ({ pagination, filters }: { pagination: IPaginationProps, filters: Partial<IMembersListFilters> }) => {
    const response = await getMembers(pagination, filters);
    return response.data;
  }
);

export const fetchMembersForSelection = createAsyncThunk(
  'karma/fetchMembersForSelection',
  async ({ search }: { search: string }) => {
    const response = await getMembersForSelection(search);
    return response.data;
  }
);

const slice = createSlice({
  name: "members",
  initialState,
  reducers: {
    setPagination(state: IMembersSliceState, action: PayloadAction<IPaginationProps>) {
      state.pagination = action.payload;
    },
    setMembersListFilters(state: IMembersSliceState, action: PayloadAction<Partial<IMembersListFilters>>) {
      state.filters = {
        ...state.filters,
        ...action.payload
      }
    },
  },
  extraReducers: (builder) => builder
  // fetchMembers
  .addCase(fetchMembers.pending, (state) => {
    state.status = ApiStatuses.loading;
  })
  .addCase(fetchMembers.fulfilled, (state, action) => {
    state.status = ApiStatuses.success;
    state.list = action.payload.list;
    state.total = action.payload.total;
  })
  .addCase(fetchMembers.rejected, (state) => {
    state.status = ApiStatuses.fail;
  })
  .addCase(fetchMembersForSelection.pending, (state) => {
    state.membersForSelectionStatus = ApiStatuses.loading;
  })
  .addCase(fetchMembersForSelection.fulfilled, (state, action) => {
    state.membersForSelectionStatus = ApiStatuses.success;
    state.membersForSelection = action.payload;
  })
  .addCase(fetchMembersForSelection.rejected, (state) => {
    state.membersForSelectionStatus = ApiStatuses.fail;
  })
});

export const members = slice.reducer;
export const actions = slice.actions;
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IArticlesSliceState } from './types';
import { ApiStatuses, IPaginationProps } from '../../app/types';
import { getArticles, getArticleById, getTag, getTags, getTagsForSearch } from './api';

export const initialState: IArticlesSliceState = {
  list: [],
  tags: [],
  tagsForSearch: [],
  status: ApiStatuses.initial,
  tagsStatus: ApiStatuses.initial,
  tagStatus: ApiStatuses.initial,
  tagsForSearchStatus: ApiStatuses.initial,
  articleStatus: ApiStatuses.initial,
  pagination: {
    page: 1,
    pageSize: 10
  },
  tagsPagination: {
    page: 1,
    pageSize: 10
  },
  total: 0,
  tagsTotal: 0,
};

export const fetchArticle = createAsyncThunk(
  'articles/fetchArticle',
  async (id: string) => {
    const response = await getArticleById(id);
    return response.data;
  }
);

export const fetchArticles = createAsyncThunk(
  'articles/fetchArticles',
  async (pagination: IPaginationProps) => {
    const response = await getArticles(pagination);
    return response.data;
  }
);

export const fetchATags = createAsyncThunk(
  'articles/fetchATags',
  async (pagination: IPaginationProps) => {
    const response = await getTags(pagination);
    return response.data;
  }
);

export const fetchATag = createAsyncThunk(
  'articles/fetchATag',
  async (tagId: string) => {
    const response = await getTag(tagId);
    return response.data;
  }
);

export const fetchATagsForSearch = createAsyncThunk(
  'articles/fetchATagsForSearch',
  async (search: string) => {
    const response = await getTagsForSearch(search);
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
    setTagsPagination(state: IArticlesSliceState, action: PayloadAction<IPaginationProps>) {
      state.tagsPagination = action.payload;
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
  // fetchATags
  .addCase(fetchATags.pending, (state) => {
    state.tagsStatus = ApiStatuses.loading;
  })
  .addCase(fetchATags.fulfilled, (state, action) => {
    state.tagsStatus = ApiStatuses.success;
    state.tags = action.payload.list;
    state.tagsTotal = action.payload.total;
  })
  .addCase(fetchATags.rejected, (state) => {
    state.tagsStatus = ApiStatuses.fail;
  })
  // fetchATagsForSearch
  .addCase(fetchATagsForSearch.pending, (state) => {
    state.tagsForSearchStatus = ApiStatuses.loading;
  })
  .addCase(fetchATagsForSearch.fulfilled, (state, action) => {
    state.tagsForSearchStatus = ApiStatuses.success;
    state.tagsForSearch = action.payload;
  })
  .addCase(fetchATagsForSearch.rejected, (state) => {
    state.tagsForSearchStatus = ApiStatuses.fail;
  })
  // fetchATag
  .addCase(fetchATag.pending, (state) => {
    state.tagStatus = ApiStatuses.loading;
  })
  .addCase(fetchATag.fulfilled, (state, action) => {
    state.tagStatus = ApiStatuses.success;
    state.tag = action.payload;
  })
  .addCase(fetchATag.rejected, (state) => {
    state.tagStatus = ApiStatuses.fail;
  })
  // fetchArticlesBySlug
  .addCase(fetchArticle.pending, (state) => {
    state.articleStatus = ApiStatuses.loading;
  })
  .addCase(fetchArticle.fulfilled, (state, action) => {
    state.articleStatus = ApiStatuses.success;
    state.article = action.payload;
  })
  .addCase(fetchArticle.rejected, (state) => {
    state.articleStatus = ApiStatuses.fail;
  })
});

export const articles = slice.reducer;
export const actions = slice.actions;
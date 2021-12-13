import { createSlice, PayloadAction, createAction } from '@reduxjs/toolkit';
import { takeLatest } from 'redux-saga/effects';

import { IArticle, ISidebarItem } from '../../interfaces/article';

export interface IArticleState {
  articles: ISidebarItem[];
  article: {
    [k: number]: {
      data: IArticle;
      loading: boolean;
      error: boolean;
    };
  };
}

const initialState: IArticleState = {
  articles: [],
  article: {},
};

const getArticles = createAction<ISidebarItem[]>('getArticles');

export const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getArticles, (state, action: PayloadAction<ISidebarItem[]>) => {
      state.articles = action.payload;
    });
  },
});

export function* articleSaga() {
  yield takeLatest(getArticles);
}
export const articleActions = { ...articleSlice.actions, getArticles };
export default articleSlice;

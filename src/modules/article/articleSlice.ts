import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeEvery } from 'redux-saga/effects';

import { graphql, useStaticQuery } from 'gatsby';
import { IArticle, ISidebarItem } from '../../interfaces/article';

import useArticleList from '../../components/layout/hooks/useArticleList';

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

export const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    getArticle: (state, action: PayloadAction<IArticle>) => {
      state.article[action.payload.id] = {
        data: action.payload,
        loading: false,
        error: false,
      };
    },
    getArticles: (state, action: PayloadAction<ISidebarItem[]>) => {
      state.articles = action.payload;
    },
  },
});

const { getArticles } = articleSlice.actions;

function* getArticlesSaga() {
  // const articles: Array<ISidebarItem> = .allMdx.nodes.map((item: any) => ({
  //   id: item.id,
  //   path: item.frontmatter.path,
  //   thumbnail: item.frontmatter.thumbnail.publicURL,
  //   images: item.frontmatter.images.map((item: any) => ({ id: item.id, url: item.publicURL })),
  // }));

  const response: ISidebarItem[] = yield call(
    useStaticQuery(graphql`
      query MyQuery {
        allMdx(sort: { fields: frontmatter___id, order: ASC }) {
          nodes {
            id
            frontmatter {
              path
              thumbnail {
                publicURL
              }
              images {
                id
                publicURL
              }
            }
          }
        }
      }
    `),
  );

  console.log(response);
  yield put(getArticles(response));
}

export function* articleSaga() {
  yield takeEvery(getArticles, getArticlesSaga);
}
export const articleActions = { ...articleSlice.actions };
export default articleSlice;

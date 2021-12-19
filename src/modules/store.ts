import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from '@redux-saga/core';
import { all } from 'redux-saga/effects';

import { articleSaga, articleSlice } from './article/articleSlice';

const sagaMiddleware = createSagaMiddleware();

function* rootSage() {
  yield all([articleSaga]);
}

const store = configureStore({
  reducer: {
    article: articleSlice.reducer,
  },
  middleware: [sagaMiddleware],
  devTools: true,
});

sagaMiddleware.run(rootSage);

export default store;
export type RootType = ReturnType<typeof store.getState>;
export type AppDispath = typeof store.dispatch;

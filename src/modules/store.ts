import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from '@redux-saga/core';
import { all } from 'redux-saga/effects';

const sagaMiddleware = createSagaMiddleware();

function* rootSage() {
  yield all([]);
}

const store = configureStore({
  reducer: {},
  middleware: [sagaMiddleware],
  devTools: true,
});

sagaMiddleware.run(rootSage);

export default store;
export type RootType = ReturnType<typeof store.getState>;
export type AppDispath = typeof store.dispatch;

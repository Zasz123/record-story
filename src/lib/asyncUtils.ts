import { PayloadAction } from '@reduxjs/toolkit';
import { call, put } from 'redux-saga/effects';

export const createActionString = (type: string) => {
  return { success: `${type}Success`, error: `${type}Error` };
};

export const createPromiseSaga = (type: string, promiseCreator) => {
  const { success, error } = createActionString(type);

  return function* saga(action: PayloadAction) {
    try {
      const response = yield call(promiseCreator, action.payload);
      yield put({
        type: success,
        payload: response,
      });
    } catch (err) {
      yield put({
        type: error,
        payload: err.message,
        error: true,
      });
    }
  };
};

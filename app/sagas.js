import { call, put, takeLatest, select, take, cancel } from 'redux-saga/effects';
import request from 'utils/request';
import {API_URL} from 'constants/app';

export function* get(API, data, actionSuccess, actionError) {
  const requestURL = `${API_URL}/${API}`;

  try {
    const result = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(data),
    });

    yield [
      put(actionSuccess(result)),
      put(console.log('Success')),
    ];
  } catch (err) {
    yield [
      put(actionError(err)),
      put(console.log('Error', err)),
    ];
  }
}
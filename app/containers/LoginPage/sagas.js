import { call, put, takeLatest, select, take, cancel } from 'redux-saga/effects';
import request from 'utils/request';
import { API_URL, SEARCH_LIMIT } from 'constants/app';
import { LOCATION_CHANGE } from 'react-router-redux';
import * as consts from './constants';
import * as actions from './actions';
import loginSelector from './selectors';

export function* login() {
  const data = yield select(loginSelector('loginData'));
  const requestURL = `${API_URL}/login`;

  try {
    const result = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(data),
    });

    yield [
      put(actions.loginSuccess(result))
    ];
  } catch (err) {
    yield [
      put(actions.loginError(err))
    ];
  }
}

export function* loginData() {
  const watcher = yield [
    takeLatest(consts.LOGIN, login)
  ];

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield watcher.map((task) => cancel(task));
}

// All sagas to be loaded
export default [
  loginData,
];

import { call, put, takeLatest, select, take, cancel } from 'redux-saga/effects';
import request from 'utils/request';
import { API_URL, SEARCH_LIMIT } from 'constants/app';
import { LOCATION_CHANGE } from 'react-router-redux';
import * as consts from './constants';
import * as actions from './actions';
import { makeSelectGetUserInfo } from './selectors';

export function* getUserInfo() {
  const data = yield select(makeSelectGetUserInfo());
  const requestURL = `${API_URL}/app/getUserInfo`;

  try {
    const result = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(data),
    });

    yield [
      put(actions.getUserInfoSuccess(result))
    ];
  } catch (err) {
    yield [
      put(actions.getUserInfoError(err))
    ];
  }
}

export function* appData() {
  const watcher = yield [
    takeLatest(consts.GET_USERINFO, getUserInfo)
  ];

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield watcher.map((task) => cancel(task));
}

// All sagas to be loaded
export default [
  appData,
];

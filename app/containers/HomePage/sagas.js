import { call, put, takeLatest, select, take, cancel } from 'redux-saga/effects';
import request from 'utils/request';
import { API_URL, SEARCH_LIMIT } from 'constants/app';
import { LOCATION_CHANGE } from 'react-router-redux';
import * as consts from './constants';
import * as actions from './actions';
import homeSelector from './selectors';

export function* search() {
  const data = yield select(homeSelector('searchParams'));
  const requestURL = `${API_URL}/app/getModules`;

  try {
    const result = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(data),
    });

    yield [
      put(actions.searchSuccess(result))
    ];
  } catch (err) {
    yield [
      put(actions.searchError(err))
    ];
  }
}

export function* homeData() {
  const watcher = yield [
    takeLatest(consts.SEARCH, search),
  ];

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield watcher.map((task) => cancel(task));
}

// All sagas to be loaded
export default [
  homeData,
];

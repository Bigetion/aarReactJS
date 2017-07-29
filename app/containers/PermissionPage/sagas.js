import { call, put, takeLatest, select, take, cancel } from 'redux-saga/effects';
import request from 'utils/request';
import { API_URL, SEARCH_LIMIT } from 'constants/app';
import { LOCATION_CHANGE } from 'react-router-redux';
import * as consts from './constants';
import * as actions from './actions';
import permissionsSelector from './selectors';

export function* getPermissions() {
  const data = yield select(permissionsSelector('searchParams'));
  const requestURL = `${API_URL}/permissions/getPermissions`;

  try {
    const result = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(data),
    });

    yield [
      put(actions.getPermissionsSuccess(result))
    ];
  } catch (err) {
    yield [
      put(actions.getPermissionsError(err))
    ];
  }
}

export function* updatePermissions() {
  const data = yield select(permissionsSelector('updatedData'));
  const requestURL = `${API_URL}/permissions/updatePermissions`;
  try {
    const result = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(data),
    });

    yield [
      put(actions.getPermissionsSuccess(result))
    ];
  } catch (err) {
    yield [
      put(actions.getPermissionsError(err))
    ];
  }
}

export function* permissionsData() {
  const watcher = yield [
    takeLatest(consts.GET_PERMISSIONS, getPermissions),
    takeLatest(consts.UPDATE_PERMISSIONS, updatePermissions)
  ];

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield watcher.map((task) => cancel(task));
}

// All sagas to be loaded
export default [
  permissionsData,
];

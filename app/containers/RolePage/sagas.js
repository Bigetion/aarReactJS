import { call, put, takeLatest, select, take, cancel } from 'redux-saga/effects';
import request from 'utils/request';
import { API_URL, SEARCH_LIMIT } from 'constants/app';
import { LOCATION_CHANGE } from 'react-router-redux';
import * as consts from './constants';
import * as actions from './actions';
import rolesSelector from './selectors';

export function* search() {
  const data = yield select(rolesSelector('searchParams'));
  const requestURL = `${API_URL}/roles/getData`;

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

export function* create() {
  const data = yield select(rolesSelector('createdData'));
  const requestURL = `${API_URL}/roles/submitAdd`;

  try {
    const result = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify({
        roleName: data.roleName,
        description: data.description
      }),
    });

    yield [
      put(actions.createSuccess(result))
    ];
  } catch (err) {
    yield [
      put(actions.createError(err))
    ];
  }
}

export function* update() {
  const data = yield select(rolesSelector('updatedData'));
  const requestURL = `${API_URL}/roles/submitEdit`;

  try {
    const result = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify({
        idRole: data.idRole,
        roleName: data.roleName,
        description: data.description
      }),
    });

    yield [
      put(actions.updateSuccess(result))
    ];
  } catch (err) {
    yield [
      put(actions.updateError(err))
    ];
  }
}

export function* deletes() {
  const data = yield select(rolesSelector('deletedId'));
  const requestURL = `${API_URL}/roles/submitDelete`;

  try {
    const result = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify({
        idRole: data.idRole
      }),
    });

    yield [
      put(actions.deleteSuccess(result))
    ];
  } catch (err) {
    yield [
      put(actions.deleteError(err))
    ];
  }
}

export function* rolesData() {
  const watcher = yield [
    takeLatest(consts.SEARCH, search),
    takeLatest(consts.CREATE, create),    
    takeLatest(consts.UPDATE, update),   
    takeLatest(consts.DELETE, deletes),   
  ];

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield watcher.map((task) => cancel(task));
}

// All sagas to be loaded
export default [
  rolesData,
];

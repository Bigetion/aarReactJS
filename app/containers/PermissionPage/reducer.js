/*
 *
 * PermissionPage reducer
 *
 */

import { fromJS } from 'immutable';
import * as consts from './constants';

const initialState = {};

function permissionPageReducer(state = fromJS(initialState), action) {
  switch (action.type) {
    case consts.GET_PERMISSIONS:
      return state;
    case consts.GET_PERMISSIONS_SUCCESS:
      return state
        .set('getPermissionsSuccess', action.result)
    case consts.GET_PERMISSIONS_ERROR:
      return state
        .set('getPermissionsError', action.message);
    case consts.UPDATE_PERMISSIONS:
      return state
        .set('updatedData', action.updatedData);
    case consts.UPDATE_PERMISSIONS_SUCCESS:
      return state
        .set('getPermissionsSuccess', action.result)
    case consts.UPDATE_PERMISSIONS_ERROR:
      return state
        .set('getPermissionsError', action.message);
    default:
      return state;
  }
}

export default permissionPageReducer;

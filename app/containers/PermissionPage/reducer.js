/*
 *
 * PermissionPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  STATE_DEFAULT,
} from './constants';

const initialState = {};
initialState[STATE_DEFAULT] = 'defaultValue'

function permissionPageReducer(state = fromJS(initialState), action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default permissionPageReducer;

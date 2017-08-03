/*
 *
 * LoginPage reducer
 *
 */

import { fromJS } from 'immutable';
import * as consts from './constants';

const initialState = {};

function loginPageReducer(state = fromJS(initialState), action) {
  switch (action.type) {
    case consts.LOGIN:
      return state
        .set('loginData', action.loginData);
    case consts.LOGIN_SUCCESS:
      return state
        .set('loginSuccess', action.result)
    case consts.LOGIN_ERROR:
      return state
        .set('loginError', action.message);
    default:
      return state;
  }
}

export default loginPageReducer;

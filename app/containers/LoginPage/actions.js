/*
 *
 * LoginPage actions
 *
 */

import {
  LOGIN, LOGIN_SUCCESS, LOGIN_ERROR
} from './constants';

// LOGIN ------------------------------

export function login(loginData) {
  return {
    type: LOGIN,
    loginData,
  };
}

export function loginSuccess(result) {
  return {
    type: LOGIN_SUCCESS,
    result,
  };
}

export function loginError(message) {
  return {
    type: LOGIN_ERROR,
    message,
  };
}

//  -----------------------------------

/*
 *
 * PermissionPage actions
 *
 */

import {
  GET_PERMISSIONS, GET_PERMISSIONS_SUCCESS, GET_PERMISSIONS_ERROR,UPDATE_PERMISSIONS, UPDATE_PERMISSIONS_SUCCESS, UPDATE_PERMISSIONS_ERROR
} from './constants';

// SEARCH ------------------------------

export function getPermissions(searchParams) {
  return {
    type: GET_PERMISSIONS,
    searchParams,
  };
}

export function getPermissionsSuccess(result) {
  return {
    type: GET_PERMISSIONS_SUCCESS,
    result,
  };
}

export function getPermissionsError(message) {
  return {
    type: GET_PERMISSIONS_ERROR,
    message,
  };
}

export function updatePermissions(updatedData) {
  return {
    type: UPDATE_PERMISSIONS,
    updatedData,
  };
}

export function updatePermissionsSuccess(result) {
  return {
    type: UPDATE_PERMISSIONS_SUCCESS,
    result,
  };
}

export function updatePermissionsError(message) {
  return {
    type: UPDATE_PERMISSIONS_ERROR,
    message,
  };
}

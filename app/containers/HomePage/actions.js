/*
 *
 * HomePage actions
 *
 */

import {
  SEARCH, SEARCH_SUCCESS, SEARCH_ERROR,
  READ, READ_SUCCESS, READ_ERROR,
  CREATE, CREATE_SUCCESS, CREATE_ERROR,
  UPDATE, UPDATE_SUCCESS, UPDATE_ERROR,
  DELETE, DELETE_SUCCESS, DELETE_ERROR,
} from './constants';

// SEARCH ------------------------------

export function search(searchParams) {
  return {
    type: SEARCH,
    searchParams,
  };
}

export function searchSuccess(result) {
  return {
    type: SEARCH_SUCCESS,
    result,
  };
}

export function searchError(message) {
  return {
    type: SEARCH_ERROR,
    message,
  };
}
//  -----------------------------------

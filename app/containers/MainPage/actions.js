/*
 *
 * MainPage actions
 *
 */

import {
  SEARCH, SEARCH_SUCCESS, SEARCH_ERROR
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

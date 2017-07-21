/*
 *
 * RolePage actions
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

// READ ------------------------------

export function read(id) {
  return {
    type: READ,
    id,
  };
}

export function readSuccess(result) {
  return {
    type: READ_SUCCESS,
    result,
  };
}

export function readError(message) {
  return {
    type: READ_ERROR,
    message,
  };
}

// CREATE ------------------------------

export function create(data) {
  return {
    type: CREATE,
    data,
  };
}

export function createSuccess(result) {
  return {
    type: CREATE_SUCCESS,
    result,
  };
}

export function createError(message) {
  return {
    type: CREATE_ERROR,
    message,
  };
}

// UPDATE ------------------------------

export function update(data) {
  return {
    type: UPDATE,
    data,
  };
}

export function updateSuccess(result) {
  return {
    type: UPDATE_SUCCESS,
    result,
  };
}

export function updateError(message) {
  return {
    type: UPDATE_ERROR,
    message,
  };
}

// DELETE ------------------------------

export function deletes(deletedId) {
  return {
    type: DELETE,
    deletedId,
  };
}

export function deleteSuccess(result) {
  return {
    type: DELETE_SUCCESS,
    result,
  };
}

export function deleteError(message) {
  return {
    type: DELETE_ERROR,
    message,
  };
}

//  -----------------------------------

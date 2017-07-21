/*
 *
 * RolePage reducer
 *
 */

import { fromJS } from 'immutable';
import * as consts from './constants';

const initialState = {};

function rolePageReducer(state = fromJS(initialState), action) {
  switch (action.type) {
    case consts.SEARCH:
      return state;
    case consts.SEARCH_SUCCESS:
      return state
        .set('searchSuccess', action.result)
        .set('createSuccess', null)
        .set('updateSuccess', null)
        .set('deleteSuccess', null)
    case consts.SEARCH_ERROR:
      return state
        .set('searchError', action.message);
    case consts.CREATE:
      return state
        .set('createdData', action.data);
    case consts.CREATE_SUCCESS:
      return state
        .set('createSuccess', action.result)
    case consts.CREATE_ERROR:
      return state
        .set('createError', action.message);
    case consts.UPDATE:
      return state
        .set('updatedData', action.data);
    case consts.UPDATE_SUCCESS:
      return state
        .set('updateSuccess', action.result)
    case consts.UPDATE_ERROR:
      return state
        .set('updateError', action.message);
    case consts.DELETE:
      return state
        .set('deletedId', action.deletedId);
    case consts.DELETE_SUCCESS:
      return state
        .set('deleteSuccess', action.result)
    case consts.DELETE_ERROR:
      return state
        .set('deleteError', action.message);
    default:
      return state;
  }
}

export default rolePageReducer;

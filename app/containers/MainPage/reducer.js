/*
 *
 * MainPage reducer
 *
 */

import { fromJS } from 'immutable';
import * as consts from './constants';

const initialState = {};

function mainPageReducer(state = fromJS(initialState), action) {
  switch (action.type) {
    case consts.SEARCH:
      return state;
    case consts.SEARCH_SUCCESS:
      return state
        .set('searchSuccess', action.result)
    case consts.SEARCH_ERROR:
      return state
        .set('searchError', action.message);
    default:
      return state;
  }
}

export default mainPageReducer;

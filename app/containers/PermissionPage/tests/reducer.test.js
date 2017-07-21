
import { fromJS } from 'immutable';
import permissionPageReducer from '../reducer';

describe('permissionPageReducer', () => {
  it('returns the initial state', () => {
    expect(permissionPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});

import { createSelector } from 'reselect';
import _ from 'lodash';

/**
 * Direct selector to the permissionPage state domain
 */
const selectPermissionPageDomain = () => (state) => state.get('permissionPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by PermissionPage
 */

const makeSelectPermissionPage = (item) => createSelector(
  selectPermissionPageDomain(),
  (substate) => _.isUndefined(item) || _.isNull(item) || item === '' ? substate.toJS() : substate.get(item)
);

export default makeSelectPermissionPage;
export {
  selectPermissionPageDomain,
};

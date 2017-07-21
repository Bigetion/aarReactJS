import { createSelector } from 'reselect';
import _ from 'lodash';

/**
 * Direct selector to the rolePage state domain
 */
const selectRolePageDomain = () => (state) => state.get('rolePage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by RolePage
 */

const makeSelectRolePage = (item) => createSelector(
  selectRolePageDomain(),
  (substate) => _.isUndefined(item) || _.isNull(item) || item === '' ? substate.toJS() : substate.get(item)
);

export default makeSelectRolePage;
export {
  selectRolePageDomain,
};

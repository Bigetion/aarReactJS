import { createSelector } from 'reselect';
import _ from 'lodash';

/**
 * Direct selector to the userPage state domain
 */
const selectUserPageDomain = () => (state) => state.get('userPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by UserPage
 */

const makeSelectUserPage = (item) => createSelector(
  selectUserPageDomain(),
  (substate) => _.isUndefined(item) || _.isNull(item) || item === '' ? substate.toJS() : substate.get(item)
);

export default makeSelectUserPage;
export {
  selectUserPageDomain,
};

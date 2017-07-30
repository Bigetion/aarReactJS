import { createSelector } from 'reselect';
import _ from 'lodash';

/**
 * Direct selector to the homePage state domain
 */
const selectHomePageDomain = () => (state) => state.get('homePage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by HomePage
 */

const makeSelectHomePage = (item) => createSelector(
  selectHomePageDomain(),
  (substate) => _.isUndefined(item) || _.isNull(item) || item === '' ? substate.toJS() : substate.get(item)
);

export default makeSelectHomePage;
export {
  selectHomePageDomain,
};

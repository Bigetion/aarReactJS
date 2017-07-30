import { createSelector } from 'reselect';
import _ from 'lodash';

/**
 * Direct selector to the mainPage state domain
 */
const selectMainPageDomain = () => (state) => state.get('mainPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by MainPage
 */

const makeSelectMainPage = (item) => createSelector(
  selectMainPageDomain(),
  (substate) => _.isUndefined(item) || _.isNull(item) || item === '' ? substate.toJS() : substate.get(item)
);

export default makeSelectMainPage;
export {
  selectMainPageDomain,
};

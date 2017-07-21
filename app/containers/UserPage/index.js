/*
 *
 * UserPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import makeSelectUserPage from './selectors';
import messages from './messages';

export class UserPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const meta = (
      <Helmet
        title="User Page"
        meta={[
          { name: 'description', content: 'Description of User Page' },
        ]}
      />
    );

    const pageHeader = (
      <div className="row">
        <div className="col-md-12">
          <h1 className="page-header ng-scope">Users</h1>
        </div>
      </div>
    )
    return (
      <div>
        {meta}
        {pageHeader}
      </div>
    );
  }
}

UserPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  UserPage: makeSelectUserPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);

/*
 *
 * PermissionPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import makeSelectPermissionPage from './selectors';
import messages from './messages';

export class PermissionPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const meta = (
      <Helmet
        title="Permission Page"
        meta={[
          { name: 'description', content: 'Description of Permission Page' },
        ]}
      />
    );

    const pageHeader = (
      <div className="row">
        <div className="col-md-12">
          <h1 className="page-header ng-scope">Permissions</h1>
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

PermissionPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  PermissionPage: makeSelectPermissionPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PermissionPage);

/*
 *
 * RolePage
 *
 */

import React from 'react';
import {connect} from 'react-redux';
import {push, replace} from 'react-router-redux';

export class RolePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        {React.cloneElement(this.props.children, {...this.props})}
      </div>
    );
  }
}

RolePage.propTypes = {
  children: React.PropTypes.node,
};

function mapDispatchToProps(dispatch) {
  return {
    onRedirectToList: () => {
      dispatch(push('/roles'));
      dispatch(replace('/roles'));
    },
  };
}

export default connect(null, mapDispatchToProps)(RolePage);

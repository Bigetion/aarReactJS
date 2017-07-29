/*
 *
 * UserPage
 *
 */

import React from 'react';
import {connect} from 'react-redux';
import {push, replace} from 'react-router-redux';

export class UserPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        {React.cloneElement(this.props.children, {...this.props})}
      </div>
    );
  }
}

UserPage.propTypes = {
  children: React.PropTypes.node,
};

function mapDispatchToProps(dispatch) {
  return {
    
  };
}

export default connect(null, mapDispatchToProps)(UserPage);

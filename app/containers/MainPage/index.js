/*
 *
 * MainPage
 *
 */

import React from 'react';
import {connect} from 'react-redux';
import {push, replace} from 'react-router-redux';

export class MainPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        {React.cloneElement(this.props.children, {...this.props})}
      </div>
    );
  }
}

MainPage.propTypes = {
  children: React.PropTypes.node,
};

function mapDispatchToProps(dispatch) {
  return {
    
  };
}

export default connect(null, mapDispatchToProps)(MainPage);

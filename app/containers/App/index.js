/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { replace } from 'react-router-redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Helmet from 'react-helmet';
import styled from 'styled-components';

import Header from 'components/Header';
import Footer from 'components/Footer';
import Img from 'components/Img';

import withProgressBar from 'components/ProgressBar';
import { Link } from 'react-router';

import LogoImg from 'assets/img/aar32.png';

import { makeSelectGetUserInfo } from './selectors';
import * as actions from './actions';

const AppWrapper = styled.div``;

class App extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      currentRoutes: ''
    }
    this.logout = this.logout.bind(this);

    this.currentRoutes = props.router.location.pathname;
  }

  componentDidMount() {
    this.props.onGetUserInfo();
  }

  componentDidUpdate(prevProps, nextProps) {
    if (this.state.currentRoutes != prevProps.router.location.pathname) {
      this.currentRoutes = prevProps.router.location.pathname;
      this.setState({ currentRoutes: prevProps.router.location.pathname })
    }
  }

  logout() {
    const currentRoutes = this.props.location.pathname;
    if (currentRoutes != '/login') this.props.onLogout();
  }

  render() {
    return (
      <AppWrapper>
        <Helmet
          titleTemplate="%s - AAR Framework"
          defaultTitle="AAR Framework"
          meta={[
            { name: 'description', content: 'AAR Framework application' },
          ]}
        />
        <div className="content-wrapper">
          <section className="content">
            <div className="row">
              {(this.currentRoutes != '/login') && (<div className="col-md-2">
                <div className="box box-widget">
                  <div className="box-body box-profile"><Img src={LogoImg} alt="Logo" /> <strong>AAR Framework</strong></div>
                  <div className="box-footer no-padding">
                    <ul className="nav nav-stacked">
                      <li className={(this.currentRoutes == '/') ? 'active' : ''}><Link to="/">Modules</Link></li>
                      <li className={(this.currentRoutes == '/roles') ? 'active' : ''}><Link to="/roles">Roles</Link></li>
                      <li className={(this.currentRoutes == '/permissions') ? 'active' : ''}><Link to="/permissions">Permissions</Link></li>
                      <li className={(this.currentRoutes == '/users') ? 'active' : ''}><Link to="/users">Users</Link></li>
                      <li><a onClick={this.logout}>Logout</a></li>
                    </ul>
                  </div>
                </div>
              </div>)}
              <div className={(this.currentRoutes != '/login') ? 'col-md-10' : 'col-md-12'}>
                {React.Children.toArray(this.props.children)}
              </div>
            </div>
          </section>
        </div>
      </AppWrapper>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.node,
  onLogout: React.PropTypes.func,
  onGetUserInfo: React.PropTypes.func,
  onGetUserInfoSuccess: React.PropTypes.object
};

App.contextTypes = {
  router: React.PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  onGetUserInfoSuccess: makeSelectGetUserInfo('getUserInfoSuccess')
});

function mapDispatchToProps(dispatch) {
  return {
    onGetUserInfo: (val) => dispatch(actions.getUserInfo(val)),
    onLogout: () => {
      localStorage.clear();
      dispatch(replace({
        pathname: '/login'
      }))
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withProgressBar(App));

// export default withProgressBar(App);

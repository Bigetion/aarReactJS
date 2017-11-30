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

import Img from 'components/Img';

import { Layout, Menu, Icon } from 'antd';

import withProgressBar from 'components/ProgressBar';
import { Link } from 'react-router';

import LogoImg from 'assets/img/aar32.png';

import { makeSelectGetUserInfo } from './selectors';
import * as actions from './actions';


const AppWrapper = styled.div``;
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

class App extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      currentRoutes: '',
    };

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
    if (currentRoutes !== '/login') this.props.onLogout();
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
        <Layout>
          {(this.currentRoutes !== '/login') && (
            <Header className="header">
              <Img src={LogoImg} alt="Logo" /> <span style={{ fontSize: '20px', marginLeft: '10px' }}>AAR Framework</span>
            </Header>
          )}
          <Layout>
            {(this.currentRoutes !== '/login') && (<Sider width={200} style={{ background: '#fff' }}>
              <Menu defaultSelectedKeys={['1']} mode="inline">
                <Menu.Item key="1" onClick={this.handleClick}>
                  <Icon type="home" /> Modules
                  <Link to="/"> </Link>
                </Menu.Item>
                <Menu.Item key="2" onClick={this.handleClick}>
                  <Icon type="desktop" /> Roles
                  <Link to="/roles"> </Link>
                </Menu.Item>
                <Menu.Item key="3" onClick={this.handleClick}>
                  <Icon type="file" />
                  <span>Permissions</span>
                  <Link to="/permissions"> </Link>
                </Menu.Item>
                <Menu.Item key="4" onClick={this.handleClick}>
                  <Icon type="user" />
                  <span>Users</span>
                  <Link to="/users"> </Link>
                </Menu.Item>
                <Menu.Item key="5" onClick={this.logout}>
                  <Icon type="logout" />
                  <span onClick={this.logout}>Logout</span>
                </Menu.Item>
              </Menu>
            </Sider>)}
            <Layout style={{ padding: (this.currentRoutes !== '/login') ? '0 0 0 10px' : '0' }}>
              <Content style={{ background: (this.currentRoutes !== '/login') ? '#fff' : 'none', padding: 24, margin: 0, minHeight: 280 }}>
                {React.Children.toArray(this.props.children)}
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </AppWrapper>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.node,
  onLogout: React.PropTypes.func,
  onGetUserInfo: React.PropTypes.func,
  onGetUserInfoSuccess: React.PropTypes.object,
};

App.contextTypes = {
  router: React.PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  onGetUserInfoSuccess: makeSelectGetUserInfo('getUserInfoSuccess'),
});

function mapDispatchToProps(dispatch) {
  return {
    onGetUserInfo: (val) => dispatch(actions.getUserInfo(val)),
    onLogout: () => {
      localStorage.clear();
      window.location.reload();
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withProgressBar(App));

// export default withProgressBar(App);

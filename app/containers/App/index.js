/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';

import Header from 'components/Header';
import Footer from 'components/Footer';
import Img from 'components/Img';

import withProgressBar from 'components/ProgressBar';
import { Link } from 'react-router';

import LogoImg from 'assets/img/aar32.png';

const AppWrapper = styled.div``;

export function App(props) {
  return (
    <AppWrapper>
      <Helmet
        titleTemplate="%s - React.js Boilerplate"
        defaultTitle="React.js Boilerplate"
        meta={[
          { name: 'description', content: 'A React.js Boilerplate application' },
        ]}
      />
      <div className="content-wrapper">
        <section className="content">
          <div className="row">
            <div className="col-md-2">
              <div className="box box-widget">
                <div className="box-body box-profile"><Img src={LogoImg} alt="Logo"/> <strong>AAR Framework</strong></div>
                <div className="box-footer no-padding">
                  <ul className="nav nav-stacked">
                    <li><Link to="/">Modules</Link></li>
                    <li><Link to="/roles">Roles</Link></li>
                    <li><Link to="/permissions">Permissions</Link></li>
                    <li><Link to="/users">Users</Link></li>
                    <li><a>Logout</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-10">
              {React.Children.toArray(props.children)}
            </div>
          </div>
        </section>
      </div>
    </AppWrapper>
  );
}

App.propTypes = {
  children: React.PropTypes.node,
};

export default withProgressBar(App);

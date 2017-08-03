/*
 *
 * LoginPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';

import Helmet from 'react-helmet';
import Img from 'components/Img'
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import loginPageSelector from '../selectors';
import messages from '../messages';
import * as actions from '../actions';

import LogoImg from 'assets/img/aar.png';

import FormLogin from './login'

export class LoginPage extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      errorMessage: ''
    }
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.onLoginSuccess) {
      if (this.props.onLoginSuccess.success_message) {
        this.props.onRedirectToHome();
        localStorage.jwt = this.props.onLoginSuccess.jwt;
      } else {
        this.setState({ errorMessage: 'The username or password you entered is incorrect.' })
      }
    }
  }

  onSubmit(myForm) {
    this.props.onLogin({
      username: myForm.userName,
      password: myForm.password
    });
  }

  render() {
    return (
      <div>
        <Helmet
          title="Login Page"
          meta={[
            { name: 'description', content: 'Description of LoginPage' },
          ]}
        />
        <div className="login-page">
          <div className="login-box">
            <div className="login-logo"><Img src={LogoImg} alt="Logo" /> AAR Framework</div>
            <FormLogin onSubmit={this.onSubmit} />
            {(this.state.errorMessage) && (<div className="alert alert-danger mt-10" style={{ marginTop: "10px" }}>{this.state.errorMessage}</div>)}
          </div>
        </div>
      </div>
    );
  }
}

LoginPage.propTypes = {
  onLogin: PropTypes.func,
  onLoginSuccess: PropTypes.object,
  onRedirectToHome: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  onLoginSuccess: loginPageSelector('loginSuccess'),
});

function mapDispatchToProps(dispatch) {
  return {
    onLogin: (val) => dispatch(actions.login(val)),
    onRedirectToHome: () => {
      dispatch(replace('/'));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);

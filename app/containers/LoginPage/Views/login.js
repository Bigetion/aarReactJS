import React, { PropTypes } from 'react';
import Formsy from 'formsy-react';
import { Validations } from 'validations';
import { VText, VPassword, VTextArea } from 'components/ValidateInput';
import $ from 'jquery';

const fieldValidations = [{
  name: 'userName',
  label: 'Username',
  validator: [Validations.Type.required]
}, {
  name: 'password',
  label: 'Password',
  validator: [Validations.Type.required]
}];

class FormLogin extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    mixins: [Formsy.Mixin];
    this.state = {
      validationErrors: {},
      touched: []
    }

    this.setNewState = this.setNewState.bind(this);
    this.handleSubmitClicked = this.handleSubmitClicked.bind(this);
    this.handleCancelClicked = this.handleCancelClicked.bind(this);
  }

  setNewState(newState) {
    this.setState(newState);
  }

  handleSubmitClicked() {
    let newState = Validations.UpdateState(this.state, {});
    newState.validationErrors = Validations.RunValidateAll(this.state, fieldValidations);
    this.setState(newState);
    if (Object.keys(this.state.validationErrors).length == 0) {
      delete newState.touched;
      delete newState.validationErrors;
      this.props.onSubmit(newState);
    }
  }

  handleCancelClicked() {
    this.props.onCancel();
  }

  render() {
    return (
      <div>
        <Formsy.Form onSubmit={this.handleSubmitClicked}>
          <div className="" style={{ position: "relative" }}>
            <div className="login-box-body">
              <p className="login-box-msg">Sign in to start your session</p>
              <div className="form-group">
                <VText
                  name="userName"
                  placeholder="Username"
                  inputState={this.state}
                  fieldValidations={fieldValidations}
                  onChangeState={this.setNewState}
                  style={{ fontSize: "20px" }}
                  className="input-lg"
                />
              </div>
              <div className="form-group">
                <VPassword
                  name="password"
                  placeholder="Password"
                  inputState={this.state}
                  fieldValidations={fieldValidations}
                  onChangeState={this.setNewState}
                  style={{ fontSize: "20px" }}
                  className="input-lg"
                />
              </div>
              <div className="row">
                <div className="col-xs-4">
                  <button type="submit" className="btn btn-primary btn-block btn-flat">Sign In</button>
                </div>
              </div>
            </div>
          </div>
        </Formsy.Form>
      </div>
    );
  }
}

FormLogin.propTypes = {
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
};

export default FormLogin
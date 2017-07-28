/**
*
* VTextArea
*
*/
import React from 'react';
import PropTypes from 'prop-types';
import { Validations } from 'validations';


class VTextArea extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      touched: false
    }
    this.handleChange = this.handleChange.bind(this);
  }

  getError() {
    if (this.props.inputState.touched.indexOf(this.props.name) > -1) return this.props.inputState.validationErrors[this.props.name] || "";
    else return "";
  }

  handleChange(event) {
    this.setState({ touched: true })
    let newState = Validations.UpdateState(this.props.inputState, {
      [this.props.name]: { $set: event.target.value }
    });
    newState.validationErrors = Validations.RunValidate(this.props.name, newState, this.props.fieldValidations);
    this.props.onChangeState(newState);
  }

  render() {
    let errorText = (<div></div>);
    let defaultClass = "form-control"
    if (this.getError()) {
      errorText = (
        <span className="validation-error">{this.getError()}</span>
      )
      defaultClass = "form-control invalid";
    }
    return (
      <div className="form-field text-field">
        <textarea className={defaultClass} placeholder={this.props.placeholder} value={this.props.inputState[this.props.name] || ''} onChange={this.handleChange} onBlur={this.handleChange}/>
        {errorText}
      </div>
    );
  }
}

VTextArea.propTypes = {
  inputState: React.PropTypes.object.isRequired,
  onChangeState: React.PropTypes.func.isRequired,
  name: React.PropTypes.string.isRequired,
  fieldValidations: React.PropTypes.array.isRequired,
};

export default VTextArea;

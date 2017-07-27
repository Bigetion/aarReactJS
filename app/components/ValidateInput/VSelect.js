/**
*
* VSelect
*
*/
import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { Validations } from 'validations';

class VSelect extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      value: null
    }
    this.handleChange = this.handleChange.bind(this);
  }

  getError() {
    if (this.props.inputState.touched.indexOf(this.props.name) > -1) return this.props.inputState.validationErrors[this.props.name] || "";
    else return "";
  }

  componentDidMount(){
    this.setState({
      value: this.props.value || undefined
    });
  }

  handleChange(value) {
    this.setState({ value });
    let newState = Validations.UpdateState(this.props.inputState, {
      [this.props.name]: { $set: value }
    });
    newState.validationErrors = Validations.RunValidate(this.props.name, newState, this.props.fieldValidations);
    this.props.onChangeState(newState);
  }

  render() {
    let errorText = (<div></div>);
    let defaultClass = ""
    if (this.getError()) {
      errorText = (
        <span className="validation-error">{this.getError()}</span>
      )
      defaultClass = "invalid";
    }
    return (
      <div className="form-field text-field">
        <Select
          className={defaultClass}
          name={this.props.name}
          placeholder={this.props.placeholder}
          options={this.props.options}
          value={this.state.value}
          labelKey={this.props.labelKey}
          valueKey={this.props.valueKey}
          onChange={this.handleChange} />
        {errorText}
      </div>
    );
  }
}

VSelect.propTypes = {
  name: React.PropTypes.string.isRequired,
  inputState: React.PropTypes.object.isRequired,
  onChangeState: React.PropTypes.func.isRequired,
  fieldValidations: React.PropTypes.array.isRequired,
};

export default VSelect;

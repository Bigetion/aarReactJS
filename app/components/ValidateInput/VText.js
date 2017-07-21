/**
*
* VText
*
*/
import React from 'react';
import PropTypes from 'prop-types';


class VText extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
  }

  render() {
    let errorText = (<div></div>);
    let defaultClass = "form-control"
    if (this.props.errorText) {
      errorText = (
        <span className="validation-error">{this.props.errorText}</span>
      )
      defaultClass = "form-control invalid";
    }
    return (
      <div className="form-field text-field">
        <input type="text" className={defaultClass} placeholder={this.props.placeholder} value={this.props.value} onChange={this.props.onFieldChanged} />
        {errorText}
      </div>
    );
  }
}

VText.propTypes = {
  
};

export default VText;

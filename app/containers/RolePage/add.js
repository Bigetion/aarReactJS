import React, { PropTypes } from 'react';
import Formsy from 'formsy-react';
import { Validations } from 'validations';
import { VText, VTextArea } from 'components/ValidateInput';
import $ from 'jquery';

const fieldValidations = [{
  name: 'roleName',
  label: 'Role Name',
  validator: [Validations.Type.required]
}, {
  name: 'description',
  label: 'Description',
  validator: [Validations.Type.required]
}];

class FormAdd extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    mixins: [Formsy.Mixin];
    this.state = {
      validationErrors: {},
      touched: []
    }

    this.getError = this.getError.bind(this);
    this.handleFieldChanged = this.handleFieldChanged.bind(this);
    this.handleSubmitClicked = this.handleSubmitClicked.bind(this);
    this.handleCancelClicked = this.handleCancelClicked.bind(this);
  }

  getError(field) {
    if (this.state.touched.indexOf(field) > -1) return this.state.validationErrors[field] || "";
    else return "";
  }

  handleFieldChanged(field) {
    return (e) => {
      let newState = Validations.UpdateState(this.state, {
        [field]: { $set: e.target.value }
      });
      newState.validationErrors = Validations.RunValidate(field, newState, fieldValidations);
      this.setState(newState);
    };
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
        <div className="box box-widget">
          <div className="box-header with-border">
            <h3 className="box-title">Add Role</h3>
          </div>
          <Formsy.Form onSubmit={this.handleSubmitClicked}>
            <div className="box-body">
              <div className="form-group">
                <label>Role Name</label>
                <VText name="roleName" placeholder="Role Name" value={this.state.roleName || ''}
                  onFieldChanged={this.handleFieldChanged("roleName")} errorText={this.getError("roleName")} />
              </div>
              <div className="form-group">
                <label>Description</label>
                <VTextArea name="description" placeholder="Description" value={this.state.description || ''}
                  onFieldChanged={this.handleFieldChanged("description")} errorText={this.getError("description")} />
              </div>
            </div>
            <div className="box-footer">
              <button type="submit" className="btn btn-primary" style={{ marginRight: '5px' }}>Submit</button>
              <button type="button" className="btn btn-default" onClick={this.handleCancelClicked}>Cancel</button>
            </div>
          </Formsy.Form>
        </div>
      </div>
    );
  }
}

FormAdd.propTypes = {
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
};

export default FormAdd
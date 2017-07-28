import React, { PropTypes } from 'react';
import Formsy from 'formsy-react';
import { Validations } from 'validations';
import { VSelect, VText, VTextArea } from 'components/ValidateInput';
import $ from 'jquery';

const fieldValidations = [{
  name: 'userName',
  label: 'User Name',
  validator: [Validations.Type.required]
}, {
  name: 'role',
  label: 'Role Name',
  validator: [Validations.Type.required]
}];

class FormEdit extends React.Component { // eslint-disable-line react/prefer-stateless-function
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

  componentWillMount() {
    let newState = Object.assign(this.props.state, this.state);
    this.setState(newState);
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
        <div className="box box-widget">
          <div className="box-header with-border">
            <h3 className="box-title">Edit User</h3>
          </div>
          <Formsy.Form onSubmit={this.handleSubmitClicked}>
            <div className="box-body">
              <div className="form-group">
                <label>User Name</label>
                <VText
                  name="userName"
                  placeholder="User Name"
                  inputState={this.state}
                  fieldValidations={fieldValidations}
                  onChangeState={this.setNewState}
                />
              </div>
              <div className="form-group">
                <label>Role Name</label>
                <VSelect
                  name="role"
                  placeholder="Role Name"
                  labelKey="role_name"
                  defaultValue={this.state.role}
                  options={[{ id_role: '1', role_name: 'Administrator' }, { id_role: '2', role_name: 'Guest' }]}
                  inputState={this.state}
                  fieldValidations={fieldValidations}
                  onChangeState={this.setNewState}
                />
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

FormEdit.propTypes = {
  state: PropTypes.object,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
};

export default FormEdit
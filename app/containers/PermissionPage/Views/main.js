/*
 *
 * PermissionPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import permissionPageSelector from '../selectors';
import messages from '../messages';
import * as actions from '../actions';

import { Checkbox } from 'antd';

export class PermissionPage extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      permissionList: [],
      roleList: [],
      controllerList: [],
      functionList: [],
      permissionsRole: {}
    }

    this.permissionsRole = {};

    this.renderRoleTd = this.renderRoleTd.bind(this);
  }

  componentWillMount() {
    this.props.onGetPermissions({});
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.onGetPermissionsSuccess.data) {
      let roleList = this.props.onGetPermissionsSuccess.data;
      let controllerList = this.props.onGetPermissionsSuccess.controller;
      let functionList = this.props.onGetPermissionsSuccess.function;

      this.setState({
        roleList: roleList,
        controllerList: controllerList,
        functionList: functionList
      });
      this.permissionsRole = {};
      roleList.forEach((item) => {
        this.permissionsRole[item.id_role] = {};
        let permissionArray = item.permission.split('---');
        for (let project in controllerList) {
          controllerList[project].forEach((controller, index) => {
            functionList[controller].forEach((funcName) => {
              let checked = false;
              if (permissionArray.indexOf(project + '.' + controller + '.' + funcName) != -1) {
                checked = true;
              }
              this.permissionsRole[item.id_role][project + '.' + controller + '.' + funcName] = checked;
            });
          });
        }
      });
    }
  }

  renderRoleTh(roleList) {
    let columns = [];
    roleList.forEach((item, index) => {
      columns.push((<th key={index}>{item.role_name}</th>))
    });
    return columns;
  }

  onChangeChecked(key1, key2, value) {
    this.permissionsRole[key1][key2] = value;

    let newPermissionsRole = {};
    for (let idRole in this.permissionsRole) {
      newPermissionsRole[idRole] = [];
      for (let permissionPath in this.permissionsRole[idRole]) {
        if (this.permissionsRole[idRole][permissionPath]) {
          newPermissionsRole[idRole].push(permissionPath)
        }
      }
      newPermissionsRole[idRole] = newPermissionsRole[idRole].join("---");
    }
    this.props.onUpdatePermissions({
      permissions: newPermissionsRole
    })
  }

  renderRoleTd(project, controller, funcName, roleList) {
    let columns = [];
    roleList.forEach((item, index) => {
      columns.push((
        <td key={index}>
          {item.id_role == 1 && <Checkbox disabled={item.id_role == 1} checked={item.id_role == 1}></Checkbox>}
          {item.id_role != 1 && <Checkbox defaultChecked={this.permissionsRole[item.id_role][project + '.' + controller + '.' + funcName]} onChange={(e) => { this.onChangeChecked(item.id_role, project + '.' + controller + '.' + funcName, e.target.checked) }}></Checkbox>}
        </td>))
    });
    return columns;
  }

  renderFunctionRow(project, controller, functionList, roleList) {
    let functionComponent = [];
    functionList[controller].forEach((item, index) => {
      functionComponent.push((
        <tr key={index}>
          <td>{project}/{controller}/{item}</td>
          {this.renderRoleTd(project, controller, item, roleList)}
        </tr>
      ))
    });
    return functionComponent;
  }

  renderControllerRow(controllerList, functionList, roleList) {
    let controllerComponent = [];
    for (let project in controllerList) {
      controllerList[project].forEach((controller, index) => {
        controllerComponent.push((
          <tbody key={project + controller + index}>
            <tr>
              <td colSpan={this.state.roleList.length + 1}>
                From Module <b>{project}</b> and Controller <b>{controller}</b>
              </td>
            </tr>
            {this.renderFunctionRow(project, controller, functionList, roleList)}
          </tbody>
        ))
      })
    }
    return controllerComponent;
  }

  render() {
    const meta = (
      <Helmet
        title="Permission Page"
        meta={[
          { name: 'description', content: 'Description of Permission Page' },
        ]}
      />
    );

    const pageHeader = (
      <div>
        <div className="col-md-12">
          <h1 className="page-header">Permissions</h1>
        </div>
        <div className="col-md-12">
          <table className="table table-striped panel">
            <thead>
              <tr>
                <th>Permission Access</th>
                {this.renderRoleTh(this.state.roleList)}
              </tr>
            </thead>
            {this.renderControllerRow(this.state.controllerList, this.state.functionList, this.state.roleList)}
          </table>
        </div>
      </div>
    )
    return (
      <div>
        {meta}
        {pageHeader}
      </div>
    );
  }
}

PermissionPage.propTypes = {
  onGetPermissions: PropTypes.func.isRequired,
  onGetPermissionsSuccess: PropTypes.object,
  onUpdatePermissions: PropTypes.func.isRequired,
  onUpdatePermissionsSuccess: PropTypes.object
};

const mapStateToProps = createStructuredSelector({
  onGetPermissionsSuccess: permissionPageSelector('getPermissionsSuccess'),
  onUpdatePermissionsSuccess: permissionPageSelector('updatePermissionsSuccess'),
});

function mapDispatchToProps(dispatch) {
  return {
    onGetPermissions: (val) => dispatch(actions.getPermissions(val)),
    onUpdatePermissions: (val) => dispatch(actions.updatePermissions(val)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PermissionPage);

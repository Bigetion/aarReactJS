/*
 *
 * RolePage
 *
 */

import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import * as actions from './actions';
import rolePageSelector from './selectors';
import messages from './messages';
import ReactDataGrid from 'react-data-grid';

import { confirmDialog } from 'utils/confirmDialog';

import FormAdd from './add';
import FormEdit from './edit';

export class RolePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);

    this.state = {
      isAdd: false,
      isEdit: false,
      roleListSelected: []
    }

    this.roleListRowSelected = {};

    this.rowGetterRoleList = this.rowGetterRoleList.bind(this);
    this.getMinHeight = this.getMinHeight.bind(this);

    this.onRowClickRoleList = this.onRowClickRoleList.bind(this);
    this.onClickIsAdd = this.onClickIsAdd.bind(this);
    this.onClickIsEdit = this.onClickIsEdit.bind(this);
    this.onClickDelete = this.onClickDelete.bind(this);

    this.onKeyDown = this.onKeyDown.bind(this);

    this.onSubmit = this.onSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);

    this.roleList = {
      data: []
    };

    const actionTemplate = function () {
      return (
        <div>
          <button className="btn btn-primary btn-xs" style={{ marginRight: '5px' }} onClick={() => { console.log(this) }}><i className="fa fa-edit"></i></button>
          <button className="btn btn-danger btn-xs"><i className="fa fa-trash"></i></button>
        </div>
      )
    }

    this.columns = [{
      key: 'role_name',
      name: 'Role Name',
      width: 200,
      events: {
        onKeyDown: this.onKeyDown
      }
    }, {
      key: 'description',
      name: 'Description',
      events: {
        onKeyDown: this.onKeyDown
      }
    }];
  }

  onKeyDown = function (ev) {
    switch (ev.key) {
      case 'ArrowUp':
        if (this.state.roleListSelected[0] > 0) {
          this.setState({ roleListSelected: [this.state.roleListSelected[0] - 1] });
          this.roleListRowSelected = this.roleList.data[this.state.roleListSelected[0] - 1];
        };
        break;
      case 'ArrowDown':
        if (this.state.roleListSelected[0] < this.roleList.data.length - 1) {
          this.setState({ roleListSelected: [this.state.roleListSelected[0] + 1] });
          this.roleListRowSelected = this.roleList.data[this.state.roleListSelected[0] + 1];
        }
        break;
      case 'Delete':
        if (this.roleListRowSelected.id_role == 1 || this.roleListRowSelected.id_role == 2) { } else {
          this.onClickDelete();
        }

        break;
      default: this.roleListRowSelected = this.roleList.data[this.state.roleListSelected[0]];
    }
  }
  componentDidMount() {
    this.props.onSearch({});
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.onCreateSuccess) {
      this.props.onSearch({});
    }
    if (this.props.onUpdateSuccess) {
      this.props.onSearch({});
    }
    if (this.props.onDeleteSuccess) {
      this.props.onSearch({});
      this.roleListRowSelected = {};
      // if (this.state.roleListSelected[0] == prevState.roleListSelected[0]) {
      //   const deletedIndex = this.state.roleListSelected[0];
      //   let newIndex = deletedIndex - 1;
      //   this.roleListRowSelected = this.roleList.data[newIndex];
      //   this.setState({ roleListSelected: [newIndex] });
      // }
    }
  }

  rowGetterRoleList(i) {
    return this.roleList.data[i];
  }

  getMinHeight() {
    let maxCountRow = 10;
    if (this.roleList.data) {
      if (maxCountRow > this.roleList.data.length) {
        maxCountRow = this.roleList.data.length;
      }
    }
    return ((maxCountRow + 1) * 35) + 2;
  }

  onRowClickRoleList(rowIdx, row) {
    this.roleListRowSelected = row;
    this.setState({ roleListSelected: [rowIdx] })
  }

  onClickIsAdd(condition) {
    this.setState({ isAdd: condition });
  }

  onClickIsEdit(condition) {
    this.setState({ isEdit: condition });
  }

  onClickDelete() {
    confirmDialog('Do you want to delete this record?', {
      title: 'Delete Confirmation'
    }).then(() => {
      this.props.onDelete({ idRole: this.roleListRowSelected.id_role });
    }, () => { });
  }

  onSubmit(myForm) {
    if (this.state.isAdd) {
      this.props.onCreate(myForm);
      this.setState({ isAdd: false });
    }

    if (this.state.isEdit) {
      this.roleListRowSelected.role_name = myForm.roleName;
      this.roleListRowSelected.description = myForm.description;
      this.props.onUpdate({
        idRole: this.roleListRowSelected.id_role,
        roleName: myForm.roleName,
        description: myForm.description
      });
      this.setState({ isEdit: false });
    }
  }

  onCancel() {
    if (this.state.isAdd) this.onClickIsAdd(false);
    if (this.state.isEdit) this.onClickIsEdit(false);
  }

  render() {
    if (this.props.onSearchSuccess) {
      this.roleList = this.props.onSearchSuccess;
    }

    const meta = (
      <Helmet
        title="Role Page"
        meta={[
          { name: 'description', content: 'Description of RolePage' },
        ]}
      />
    );

    const pageHeader = (
      <div className="row">
        <div className="col-md-12">
          <h1 className="page-header ng-scope">Roles</h1>
        </div>
      </div>
    )

    let addTemplate = (<div></div>);
    if (this.state.isAdd) {
      addTemplate = (
        <FormAdd onSubmit={this.onSubmit} onCancel={this.onCancel} />
      );
    }

    let editTemplate = (<div></div>);
    if (this.state.isEdit) {
      const editState = {
        roleName: this.roleListRowSelected.role_name,
        description: this.roleListRowSelected.description
      }
      editTemplate = (
        <FormEdit state={editState} onSubmit={this.onSubmit} onCancel={this.onCancel} />
      );
    }

    const table = (
      <ReactDataGrid
        ref="rDataGrid"
        columns={this.columns}
        rowGetter={this.rowGetterRoleList}
        rowsCount={this.roleList.data.length || 0}
        onRowClick={this.onRowClickRoleList}
        minHeight={this.getMinHeight()}
        rowSelection={{
          showCheckbox: false,
          enableShiftSelect: true,
          selectBy: {
            indexes: this.state.roleListSelected
          }
        }}
      />
    )


    const actionButton = (
      <div>
        <button className="btn btn-primary" style={{ marginTop: '5px', marginRight: '5px' }} onClick={() => { this.onClickIsAdd(true) }}>Add</button>
        <button disabled={Object.keys(this.roleListRowSelected || {}).length == 0} className="btn btn-primary" style={{ marginTop: '5px', marginRight: '5px' }} onClick={() => { this.onClickIsEdit(true) }}>Edit</button>
        <button disabled={Object.keys(this.roleListRowSelected || {}).length == 0 || (this.roleListRowSelected.id_role == 1 || this.roleListRowSelected.id_role == 2)} className="btn btn-danger" style={{ marginTop: '5px', marginRight: '5px' }} onClick={this.onClickDelete}>Delete</button>
      </div>
    )

    let renderTemplate = (<div></div>);

    if (this.state.isAdd) {
      renderTemplate = (
        <div>
          {addTemplate}
        </div>
      )
    } else if (this.state.isEdit) {
      renderTemplate = (
        <div>
          {editTemplate}
        </div>
      )
    } else {
      renderTemplate = (
        <div>
          {table}
          {actionButton}
        </div>
      )
    }

    return (
      <div>
        {meta}
        {pageHeader}
        {renderTemplate}
      </div>
    );
  }
}

RolePage.propTypes = {
  onSearch: PropTypes.func,
  onSearchSuccess: PropTypes.object,
  onCreate: PropTypes.func,
  onCreateSuccess: PropTypes.object,
  onUpdate: PropTypes.func,
  onUpdateSuccess: PropTypes.object,
  onDelete: PropTypes.func,
  onDeleteSuccess: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  onSearchSuccess: rolePageSelector('searchSuccess'),
  onCreateSuccess: rolePageSelector('createSuccess'),
  onUpdateSuccess: rolePageSelector('updateSuccess'),
  onDeleteSuccess: rolePageSelector('deleteSuccess'),
});

function mapDispatchToProps(dispatch) {
  return {
    onSearch: (val) => dispatch(actions.search(val)),
    onCreate: (val) => dispatch(actions.create(val)),
    onUpdate: (val) => dispatch(actions.update(val)),
    onDelete: (val) => dispatch(actions.deletes(val)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RolePage);

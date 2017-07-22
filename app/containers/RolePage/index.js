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

import VirtualizedTable from 'components/VirtualizedTable'
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

    this.onClickIsAdd = this.onClickIsAdd.bind(this);
    this.onClickIsEdit = this.onClickIsEdit.bind(this);
    this.onClickDelete = this.onClickDelete.bind(this);

    this.onSubmit = this.onSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);

    this.roleList = {
      data: []
    };

    const actionTemplate = ({ rowData, rowIndex }) => {
      return (
        <div>
          <button className="btn btn-primary btn-xs" style={{ marginRight: '5px' }} onClick={() => { this.onClickIsEdit(true, rowData) }}><i className="fa fa-edit"></i></button>
          {(rowData.id_role != 1 && rowData.id_role != 2) && <button className="btn btn-danger btn-xs" onClick={() => { this.onClickDelete(rowData) }}><i className="fa fa-trash"></i></button>}
        </div>
      )
    }

    this.columns = [{
      header: 'Role Name',
      accessor: 'role_name',
      width: 200
    }, {
      header: 'Description',
      accessor: 'description'
    }, {
      header: 'Action',
      accessor: 'action',
      width: 100,
      onRender: actionTemplate
    }]
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
    }
  }

  onClickIsAdd(condition) {
    this.setState({ isAdd: condition });
  }

  onClickIsEdit(condition, row) {
    this.roleListRowSelected = row;
    this.setState({ isEdit: condition });
  }

  onClickDelete(rowData) {
    confirmDialog('Do you want to delete this record?', {
      title: 'Delete Confirmation'
    }).then(() => {
      this.props.onDelete({ idRole: rowData.id_role });
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
      <div className="box box-widget">
        <VirtualizedTable data={this.roleList.data} columns={this.columns} />
      </div>
    )


    const actionButton = (
      <div>
        <button className="btn btn-primary" onClick={() => { this.onClickIsAdd(true) }}>Add</button>
      </div>
    )

    let renderTemplate = (<div></div>);

    if (this.state.isAdd) {
      renderTemplate = (<div>{addTemplate}</div>)
    } else if (this.state.isEdit) {
      renderTemplate = (<div>{editTemplate}</div>)
    } else {
      renderTemplate = (<div>{table} {actionButton}</div>)
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

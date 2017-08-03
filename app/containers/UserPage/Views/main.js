/*
 *
 * UserPage
 *
 */

import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import * as actions from '../actions';
import userPageSelector from '../selectors';
import messages from '../messages';
import ReactDataGrid from 'react-data-grid';

import DataGrid from 'components/DataGrid';
import { confirmDialog } from 'utils/confirmDialog';

import FormAdd from './add';
import FormEdit from './edit';

export class UserPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);

    this.state = {
      isAdd: false,
      isEdit: false,
      userListSelected: []
    }

    this.userListRowSelected = {};

    this.onClickIsAdd = this.onClickIsAdd.bind(this);
    this.onClickIsEdit = this.onClickIsEdit.bind(this);
    this.onClickDelete = this.onClickDelete.bind(this);
    this.onClickMultipleDelete = this.onClickMultipleDelete.bind(this);

    this.onSubmit = this.onSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);

    this.onSelected = this.onSelected.bind(this);

    this.userList = {
      data: []
    };

    const actionTemplate = ({ rowData, rowIndex }) => {
      return (
        <div>
          <button className="btn btn-primary btn-xs" style={{ marginRight: '5px' }} onClick={() => { this.onClickIsEdit(true, rowData) }}><i className="fa fa-edit"></i></button>
          {(rowData.id_user != 1 && rowData.id_user != 2) && <button className="btn btn-danger btn-xs" onClick={() => { this.onClickDelete(rowData) }}><i className="fa fa-trash"></i></button>}
        </div>
      )
    }

    this.columns = [{
      key: 'username',
      name: 'User Name',
      sortable: true,
      width: 200
    }, {
      key: 'role_name',
      name: 'Role Name',
      sortable: true
    }, {
      key: 'action',
      name: 'Action',
      width: 100,
      formatter: (row) => {
        return (
          <div>
            <button className="btn btn-primary btn-xs" onClick={() => { this.onClickIsEdit(true, row.dependentValues) }} style={{ marginRight: "5px" }}><i className="fa fa-edit"></i></button>
            {(row.dependentValues.id_user != 1 && row.dependentValues.id_user != 2) && (<button className="btn btn-danger btn-xs" onClick={() => { this.onClickDelete(row.dependentValues) }}><i className="fa fa-trash"></i></button>)}
          </div>
        )
      },
      getRowMetaData: (row) => row
    }];
  }

  componentWillMount() {
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
    this.userListRowSelected = row;
    this.setState({ isEdit: condition });
  }

  onClickDelete(rowData) {
    confirmDialog('Do you want to delete this record?', {
      title: 'Delete Confirmation'
    }).then(() => {
      this.props.onDelete({ idUser: rowData.id_user });
    }, () => { });
  }

  onClickMultipleDelete() {
    confirmDialog('Do you want to delete selected record?', {
      title: 'Delete Confirmation'
    }).then(() => {
      this.props.onDelete({ idUser: this.state.userListSelected.join(",") });
    }, () => { });
  }

  onSelected(selectedIndex) {
    this.setState({ userListSelected: selectedIndex });
  }

  onSubmit(myForm) {
    if (this.state.isAdd) {
      this.props.onCreate(myForm);
      this.setState({ isAdd: false });
    }

    if (this.state.isEdit) {
      this.props.onUpdate({
        idUser: this.userListRowSelected.id_user,
        userName: myForm.userName,
        role: myForm.role
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
      this.userList = this.props.onSearchSuccess;
    }

    const meta = (
      <Helmet
        title="User Page"
        meta={[
          { name: 'description', content: 'Description of UserPage' },
        ]}
      />
    );

    const pageHeader = (
      <div className="row">
        <div className="col-md-12">
          <h1 className="page-header ng-scope">Users</h1>
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
        idUser: this.userListRowSelected.id_user,
        userName: this.userListRowSelected.username,
        role: {
          id_role: this.userListRowSelected.id_role,
          role_name: this.userListRowSelected.role_name
        }
      }
      editTemplate = (
        <FormEdit state={editState} onSubmit={this.onSubmit} onCancel={this.onCancel} />
      );
    }

    const table = (
      <DataGrid columns={this.columns} data={this.userList.data} selectedKey="id_user" onSelected={this.onSelected} />
    )

    const actionButton = (
      <div>
        <button className="btn btn-primary" onClick={() => { this.onClickIsAdd(true) }} style={{ marginRight: "5px" }}>Add</button>
        {(this.state.userListSelected.length > 0 && (this.state.userListSelected.indexOf("1") == -1 && this.state.userListSelected.indexOf("2") == -1)) && (<button className="btn btn-danger" onClick={() => { this.onClickMultipleDelete() }}>Delete</button>)}
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

UserPage.propTypes = {
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
  onSearchSuccess: userPageSelector('searchSuccess'),
  onCreateSuccess: userPageSelector('createSuccess'),
  onUpdateSuccess: userPageSelector('updateSuccess'),
  onDeleteSuccess: userPageSelector('deleteSuccess'),
});

function mapDispatchToProps(dispatch) {
  return {
    onSearch: (val) => dispatch(actions.search(val)),
    onCreate: (val) => dispatch(actions.create(val)),
    onUpdate: (val) => dispatch(actions.update(val)),
    onDelete: (val) => dispatch(actions.deletes(val)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);

/**
*
* DataGrid
*
*/

import React from 'react';
import ReactDataGrid from 'react-data-grid';
import sorty from 'sorty';

class DataGrid extends React.PureComponent {
  constructor(props) {
    super(props);
    this.getMinHeight = this.getMinHeight.bind(this);
    this.handleGridSort = this.handleGridSort.bind(this);

    this.onRowsSelected = this.onRowsSelected.bind(this);
    this.onRowsDeselected = this.onRowsDeselected.bind(this);

    this.state = {
      originalRows: [],
      rows: [],
      sortBy: {},
      selectedIndexes: []
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ rows: nextProps.data.slice(0), originalRows: nextProps.data });
  }

  componentDidMount() {
    this.setState({ rows: this.props.data.slice(0), originalRows: this.props.data });
  }

  handleGridSort(sortColumn, sortDirection) {
    const sortInfo = [{
      name: sortColumn,
      dir: sortDirection.toLowerCase()
    }];
    if (sortDirection != 'NONE') {
      const newRows = sorty(sortInfo, this.state.rows);
      this.setState({ rows: newRows, sortBy: sortInfo });
    } else {
      this.setState({ rows: this.state.originalRows.slice(0), sortBy: sortInfo });
    }
  }

  getMinHeight() {
    let maxCountRow = 10;
    if (this.state.rows) {
      if (maxCountRow > this.state.rows.length) {
        maxCountRow = this.state.rows.length;
      }
    }
    return ((maxCountRow + 1) * 35) + 50;
  }

  onRowsSelected(rows) {
    const selectedIndexes = this.state.selectedIndexes.concat(rows.map(r => r.row[this.props.selectedKey]));
    if (this.props.onSelected) this.props.onSelected(selectedIndexes);
    this.setState({ selectedIndexes: selectedIndexes });
  }

  onRowsDeselected(rows) {
    let rowIndexes = rows.map(r => r.row[this.props.selectedKey]);
    const selectedIndexes = this.state.selectedIndexes.filter(i => rowIndexes.indexOf(i) === -1);
    if (this.props.onSelected) this.props.onSelected(selectedIndexes);
    this.setState({ selectedIndexes: selectedIndexes });
  }

  render() {
    let showCheckbox = false;
    let selectBy = {
      indexes: []
    }
    if (this.props.selectedKey) {
      showCheckbox = true;
      selectBy = {
        keys: {
          rowKey: this.props.selectedKey,
          values: this.state.selectedIndexes
        }
      }
    }
    return (
      <div style={{ marginBottom: "10px" }}>
        <ReactDataGrid
          onGridSort={this.handleGridSort}
          columns={this.props.columns}
          rowGetter={(i) => { return this.state.rows[i]; }}
          rowsCount={this.state.rows.length || 0}
          minHeight={this.getMinHeight()}
          rowSelection={{
            showCheckbox: showCheckbox,
            enableShiftSelect: true,
            onRowsSelected: this.onRowsSelected,
            onRowsDeselected: this.onRowsDeselected,
            selectBy: selectBy
          }}
        />
      </div>
    );
  }
}

DataGrid.propTypes = {
  columns: React.PropTypes.array.isRequired,
  data: React.PropTypes.array.isRequired,
  onSelected: React.PropTypes.func,
  selectedKey: React.PropTypes.string
};

export default DataGrid;

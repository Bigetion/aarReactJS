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

    this.state = {
      originalRows: [],
      rows: [],
      sortBy: {}
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

  render() {
    return (
      <div style={{ marginBottom: "10px" }}>
        <ReactDataGrid
          onGridSort={this.handleGridSort}
          columns={this.props.columns}
          rowGetter={(i) => { return this.state.rows[i]; }}
          rowsCount={this.state.rows.length || 0}
          minHeight={this.getMinHeight()}
        />
      </div>
    );
  }
}

DataGrid.propTypes = {
  columns: React.PropTypes.array.isRequired,
  data: React.PropTypes.array.isRequired
};

export default DataGrid;

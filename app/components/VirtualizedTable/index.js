/**
*
* VirtualizedTable
*
*/

import React, { PropTypes } from 'react';
import { AutoSizer, Column, Table } from 'react-virtualized';

import '!!style-loader!css-loader!./styles.css';
// import styled from 'styled-components';


class VirtualizedTable extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.renderColumns = this.renderColumns.bind(this);
  }

  noRowsRenderer() {
    return (
      <div className={'noRows'}>
        No rows
      </div>
    );
  }

  renderColumns() {
    let columns = [];
    let i = 0;
    let colLength = this.props.columns.length;
    this.props.columns.forEach(function (item) {
      let subColumns = (
        <Column
          key={i}
          label={item.header}
          dataKey={item.accessor}
          width={item.width || 200}
          cellRenderer={item.onRender}
        />
      )
      if (!item.width) {
        subColumns = (
          <Column
            key={i}
            label={item.header}
            dataKey={item.accessor}
            width={200}
            flexGrow={1}
            cellRenderer={item.onRender}
          />
        )
      }
      columns.push(
        subColumns
      )
      i++;
    });
    return columns;
  }
  render() {
    return (
      <AutoSizer disableHeight>
        {({ width }) =>
          <Table
            noRowsRenderer={this.noRowsRenderer}
            width={width}
            height={350}
            headerHeight={20}
            rowHeight={30}
            rowCount={this.props.data.length}
            rowGetter={({ index }) => this.props.data[index]}
          >
            {this.renderColumns()}
          </Table>
        }
      </AutoSizer>
    );
  }
}

VirtualizedTable.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired
};

export default VirtualizedTable;

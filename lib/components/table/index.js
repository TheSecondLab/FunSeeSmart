import { Component } from 'react';
import { object, array } from 'prop-types';
import { tableBuilder } from '../../util/generator';
import { autobind } from '../../util/decorators';

@autobind()
class Table extends Component {
  handleTableClick(primaryKey, record, fnName) {
    const _targetFn = this.props[fnName];
    if (typeof _targetFn !== 'function') throw new Error(`CRUD has no function: ${fnName}`);
    // _targetFn(primaryKey, record);
    _targetFn(record, primaryKey);
  }

  render() {
    const { schema, dataSource } = this.props;
    return (
      tableBuilder(schema, dataSource, this.handleTableClick)
    );
  }
}


Table.propTypes = {
  schema: object,
  dataSource: array
};

Table.defaultProps = {
  schema: {},
  dataSource: []
};


export default Table;

import React from 'react';
import { object, string, func, array } from 'prop-types';
import EditForm from '../editForm';
import Table from '../table';
import Pagination from '../pagination';
import SearchForm from '../searchForm';


const CRUD = (props) => {
  const {
    querySchema, tableSchema, editSchema,
    mode, smartQuery, moduleData: {
      value, totalCount, pageSize, pageNum
    },
    smartPageNumChange, smartPageSizeChange
  } = props;
  return (
    <div>
      <SearchForm
        schema={querySchema}
        smartQuery={smartQuery}
      />
      <Table
        schema={tableSchema}
        dataSource={value}
        {...props}
      />
      <Pagination
        totalCount={totalCount}
        pageSize={pageSize}
        pageNum={pageNum}
        handlePageNumChange={smartPageNumChange}
        handlePageSizeChange={smartPageSizeChange}
      />
      <EditForm
        schema={editSchema}
        mode={mode}
        {...props}
      />
    </div>
  );
};

CRUD.propTypes = {
  querySchema: object,
  tableSchema: object,
  editSchema: object,
  mode: string,
  smartQuery: func,
  moduleData: array,
  smartPageNumChange: func,
  smartPageSizeChange: func
};

CRUD.defaultProps = {
  querySchema: {},
  tableSchema: {},
  editSchema: {},
  mode: '',
  smartQuery: () => {},
  moduleData: [],
  smartPageNumChange: () => {},
  smartPageSizeChange: () => {}
};

export default CRUD;

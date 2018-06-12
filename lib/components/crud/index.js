import React from 'react';
import { object, string, func } from 'prop-types';
import EditForm from '../editForm';
import Table from '../table';
import Pagination from '../pagination';
import SearchForm from '../searchForm';


const CRUD = (props) => {
  const {
    querySchema, queryObj, tableSchema, editSchema,
    mode, smartQuery, smartClearQueryParam, moduleData: {
      value, extraInfo = {}
    },
    smartPageNumChange, smartPageSizeChange
  } = props;
  return (
    <div>
      <SearchForm
        schema={querySchema}
        queryObj={queryObj.param}
        smartQuery={smartQuery}
        smartClearQueryParam={smartClearQueryParam}
      />
      <Table
        schema={tableSchema}
        dataSource={value}
        {...props}
      />
      <Pagination
        totalCount={extraInfo.totalCount}
        pageSize={extraInfo.pageSize}
        pageNum={extraInfo.pageNum}
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
  queryObj: object,
  tableSchema: object,
  editSchema: object,
  mode: string,
  smartQuery: func,
  smartClearQueryParam: func,
  moduleData: object,
  smartPageNumChange: func,
  smartPageSizeChange: func
};

CRUD.defaultProps = {
  querySchema: {},
  queryObj: {},
  tableSchema: {},
  editSchema: {},
  mode: '',
  smartQuery: () => {},
  smartClearQueryParam: () => {},
  moduleData: {},
  smartPageNumChange: () => {},
  smartPageSizeChange: () => {}
};

export default CRUD;

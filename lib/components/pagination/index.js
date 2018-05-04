import React from 'react';
import { number, func } from 'prop-types';
import { Pagination, Select } from 'antd';
import Panel from '../panel';

const InnerPagination = (props) => {
  const {
    totalCount, pageSize, pageNum, handlePageNumChange, handlePageSizeChange
  } = props;
  let showSizeChanger = false;
  if (typeof handlePageSizeChange === 'function') {
    showSizeChanger = true;
  }

  return (
    <Panel
      style={{
        display: 'flex',
        flexDirection: 'row-reverse'
      }}
    >
      <Pagination
        showQuickJumper={true}
        selectComponentClass={Select}
        total={totalCount}
        showTotal={total => `每页 ${pageSize > total ? total : pageSize} 条, 共 ${total} 条`}
        pageSize={pageSize}
        defaultCurrent={1}
        current={pageNum}
        onChange={handlePageNumChange}
        showSizeChanger={showSizeChanger}
        onShowSizeChange={handlePageSizeChange}
      />
    </Panel>
  );
};

InnerPagination.defaultProps = {
  totalCount: 0,
  pageSize: 10,
  pageNum: 1,
  handlePageNumChange: () => {},
  handlePageSizeChange: () => {}
};

InnerPagination.propTypes = {
  totalCount: number,
  pageSize: number,
  pageNum: number,
  handlePageNumChange: func,
  handlePageSizeChange: func
};

export default InnerPagination;

import React from 'react';
import { Form, Row, Col, Table, Button, Icon, Tooltip, Divider, Card } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
import Panel from '../components/panel';
import strategies from './stragies';
import FIELD_TYPE from '../common/constant';

const FormItem = Form.Item;
/**
 * ------------------------------------------------------------------
 * FunseeSmart Generators
 * fieldBuilder  字段生成器
 * formBuilder  表单生成器
 * tableBuilder  表格生成器
 * ------------------------------------------------------------------
 */
const fieldBuilder = (config) => {
  const strategyFn = strategies[config.type];
  if (!strategyFn || typeof strategyFn !== 'function') throw new Error(`Generator can not recognize field type :${config.type}`);
  return strategyFn(config);
};

const filedLayoutBuilder = (antdForm, config, defaultValue = {}, expandStatus = true) => {
  const { getFieldDecorator } = antdForm;
  let { columnCount = 3 } = config;
  const { rowCount, fields } = config;
  // columns校验 目前只支持1、2、3、4列布局
  if ([1, 2, 3, 4].indexOf(columnCount) < 0) columnCount = 3;
  // 记录当前占用span数
  let spanCount = 0;
  const cols = Array.isArray(fields) && fields.map((field) => {
    let initialValue = defaultValue[field.key] || field.initialValue || '';

    // 预处理特殊字段类型 GROUP 、DATEPICKER、DATERANGE
    if (field.type === FIELD_TYPE.GROUP) {
      return (
        <div key={`smart_${field.key}`} style={{ clear: 'both' }}>
          <Card
            title={field.title}
          >
            <Row gutter={32}>
              {
            filedLayoutBuilder(antdForm, field, defaultValue)
           }
            </Row>
          </Card>
        </div>
      );
    } else if (field.type === FIELD_TYPE.DATERANGE) {
      if (Array.isArray(initialValue) && initialValue[0] && initialValue[1]) {
        initialValue = [moment(field.initialValue[0]), moment(field.initialValue[1])];
      }
    }

    const spanNum = field.visibility !== false ? (24 / columnCount) * (field.span || 1) : 0;
    spanCount += spanNum;

    // fieldDescriptor for getFieldDecorator
    const fieldDescriptor = {
      rules: [{
        validator: (rule, value, callback) => {
          if (typeof field.validator !== 'function' || field.validator(value)) {
            callback();
          } else {
            callback(field.help);
          }
        }
      }, { required: !!field.required }]
    };
    // some antd field don't need initialValue, such as DatePicker
    if (field.type === FIELD_TYPE.DATEPICKER) {
      if (initialValue) fieldDescriptor.initialValue = moment(initialValue);
    } else {
      fieldDescriptor.initialValue = initialValue;
    }


    return (
      <Col
        key={`smart_${field.key}`}
        span={spanNum}
        style={{
          display: (rowCount && !expandStatus && spanCount > 24 * rowCount) ? 'none' : 'block'
        }}
      >
        <FormItem
          key={field.key}
          label={field.label}
          style={{ display: field.visibility === false ? 'none' : 'block' }}
        >
          { getFieldDecorator(field.key, fieldDescriptor)(fieldBuilder(field)) }
        </FormItem>
      </Col>
    );
  });

  return cols;
};

const formBuilder = (antdForm, config, defaultValue = {}, expandStatus) => (
  <Form>
    <Row gutter={32}>
      {
          filedLayoutBuilder(antdForm, config, defaultValue, expandStatus)
      }
    </Row>
  </Form>
);

const tableBuilder = (config, dataSource, handleTableClick) => {
  const {
    primaryKey, columns, toolbarButtons, optionButtons, optionButtonFilter, optionWidth = 200
  } = config;

  const cols = [];
  if (Array.isArray(columns)) {
    cols.splice(1, 0, ...columns.map(item => ({
      ...item,
      dataIndex: item.key
    })));
  }
  if (Array.isArray(optionButtons)) {
    cols.push({
      title: '操作',
      key: 'action',
      fixed: 'right',
      width: optionWidth,
      render: (text, record) => {
        // add optionButtonFilter  2018-06-04
        let targetButtonIndex = Array(...Array(optionButtons.length)).map((item, index) => index);
        if (typeof optionButtonFilter === 'function') targetButtonIndex = optionButtonFilter(record, optionButtons);
        const btns = Array.isArray(targetButtonIndex) ? targetButtonIndex.map((item, i) => (
          <span key={`smart_${i}`}>
            <Tooltip placement='topLeft' title={optionButtons[item].tip || ''}>
              <a onClick={(e) => { e.preventDefault(); handleTableClick(primaryKey, record, optionButtons[item].click); }} href='#'>
                <Icon type={item.icon || ''} />{optionButtons[item].text}
              </a>
            </Tooltip>
            {
              i < targetButtonIndex.length - 1 ? <Divider key={`smart_d_${i}`} type='vertical' /> : ''
            }
          </span>)) : [];
        return (
          <span>
            {btns}
          </span>
        );
      }
    });
  }

  const toolBar = Array.isArray(toolbarButtons) ?
    toolbarButtons.map((item, i) => (
      <span key={`smart_${i}`} style={{ marginRight: '10px' }}>
        <Button type={item.type} key={item.text} onClick={(e) => { e.preventDefault(); handleTableClick(null, null, item.click); }}>
          <Icon type={item.icon} />{item.text}
        </Button>
      </span>))
    : null;

  return (
    <Panel>
      {
        toolBar
      }
      <div
        style={{
          whiteSpace: 'nowrap',
          overflow: 'hidden'
      }}
      >
        <Table
          scroll={{ x: 1300 }}
          columns={cols}
          dataSource={dataSource}
          pagination={false}
        />
      </div>
    </Panel>
  );
};

export default {
  fieldBuilder,
  formBuilder,
  tableBuilder
};

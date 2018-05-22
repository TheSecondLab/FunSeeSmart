import React from 'react';
import { Input, Select, DatePicker, Radio } from 'antd';
import FIELD_TYPE from '../common/constant';

const { Option } = Select;
const { TextArea } = Input;
const { RangePicker } = DatePicker;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

/**
 * ------------------------------------------------------------------
 * 封装generator的策略方法
 * ------------------------------------------------------------------
 */
const strategies = {
  // input
  [FIELD_TYPE.INPUT]: config => (
    <Input placeholder={config.placeholder} disabled={config.disabled} />
  ),

  // select
  [FIELD_TYPE.SELECT]: (config) => {
    const {
      placeholder, options, mode, disabled
    } = config;
    const opts = [<Option key='' value=''>{placeholder || '-请选择-'}</Option>];
    if (Array.isArray(config.options)) {
      opts.splice(1, 0, ...options.map(item => (<Option key={item.key} value={item.key} filterKey={item.value}>{item.value}</Option>)));
    }
    return (
      <Select
        mode={mode}
        disabled={disabled}
      >
        {opts}
      </Select>
    );
  },

  // textarea
  [FIELD_TYPE.TEXTAREA]: (config) => {
    const { placeholder, disabled, autosize } = config;
    return (
      <TextArea
        placeholder={placeholder}
        disabled={disabled}
        autosize={autosize}
      />);
  },

  // transfer
  [FIELD_TYPE.TRANSFER]: () => {

  },

  // datepicker
  [FIELD_TYPE.DATEPICKER]: (config) => {
    const {
      placeholder, format, disabled, showTime
    } = config;
    return (
      <DatePicker
        style={{ width: '100%' }}
        placeholder={placeholder}
        format={format || !!showTime ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD'}
        disabled={disabled}
        showTime={!!showTime}
      />
    );
  },

  // daterange
  [FIELD_TYPE.DATERANGE]: (config) => {
    const { disabled, showTime, format } = config;
    return (
      <RangePicker
        style={{ width: '100%' }}
        disabled={disabled}
        showTime={!!showTime}
        format={format || 'YYYY-MM-DD'}
      />
    );
  },

  // radio
  [FIELD_TYPE.RADIO]: (config) => {
    const { options, disabled } = config;
    const opts = [];
    if (Array.isArray(options)) {
      opts.splice(0, 0, ...options.map(item => <RadioButton value={item.key}>{item.value}</RadioButton>));
    }
    return (
      <RadioGroup
        disabled={disabled}
      >
        {opts}
      </RadioGroup>
    );
  }
};

export default strategies;

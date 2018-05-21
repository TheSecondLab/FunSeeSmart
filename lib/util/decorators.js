import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React, { Component as C } from 'react';
import { Modal } from 'antd';
import * as actions from '../redux/action';
import { smartSelector } from './selectors';
/**
 * ------------------------------------------------------------------
 * smart decorators
 * ------------------------------------------------------------------
 */
const autobind = (excludeFunNames = ['constructor', 'render']) => (Target) => {
  if (typeof Target !== 'function') {
    throw new TypeError(
      'The autobind decorator must be passed a function as the second argument.'
    );
  }

  if (!Array.isArray(excludeFunNames)) {
    throw new TypeError(
      'The autobind decorator must be passed an array as the first argument.'
    );
  }

  const { prototype } = Target;
  Object.getOwnPropertyNames(prototype).forEach((item) => {
    if (excludeFunNames.indexOf(item) === -1 && typeof prototype[item] === 'function') {
      const propDescriptor = Object.getOwnPropertyDescriptor(prototype, item);
      const { value, configurable, enumerable } = propDescriptor;
      if (typeof value === 'function' && configurable) {
        Object.defineProperty(prototype, item, {
          enumerable,
          configurable,
          get() {
            if (this.hasOwnProperty(item)) {
              // Don't bind the prototype's method to the prototype, or we can't re-bind it to instances.
              return value;
            }
            const boundMethod = value.bind(this);
            Object.defineProperty(this, item, {
              enumerable,
              configurable,
              value: boundMethod,
              writable: propDescriptor.writable !== false
            });

            return boundMethod;
          },
          set(newValue) {
            if (propDescriptor.writable) {
              Object.defineProperty(prototype, item, {
                value: newValue,
                configurable: true,
                enumerable: true,
                writable: true
              });
            }
          }
        });
      }
    }
  });
};

const smart = (config = {}) => (WrappedComponent) => {
  const { moduleName, schema: { querySchema, tableSchema, editSchema }, schemaHandler } = config;
  if (!moduleName) throw new Error('Smart first param config missing, moduleName is not defined ...');
  const MODULE_NAME = config.moduleName;
  class MagicComponent extends C {
    constructor(props) {
      super(props);
      // set  moduleName
      this.props.smartSetModuleName(MODULE_NAME);
      // init queryObject when add moduleData to redux store firt time
      if (!Object.keys(props.queryObj || {}).length) {
        this.props.smartInitQueryObj({
          pageNum: 1, pageSize: 10, param: {}, extraInfo: {}
        }, MODULE_NAME);
      }
    }

    componentDidMount() {
      // default fetch data
      this.props.smartSelect();
    }

    render() {
      // shema handler
      if (typeof schemaHandler === 'function') schemaHandler(config.schema, this.props);

      // customer behavior injection
      const customerBehavior = {};
      Object.keys(config).forEach((item) => {
        if (['moduleName', 'schema', 'schemaHandler'].indexOf(item) === -1 && typeof config[item] === 'function') {
          customerBehavior[item] = (record, primaryKey) => {
            config[item](this.props, record, primaryKey);
          };
        }
      });

      const props = {
        ...this.props,
        querySchema,
        tableSchema,
        editSchema,
        smartDelete: (record, primaryKey) => {
          Modal.confirm({
            title: '确认删除',
            content: `当前被选中的行: ${record[primaryKey]}`,
            onOk: () => {
              this.props.smartDelete(record, primaryKey);
            }
          });
        },
        smartPageSizeChange: (currentPage, pageSize) => {
          this.props.smartPageSizeChange(pageSize);
        },
        ...customerBehavior
      };
      return (
        <WrappedComponent {...props} />
      );
    }
  }

  return connect(
    smartSelector(MODULE_NAME)
    , dispatch => ({
      dispatch,
      smartSetModuleName: bindActionCreators(actions.smartSetModuleName, dispatch),
      smartInitQueryObj: bindActionCreators(actions.smartInitQueryObj, dispatch),
      smartQuery: bindActionCreators(actions.smartQuery, dispatch),
      smartAdd: bindActionCreators(actions.smartAdd, dispatch),
      smartHideModal: bindActionCreators(actions.smartHideModal, dispatch),
      smartSelect: bindActionCreators(actions.smartSelect, dispatch),
      smartSave: bindActionCreators(actions.smartSave, dispatch),
      smartView: bindActionCreators(actions.smartView, dispatch),
      smartCopy: bindActionCreators(actions.smartCopy, dispatch),
      smartEdit: bindActionCreators(actions.smartEdit, dispatch),
      smartDelete: bindActionCreators(actions.smartDelete, dispatch),
      smartPageNumChange: bindActionCreators(actions.smartPageNumChange, dispatch),
      smartPageSizeChange: bindActionCreators(actions.smartPageSizeChange, dispatch)
    })
  )(MagicComponent);
};

export default {
  autobind,
  smart
};

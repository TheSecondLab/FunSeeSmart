import React, { Component as C } from 'react';
import { Form, Row, Col, Button, Icon } from 'antd';
import { object } from 'prop-types';
import Panel from '../panel';
import { formBuilder } from '../../util/generator';
import { autobind } from '../../util/decorators';

@autobind()
class SearchForm extends C {
  constructor(props) {
    super(props);
    this.state = {
      expand: false
    };
  }

  toggle(){
    const { expand } = this.state;
    this.setState({ expand: !expand });
  }

  btnBuilder(config) {
    const {
      rowCount,
      buttons = [{
        text: '查询',
        type: 'primary',
        icon: 'search',
        click: 'smartQuery'
      }, {
        text: '清除',
        icon: 'cross',
        isReset: true
      }]
    } = config;

    const cols = buttons.map((item, index) => (
      <Col key={index} >
        <Button
          type={item.type}
          onClick={() => { if (item.isReset) this.handleReset(); else this.handleClick(this.props[item.click]); }}
        >
          <Icon type={item.icon} />{item.text}
        </Button>
      </Col>
    ));

    return (
      <Row type='flex' justify='end' gutter={8}>
        {
          cols
        }
        {
          rowCount ? <a
            style={{ marginLeft: 8, fontSize: 12 }}
            onClick={this.toggle}
          >
          {!this.state.expand ? '展开' : '收缩'} <Icon type={this.state.expand ? 'up' : 'down'} />
                     </a> : ''

        }
      </Row>
    );
  }

  handleClick(fn) {
    const { form } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const params = Object.keys(values).reduce((acc, val) => {
          const _tempVal = values[val];
          if (_tempVal) acc[val] = _tempVal instanceof Date ? _tempVal.format('yyyy-MM-dd HH:mm:ss') : _tempVal;
          return acc;
        }, {});
        fn(params);
      }
    });
  }

  handleReset() {
    this.props.form.resetFields();
  }


  render() {
    const { schema, form } = this.props;
    const { expand } = this.state;
    return (
      <Panel>
        {
            formBuilder(form, schema, {}, expand)
        }
        {
            this.btnBuilder(schema)
        }
      </Panel>
    );
  }
}

SearchForm.propTypes = {
  schema: object
};

SearchForm.defaultProps = {
  schema: {}
};

export default Form.create()(SearchForm);

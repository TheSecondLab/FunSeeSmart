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
    const { form, schema: { fields } } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const params = Object.keys(values).reduce((acc, val) => {
          let _tempVal = values[val];
          if(_tempVal){
            //DateRange process
            if(Array.isArray(_tempVal) && _tempVal[0] && _tempVal[0].format && _tempVal[1] && _tempVal[1].format) _tempVal = [_tempVal[0].format('X') * 1000,_tempVal[1].format('X') * 1000];
            //DatePicker process
            if (_tempVal && _tempVal.format)  _tempVal= _tempVal.format('X') * 1000;
            acc[val] = _tempVal;
          }
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
    const { schema, queryObj,form } = this.props;
    const { expand } = this.state;
    return (
      <Panel>
        {
            formBuilder(form, schema, queryObj, expand)
        }
        {
            this.btnBuilder(schema)
        }
      </Panel>
    );
  }
}

SearchForm.propTypes = {
  schema: object,
  queryObj: object
};

SearchForm.defaultProps = {
  schema: {},
  queryObj: {}
};

export default Form.create()(SearchForm);

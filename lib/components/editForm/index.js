import React, { Component as C } from 'react';
import { Form, Modal, Button } from 'antd';
import { object } from 'prop-types';
import { formBuilder } from '../../util/generator';
import { autobind } from '../../util/decorators';

@autobind()
class EditForm extends C {
  handleOk() {
    const { form, smartHideModal, smartSave } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        smartSave(values);
        smartHideModal();
      }
    });
  }

  render() {
    const {
       form, visible, width = '80%', smartHideModal, editData, mode
    } = this.props;

    let { schema } = this.props;
    // add some logic for 'view' mode
    let footer = [
      <Button key="cancel" onClick={smartHideModal}>取消</Button>,
      <Button key="submit" type="primary"  onClick={this.handleOk}>确定</Button>
    ];
    const disabledUtil = (arr) => arr.forEach(item => {
      if(!Array.isArray(item.fields)) {
        item.disabled = true; 
      } else {
       disabledUtil(item.fields);
      }
    });
    if(mode === 'view') {
      footer = [<Button key="cancel_ok" onClick={smartHideModal}>确定</Button>];
      const viewSchema = JSON.parse(JSON.stringify(schema));
      disabledUtil(viewSchema.fields);
      schema = viewSchema;
    }
  

    if(!!mode){
      return (
        <Modal
          visible={true}
          width={width}
          title={({view: '查看',add: '新增', edit:'编辑', copy:'复制'})[mode]}
          onCancel={smartHideModal}
          onOk = {this.handleOk}
          footer={footer}
        >
          {
            formBuilder(form, schema, editData)
          }
        </Modal>
      );
    }

    return <div />;
  }
}

EditForm.propTypes = {
  schema: object
};

EditForm.defaultProps = {
  schema: {}
};

export default Form.create()(EditForm);

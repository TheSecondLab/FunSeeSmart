import React, { Component as C } from 'react';
import { Form, Modal } from 'antd';
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
      schema, form, visible, width = '80%', smartHideModal, editData, mode
    } = this.props;

    if(!!mode){
      return (
        <Modal
          visible={true}
          width={width}
          title={({view: '查看',add: '新增', edit:'编辑', copy:'复制'})[mode]}
          onCancel={smartHideModal}
          onOk = {this.handleOk}
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

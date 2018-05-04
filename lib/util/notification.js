import { notification } from 'antd';

export const showSuccess = (msg) => {
  notification.success({
    message: '请求成功',
    description: msg,
    duration: 3
  });
};

export const showError = (err) => {
  notification.error({
    message: '请求失败',
    description: err,
    duration: 20
  });
};

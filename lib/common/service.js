import { request } from 'funsee-request';

const optionFormatter = (body = {}, header = {}) => ({
  headers: {
    credentials: 'include',
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...header
  },
  body
});

export const smartSelect = (moduleName, payload) => request.post(`/api/${moduleName}/select`, optionFormatter(payload));

export const smartInsert = (moduleName, payload) => request.post(`/api/${moduleName}/insert`, optionFormatter(payload));

export const smartUpdate = (moduleName, payload) => request.post(`/api/${moduleName}/update`, optionFormatter(payload));

export const smartDelete = (moduleName, payload) => request.post(`/api/${moduleName}/deletet`, optionFormatter(payload));


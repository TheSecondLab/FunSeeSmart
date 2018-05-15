import { request } from 'funsee-request';

const optionFormatter = (body = {}, header = {}) => ({
  headers: {
    credentials: 'include',
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...header
  },
  method: 'POST',
  body
});

export const smartSelect = (moduleName, payload) => request.request(`/api/${moduleName}/select`, optionFormatter(payload));

export const smartInsert = (moduleName, payload) => request.request(`/api/${moduleName}/insert`, optionFormatter(payload));

export const smartUpdate = (moduleName, payload) => request.request(`/api/${moduleName}/update`, optionFormatter(payload));

export const smartDelete = (moduleName, payload) => request.request(`/api/${moduleName}/deletet`, optionFormatter(payload));


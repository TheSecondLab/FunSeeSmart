import { request } from 'funsee-request';

const optionFormatter = (body = {}, header = {}) => ({
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...header
  },
  credentials: 'include',
  method: 'POST',
  body
});

export const smartSelect = (moduleName, payload) => request.request(`/api/smart/${moduleName}/select`, optionFormatter(payload));

export const smartInsert = (moduleName, payload) => request.request(`/api/smart/${moduleName}/insert`, optionFormatter(payload));

export const smartUpdate = (moduleName, payload) => request.request(`/api/smart/${moduleName}/update`, optionFormatter(payload));

export const smartDelete = (moduleName, payload) => request.request(`/api/smart/${moduleName}/deletet`, optionFormatter(payload));


import { request } from 'funsee-request';

export const smartSelect = (moduleName, payload) => request.post(`/api/${moduleName}/select`, payload);

export const smartInsert = (moduleName, payload) => request.post(`/api/${moduleName}/insert`, payload);

export const smartUpdate = (moduleName, payload) => request.post(`/api/${moduleName}/update`, payload);

export const smartDelete = (moduleName, payload) => request.post(`/api/${moduleName}/deletet`, payload);


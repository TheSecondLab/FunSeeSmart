const { smart, autobind } = require('./dist/util/decorators');
const { showSuccess, showError } = require('./dist/util/notification');
const funseeSmartMidWare = require('./dist/util/funseeSmartMidWare');
const { fieldBuilder, formBuilder, tableBuilder } = require('./dist/util/generator');
const {
  SearchForm, Table, Pagination, EditForm, CRUD
} = require('./dist/components');
const FIELD_TYPE = require('./dist/common/constant');
const smartReducer = require('./dist/redux/reducer');
const smartSaga = require('./dist/redux/saga');
const { smartAction } = require('./dist/redux/action');

module.exports = {
  smart,
  autobind,
  showSuccess,
  showError,
  funseeSmartMidWare,
  fieldBuilder,
  formBuilder,
  tableBuilder,
  SearchForm,
  Table,
  Pagination,
  EditForm,
  CRUD,
  FIELD_TYPE,
  smartReducer,
  smartSaga,
  smartAction
};


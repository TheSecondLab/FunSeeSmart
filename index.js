const { smart, autobind } = require('./dist/util/decorators');
const { fieldBuilder, formBuilder, tableBuilder } = require('./dist/util/generator');
const {
  SearchForm, Table, Pagination, EditForm, CRUD
} = require('./dist/components');

module.exports = {
  smart,
  autobind,
  fieldBuilder,
  formBuilder,
  tableBuilder,
  SearchForm,
  Table,
  Pagination,
  EditForm,
  CRUD
};


/**
 * ------------------------------------------------------------------
 * searchForm actions
 * ------------------------------------------------------------------
 */
export const SMART_QUERY_REQUEST = Symbol('SMART_QUERY_REQUEST');
export const SMART_QUERY_SUCCESS = Symbol('SMART_QUERY_SUCCESS');
export const smartQuery = payload => ({
  type: SMART_QUERY_REQUEST,
  payload
});
export const smartQuerySucess = payload => ({
  type: SMART_QUERY_SUCCESS,
  payload
});

/**
 * ------------------------------------------------------------------
 * table actions
 * ------------------------------------------------------------------
 */
export const SMART_ADD = Symbol('SMART_ADD');
export const smartAdd = () => ({
  type: SMART_ADD
});

export const SMART_COPY = Symbol('SMART_COPY');
export const smartCopy = (record, primaryKey) => {
  if (primaryKey) record[primaryKey] = null;
  return ({
    type: SMART_COPY,
    payload: record
  });
};

export const SMART_VIEW = Symbol('SMART_VIEW');
export const smartView = payload => ({
  type: SMART_VIEW,
  payload
});

export const SMART_EDIT = Symbol('SMART_EDIT');
export const smartEdit = payload => ({
  type: SMART_EDIT,
  payload
});

export const SMART_DELETE = Symbol('SMART_DELETE');
export const smartDelete = payload => ({
  type: SMART_DELETE,
  payload
});

export const SMART_SELECT_REQUEST = Symbol('SMART_SELECT_REQUEST');
export const SMART_SELECT_SUCCESS = Symbol('SMART_SELECT_SUCCESS');
export const smartSelect = () => ({
  type: SMART_SELECT_REQUEST
});
export const smartSelectSuccess = (payload, moduleName) => ({
  type: SMART_SELECT_SUCCESS,
  payload,
  moduleName
});

export const SMART_HIDE_MODAL = Symbol('SMART_HIDE_MODAL');
export const smartHideModal = () => ({
  type: SMART_HIDE_MODAL
});

export const SMART_SAVE = Symbol('SMART_SAVE');
export const smartSave = payload => ({
  type: SMART_SAVE,
  payload
});

/**
 * ------------------------------------------------------------------
 * pagination actions
 * ------------------------------------------------------------------
 */
export const SMART_PAGENUM_CHANGE = Symbol('SMART_PAGENUM_CHANGE');
export const smartPageNumChange = payload => ({
  type: SMART_PAGENUM_CHANGE,
  payload
});
export const SMART_PAGESIZE_CHANGE = Symbol('SMART_PAGESIZE_CHANGE');
export const smartPageSizeChange = payload => ({
  type: SMART_PAGESIZE_CHANGE,
  payload
});


/**
 * ------------------------------------------------------------------
 * setModuleName actions
 * ------------------------------------------------------------------
 */
export const SMART_SET_MODULENAME = Symbol('SMART_SET_MODULENAME');
export const smartSetModuleName = payload => ({
  type: SMART_SET_MODULENAME,
  payload
});

/**
 * ------------------------------------------------------------------
 * setQueryObj actions
 * ------------------------------------------------------------------
 */
export const SMART_INIT_QUERYOBJ = Symbol('SMART_INIT_QUERYOBJ');
export const smartInitQueryObj = (payload, moduleName) => ({
  type: SMART_INIT_QUERYOBJ,
  payload,
  moduleName
});

export const SMART_SET_QUERYOBJ = Symbol('SMART_SET_QUERYOBJECT');
export const smartSetQueryObj = (payload, moduleName) => ({
  type: SMART_SET_QUERYOBJ,
  payload,
  moduleName
});

/**
 * ------------------------------------------------------------------
 * smart loading action
 * ------------------------------------------------------------------
 */
export const SMART_SHOW_LOADING = Symbol('SMART_SHOW_LOADING');
export const smartShowLoading = () => ({
  type: SMART_SHOW_LOADING
});

export const SMART_HIDE_LOADING = Symbol('SMART_SHOW_LOADING');
export const smartHideLoading = () => ({
  type: SMART_HIDE_LOADING
});

export const SMART_RES_MESSAGE = Symbol('SMART_RES_MESSAGE');
export const smartResMessage = payload => ({
  type: SMART_RES_MESSAGE,
  payload
});

export const CLEAR_QUERY_PARAM = Symbol('CLEAR_QUERY_PARAM');
export const clearQueryParam = () => ({
  type: CLEAR_QUERY_PARAM
});
export const CLEAR_MODUEL_QUERY_PARAM = Symbol('CLEAR_MODUEL_QUERY_PARAM');
export const clearModuleQueryParam = moduleName => ({
  type: CLEAR_MODUEL_QUERY_PARAM,
  moduleName
});


// export for external package reference
export const smartAction = {
  SMART_SHOW_LOADING,
  SMART_HIDE_LOADING,
  SMART_RES_MESSAGE
};

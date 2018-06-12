import { takeLatest, put, call, select } from 'redux-saga/effects';
import * as actions from './action';
import * as services from '../common/service';
import { showError } from '../util/notification';
import { moduleNameSelector, queryObjSelector, modeSelector } from '../util/selectors';

function* smartQuery(action) {
  try {
    const moduleName = yield select(moduleNameSelector);
    const queryObj = yield select(queryObjSelector(moduleName));
    queryObj.param = action.payload;
    yield put(actions.smartSetQueryObj(queryObj, moduleName));
    yield put(actions.smartSelect());
  } catch (error) {
    console.log(error);
  }
}

function* smartSelect() {
  try {
    const moduleName = yield select(moduleNameSelector);
    const queryObj = yield select(queryObjSelector(moduleName));
    // show loading
    yield put(actions.smartShowLoading());
    const data = yield call(services.smartSelect, moduleName, queryObj);
    if (data.success) yield put(actions.smartSelectSuccess(data, moduleName));
    // hide loading
    yield put(actions.smartHideLoading());
    // pass saga response to external project
    yield put(actions.smartResMessage({
      ...data,
      mode: 'select'
    }));
  } catch (error) {
    // hide loading
    yield put(actions.smartHideLoading());
    yield call(showError, error);
  }
}

function* smartSave(action) {
  try {
    const moduleName = yield select(moduleNameSelector);
    const mode = yield select(modeSelector);
    // show loading
    yield put(actions.smartShowLoading());
    const data = yield call(mode === 'edit' ? services.smartUpdate : services.smartInsert, moduleName, action.payload);
    if (data.success) yield put(actions.smartSelect());
    // hide loading
    yield put(actions.smartHideLoading());
    // pass saga response to external project
    yield put(actions.smartResMessage({
      ...data,
      mode
    }));
  } catch (error) {
    // hide loading
    yield put(actions.smartHideLoading());
    yield call(showError, error);
  }
}


function* smartDelete(action) {
  try {
    const moduleName = yield select(moduleNameSelector);
    // show loading
    yield put(actions.smartShowLoading());
    const data = yield call(services.smartDelete, moduleName, action.payload);
    if (data.success) yield put(actions.smartSelect());
    // hide loading
    yield put(actions.smartHideLoading());
    // pass saga response to external project
    yield put(actions.smartResMessage({
      ...data,
      mode: 'delete'
    }));
  } catch (error) {
    // hide loading
    yield put(actions.smartHideLoading());
    yield call(showError, error);
  }
}


function* smartPageNumChange(action) {
  try {
    const moduleName = yield select(moduleNameSelector);
    const queryObj = yield select(queryObjSelector(moduleName));
    if (action.type === actions.SMART_PAGENUM_CHANGE) {
      queryObj.pageNum = action.payload;
    } else {
      queryObj.pageSize = action.payload;
      queryObj.pageNum = 1;
    }
    yield put(actions.smartSetQueryObj(queryObj, moduleName));
    yield put(actions.smartSelect());
  } catch (error) {
    yield call(showError, error);
  }
}

function* smartClearQueryParam() {
  try {
    const moduleName = yield select(moduleNameSelector);
    yield put(actions.clearModuleQueryParam(moduleName));
  } catch (error) {
    yield call(showError, error);
  }
}


export default function* () {
  yield [
    takeLatest(actions.SMART_QUERY_REQUEST, smartQuery),
    takeLatest(actions.SMART_SELECT_REQUEST, smartSelect),
    takeLatest(actions.SMART_SAVE, smartSave),
    takeLatest(actions.SMART_DELETE, smartDelete),
    takeLatest(actions.SMART_PAGENUM_CHANGE, smartPageNumChange),
    takeLatest(actions.SMART_PAGESIZE_CHANGE, smartPageNumChange),
    takeLatest(actions.CLEAR_QUERY_PARAM, smartClearQueryParam)
  ];
}

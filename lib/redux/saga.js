import { takeLatest, put, call, select } from 'redux-saga/effects';
import * as actions from './action';
import * as services from '../common/service';
import { showSuccess, showError } from '../util/notification';
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

const testDataSource = [];
for (let i = 0; i < 10; i++) {
  testDataSource.push({
    code: `code_${i}`,
    name: `name_${i}`,
    appName: 'appName...',
    owner: 'breeze ~ ',
    url: 'https://fooooo.....com',
    environment: 'dev'
  });
}

function* smartSelect() {
  try {
    const moduleName = yield select(moduleNameSelector);
    const queryObj = yield select(queryObjSelector);
    const data = yield call(services.smartSelect, moduleName, queryObj);
    yield put(actions.smartSelectSuccess(testDataSource, moduleName));
  } catch (error) {
    yield call(showError, error);
  }
}

function* smartSave(action) {
  try {
    const moduleName = yield select(moduleNameSelector);
    const mode = yield select(modeSelector);
    const msg = yield call(mode === 'add' ? services.smartInsert : services.smartUpdate, moduleName, action.payload);
    yield call(showSuccess, msg);
  } catch (error) {
    yield call(showError, error);
  }
}


function* smartDelete(action) {
  try {
    const moduleName = yield select(moduleNameSelector);
    const msg = yield call(services.smartDelete, moduleName, action.payload);
    yield call(showSuccess, msg);
  } catch (error) {
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


export default function* () {
  yield [
    takeLatest(actions.SMART_QUERY_REQUEST, smartQuery),
    takeLatest(actions.SMART_SELECT_REQUEST, smartSelect),
    takeLatest(actions.SMART_SAVE, smartSave),
    takeLatest(actions.SMART_DELETE, smartDelete),
    takeLatest(actions.SMART_PAGENUM_CHANGE, smartPageNumChange),
    takeLatest(actions.SMART_PAGESIZE_CHANGE, smartPageNumChange)
  ];
}

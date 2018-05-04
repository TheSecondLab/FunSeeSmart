import { combineReducers } from 'redux';
import { Map, fromJS } from 'immutable';
import * as actions from './action';

function common(state = { moduleName: '', mode: '', editData: {} }, action) {
  switch (action.type) {
    case actions.SMART_ADD:
      return Map(state).set('mode', 'add').toJS();
    case actions.SMART_VIEW:
      return Map(state).set('mode', 'view').set('editData', action.payload).toJS();
    case actions.SMART_COPY:
      return Map(state).set('mode', 'copy').set('editData', action.payload).toJS();
    case actions.SMART_EDIT:
      return Map(state).set('mode', 'edit').set('editData', action.payload).toJS();
    case actions.SMART_HIDE_MODAL:
      return Map(state).set('mode', '').set('editData', {}).toJS();
    case actions.SMART_SET_MODULENAME:
      return Map(state).set('moduleName', action.payload).toJS();
    default:
      return state;
  }
}

function data(state = {}, action) {
  switch (action.type) {
    case actions.SMART_SET_QUERYOBJ:
      return fromJS(state).updateIn([action.moduleName, 'queryObj'], () => action.payload).toJS();
    case actions.SMART_SELECT_SUCCESS:
      return fromJS(state).updateIn([action.moduleName, 'moduleData'], () => action.payload).toJS();
    case actions.SMART_INIT_QUERYOBJ:
      return fromJS(state).updateIn([action.moduleName, 'queryObj'], () => action.payload).toJS();
    default:
      return state;
  }
}

export default combineReducers({
  smart: combineReducers({
    common,
    data
  })
});

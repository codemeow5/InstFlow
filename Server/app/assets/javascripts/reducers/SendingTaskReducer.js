import {combineReducers} from 'redux';
import {ActionTypes} from '../actions';

import _ from 'underscore';
import Immutable from 'immutable';

export default function(state={}, action){
    switch(action.type){
        case ActionTypes.TYPE_CREATE_SENDING_TASK_REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            });
        case ActionTypes.TYPE_CREATE_SENDING_TASK_SUCCESS:
            var items = Immutable.fromJS(state.items != undefined ? state.items : {});
            items = items.setIn([action.response.id], {
                data: action.response,
                response: action.response
            });
            return Object.assign({}, state, {
                isFetching: false,
                form: null,
                items: items.toJS()
            });
        case ActionTypes.TYPE_CREATE_SENDING_TASK_FAILURE:
            return Object.assign({}, state, {
                isFetching: false
            });
        case ActionTypes.TYPE_FETCH_SENDING_TASK_REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            });
        case ActionTypes.TYPE_FETCH_SENDING_TASK_SUCCESS:
            var items = Immutable.fromJS(state.items != undefined ? state.items : {});
            items = items.setIn([action.response.id], {
                data: action.response,
                response: action.response
            });
            return Object.assign({}, state, {
                isFetching: false,
                items: items.toJS()
            });
        case ActionTypes.TYPE_FETCH_SENDING_TASK_FAILURE:
            return Object.assign({}, state, {
                isFetching: false
            });
        case ActionTypes.TYPE_CHANGE_NEW_SENDING_TASK_DATA:
            var form = Object.assign({}, state.form);
            form[action.name] = action.value;
            return Object.assign({}, state, {
                form: form
            });
        case ActionTypes.TYPE_CLEAN_NEW_SENDING_TASK_DATA:
            return Object.assign({}, state, {
                form: null
            });
        default:
            return state;
    }
}
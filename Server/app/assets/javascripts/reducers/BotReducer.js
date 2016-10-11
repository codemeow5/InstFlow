import {combineReducers} from 'redux';
import {
    TYPE_FETCH_BOT_REQUEST,
    TYPE_FETCH_BOT_SUCCESS,
    TYPE_FETCH_BOT_FAILURE,
    TYPE_SAVE_BOT_REQUEST,
    TYPE_SAVE_BOT_SUCCESS,
    TYPE_SAVE_BOT_FAILURE,
    TYPE_CHANGE_BOT_FORM,
    TYPE_CHANGE_CANCEL_BOT,
    TYPE_BOT_CREATE_REQUEST, 
    TYPE_BOT_CREATE_SUCCESS, 
    TYPE_BOT_CREATE_FAILURE,
    TYPE_CHANGE_BOT_CREATE_FORM,
    TYPE_CHANGE_CANCEL_BOT_CREATE
} from '../actions';

function CreateReducer(state={}, action){
    switch(action.type){
        case TYPE_BOT_CREATE_REQUEST:
            return Object.assign({}, state, {
                fetching: true
            });
        case TYPE_BOT_CREATE_SUCCESS:
            return Object.assign({}, state, {
                fetching: false,
                response: action.response,
                form: action.response
            });
        case TYPE_BOT_CREATE_FAILURE:
            return Object.assign({}, state, {
                fetching: false,
                err: action.err
            });
        case TYPE_CHANGE_BOT_CREATE_FORM:
            var changedData = Object.assign({}, state.form);
            changedData[action.fieldName] = action.value;
            return Object.assign({}, state, {
                form: changedData
            });
        case TYPE_CHANGE_CANCEL_BOT_CREATE:
            return Object.assign({}, state, {
                form: state.response
            });
        default:
            return state;
    }
}

function BotReducer(state={}, action){
    switch(action.type){
        case TYPE_FETCH_BOT_REQUEST:
            return Object.assign({}, state, {
                fetching: true
            });
        case TYPE_FETCH_BOT_SUCCESS:
            return Object.assign({}, state, {
                fetching: false,
                response: action.response,
                form: action.response
            });
        case TYPE_FETCH_BOT_FAILURE:
            return Object.assign({}, state, {
                fetching: false,
                err: action.err
            });
        case TYPE_SAVE_BOT_REQUEST:
            return Object.assign({}, state, {
                fetching: true
            });
        case TYPE_SAVE_BOT_SUCCESS:
            return Object.assign({}, state, {
                fetching: false,
                response: action.response,
                form: action.response
            });
        case TYPE_SAVE_BOT_FAILURE:
            return Object.assign({}, state, {
                fetching: false,
                err: action.err
            });
        case TYPE_CHANGE_BOT_FORM:
            var changedData = Object.assign({}, state.form);
            changedData[action.fieldName] = action.value;
            return Object.assign({}, state, {
                form: changedData
            });
        case TYPE_CHANGE_CANCEL_BOT:
            return Object.assign({}, state, {
                form: state.response
            });
        default:
            return state;
    }
}

export default combineReducers({
    create: CreateReducer,
    data: BotReducer
});
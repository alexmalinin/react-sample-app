import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';


import changeUserType from './changeUserTypeReducer';
import contactRequest from './contactRequestReducer';
import signUpData from './signUpDataReducer';

export default combineReducers({
    changeUserType,
    contactRequest,
    signUpData,
    form: reduxFormReducer,
});

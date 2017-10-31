import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';


import changeUserType from './changeUserTypeReducer';
import contactRequest from './contactRequestReducer';
import signUpData from './signUpReducer';
import UserId from './getUserIdByTokenConfirmationReducer';
import confirmPassword from './confirmPassword';

export default combineReducers({
    changeUserType,
    contactRequest,
    signUpData,
    UserId,
    confirmPassword,
    form: reduxFormReducer,
});

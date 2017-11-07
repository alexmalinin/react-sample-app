import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';

import hideFooter from './hideFooter';
import changeUserType from './changeUserTypeReducer';
import signUpData from './signUpReducer';
import signInReducer from './signInReducer';
import UserId from './getUserIdByTokenConfirmationReducer';
import confirmPassword from './confirmPassword';
import indusrties from './indusrtiesReducer.js';
import educations from './educationsReducer';
import experiences from './workExperienceReducer';
import clientData from './showClientDataReducer';
// import contactRequest from './contactRequestReducer';

export default combineReducers({
    hideFooter,
    changeUserType,
    signUpData,
    signInReducer,
    UserId,
    confirmPassword,
    indusrties,
    educations,
    experiences,
    clientData,
    form: reduxFormReducer,
    // contactRequest,
});

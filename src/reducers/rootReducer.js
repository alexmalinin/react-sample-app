import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';

import changeUserType from './changeUserTypeReducer';
import signUpData from './signUpReducer';
import signInReducer from './signInReducer';
import UserId from './getUserIdByTokenConfirmationReducer';
import confirmPassword from './confirmPassword';
import educations from './educationsReducer';
import experiences from './workExperienceReducer';
// import contactRequest from './contactRequestReducer';

export default combineReducers({
    changeUserType,
    signUpData,
    signInReducer,
    UserId,
    confirmPassword,
    educations,
    experiences,
    form: reduxFormReducer,
    // contactRequest,
});

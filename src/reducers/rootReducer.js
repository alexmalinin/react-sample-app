import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';

import hideFooter from './hideFooter';
import sidebar from './sidebar';
import changeUserType from './changeUserTypeReducer';
import signUpData from './signUpReducer';
import signInReducer from './signInReducer';
import UserId from './getUserIdByTokenConfirmationReducer';
import confirmPassword from './confirmPassword';
import indusrties from './indusrtiesReducer.js';
import educations from './educationsReducer';
import experiences from './workExperienceReducer';
import chosenSkills from './showChosenSkillsReducer';
import clientData from './showClientDataReducer';
import specialistData from './showSpecialistDataReducer';
// import contactRequest from './contactRequestReducer';

export default combineReducers({
    hideFooter,
    sidebar,
    changeUserType,
    signUpData,
    signInReducer,
    UserId,
    confirmPassword,
    indusrties,
    educations,
    experiences,
    chosenSkills,
    clientData,
    specialistData,
    form: reduxFormReducer,
    // contactRequest,
});

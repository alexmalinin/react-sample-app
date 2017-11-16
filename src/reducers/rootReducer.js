import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';

import hideFooter from './hideFooter';
import sidebar from './sidebar';
import changeUserType from './changeUserTypeReducer';
import signUpData from './signUpReducer';
import signInReducer from './signInReducer';
import UserId from './getUserIdByTokenConfirmationReducer';
import confirmPassword from './confirmPassword';
import industries from './industriesReducer.js';
import projectTypes from './projectTypesReducer';
import educations from './educationsReducer';
import experiences from './workExperienceReducer';
import chosenSkills from './showChosenSkillsReducer';
import clientData from './showClientDataReducer';
import specialistData from './showSpecialistDataReducer';
// import specialistProfile from './specialistProfile';
// import contactRequest from './contactRequestReducer';

export default combineReducers({
    hideFooter,
    sidebar,
    changeUserType,
    signUpData,
    signInReducer,
    UserId,
    confirmPassword,
    industries,
    educations,
    experiences,
    projectTypes,
    chosenSkills,
    clientData,
    specialistData,
    form: reduxFormReducer,
    // contactRequest,
});

import { createStore, applyMiddleware } from 'redux';

import reducer                      from '../reducers/rootReducer';
import contactRequest               from '../middlewares/contactRequestApi';
import signUp                       from '../middlewares/signUpApi';
import getUserIdByTokenConfirmation from '../middlewares/getUserIdByTokenConfirmationApi';
import deleteConfirmationToken      from '../middlewares/deleteConfirmationTokenApi';
import verification                 from '../middlewares/verificationApi';
import changePassword               from '../middlewares/passwords/changePasswordApi';
import signIn                       from '../middlewares/signInApi';
import getEmailForResetPassword     from '../middlewares/passwords/getEmailForResetPasswordApi';
import getPasswordsForResetPassword from '../middlewares/passwords/getPasswordsForResetPasswordApi';
import welcomeClient                from '../middlewares/welcomeClientApi';
import getIndustires                from '../middlewares/getIndustiresApi';
import getProjectTypes              from '../middlewares/getProjectTypesApi';
import updateSpecStep1              from '../middlewares/updateSpecStep1Api';
import showChosenSkills             from '../middlewares/showChosenSkillsApi';
import updateSpecStep2              from '../middlewares/updateSpecStep2Api';
import showClientData               from '../middlewares/showClientDataApi';
import showSpecialistData           from '../middlewares/showSpecialistDataApi';
import updateSpecialistProfile      from '../middlewares/updateSpecialistProfileApi';
import updateSpecialistAvailability from '../middlewares/updateSpecialistAvailabilityApi';
import updateSpecialistInfo         from '../middlewares/updateSpecialistInfoApi';
import editEducation                from '../middlewares/education/editEducationApi';
import editExperience               from '../middlewares/experience/editExperienceApi';
import deleteEducation              from '../middlewares/education/deleteEducationApi';
import deleteExperience             from '../middlewares/experience/deleteExperienceApi';
import updateClientData             from '../middlewares/updateClientDataApi';

const enhancer = applyMiddleware(
    contactRequest,
    signUp,
    getUserIdByTokenConfirmation,
    verification,
    changePassword,
    deleteConfirmationToken,
    signIn,
    getEmailForResetPassword,
    getPasswordsForResetPassword,
    welcomeClient,
    getIndustires,
    getProjectTypes,
    updateSpecStep1,
    showChosenSkills,
    updateSpecStep2,
    showClientData,
    showSpecialistData,
    updateSpecialistProfile,
    updateSpecialistAvailability,
    updateSpecialistInfo,
    editEducation,
    editExperience,
    deleteEducation,
    deleteExperience,
    updateClientData,
);

let reduxDevTools = process.env.NODE_ENV === 'development'
                    ? window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
                    : window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(); // before production {}


const store = createStore(reducer, reduxDevTools, enhancer);

process.env.NODE_ENV === 'development' ? (window.store = store) : null;

export default store;

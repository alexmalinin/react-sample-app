import { createStore, applyMiddleware } from 'redux';

import reducer                      from '../reducers/rootReducer';
import contactRequest               from '../middlewares/contactRequestApi';
import signUp                       from '../middlewares/signUpApi';
import getUserIdByTokenConfirmation from '../middlewares/getUserIdByTokenConfirmationApi';
import deleteConfirmationToken      from '../middlewares/deleteConfirmationTokenApi';
import verification                 from '../middlewares/verificationApi';
import signIn                       from '../middlewares/signInApi';
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
import deleteExperienceApi          from '../middlewares/deleteExperienceApi';
import updateClientData             from '../middlewares/updateClientDataApi';

const enhancer = applyMiddleware(
    contactRequest,
    signUp,
    getUserIdByTokenConfirmation,
    verification,
    deleteConfirmationToken,
    signIn,
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
    deleteExperienceApi,
    updateClientData,
);

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), enhancer);

process.env.NODE_ENV === 'development' ? (window.store = store) : null;

export default store;

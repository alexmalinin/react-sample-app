import { createStore, applyMiddleware } from 'redux';

import reducer from '../reducers/rootReducer';
import contactRequest from '../middlewares/contactRequestApi';
import signUp from '../middlewares/signUpApi';
import getUserIdByTokenConfirmation from '../middlewares/getUserIdByTokenConfirmationApi';
import deleteConfirmationToken from '../middlewares/deleteConfirmationTokenApi';
import verification from '../middlewares/verificationApi';
import signIn from '../middlewares/signInApi';
import welcomeClient from '../middlewares/welcomeClientApi';
import getIndustires from '../middlewares/getIndustiresApi';
import updateSpecStep2 from '../middlewares/updateSpecStep2Api';
import showChosenSkills from '../middlewares/showChosenSkillsApi';
import updateSpecStep3 from '../middlewares/updateSpecStep3Api';
import showClientData from '../middlewares/showClientDataApi';
import showSpecialistData from '../middlewares/showSpecialistDataApi';

const enhancer = applyMiddleware(
    contactRequest,
    signUp,
    getUserIdByTokenConfirmation,
    verification,
    deleteConfirmationToken,
    signIn,
    welcomeClient,
    getIndustires,
    updateSpecStep2,
    showChosenSkills,
    updateSpecStep3,
    showClientData,
    showSpecialistData,
);

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), enhancer);

process.env.NODE_ENV === 'development' ? (window.store = store) : null;

export default store;

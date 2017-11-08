import { createStore, applyMiddleware } from 'redux';

import reducer from '../reducers/rootReducer';
import contactRequestApi from '../middlewares/contactRequestApi';
import signUpApi from '../middlewares/signUpApi';
import getUserIdByTokenConfirmation from '../middlewares/getUserIdByTokenConfirmationApi';
import verificationApi from '../middlewares/verificationApi';
import signInApi from '../middlewares/signInApi';
import welcomeClientApi from '../middlewares/welcomeClientApi';
import getIndustiresApi from '../middlewares/getIndustiresApi';
import updateSpecStep2Api from '../middlewares/updateSpecStep2Api';
import showChosenSkillsApi from '../middlewares/showChosenSkillsApi';
import updateSpecStep3Api from '../middlewares/updateSpecStep3Api';
import showClientDataApi from '../middlewares/showClientDataApi';
import showSpecialistDataApi from '../middlewares/showSpecialistDataApi';

const enhancer = applyMiddleware(
    contactRequestApi,
    signUpApi,
    getUserIdByTokenConfirmation,
    verificationApi,
    signInApi,
    welcomeClientApi,
    getIndustiresApi,
    updateSpecStep2Api,
    showChosenSkillsApi,
    updateSpecStep3Api,
    showClientDataApi,
    showSpecialistDataApi,
);

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), enhancer);

process.env.NODE_ENV === 'development' ? (window.store = store) : null;

export default store;

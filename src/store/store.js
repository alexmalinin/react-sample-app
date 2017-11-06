import { createStore, applyMiddleware } from 'redux';
import axios from 'axios';

import reducer from '../reducers/rootReducer';
import logger from '../middlewares/logger';
import contactRequestApi from '../middlewares/contactRequestApi';
import signUpApi from '../middlewares/signUpApi';
import getUserIdByTokenConfirmation from '../middlewares/getUserIdByTokenConfirmationApi';
import verificationApi from '../middlewares/verificationApi';
import signInApi from '../middlewares/signInApi';
import welcomeClientApi from '../middlewares/welcomeClientApi';
import getIndustiresApi from '../middlewares/getIndustiresApi';
import updateSpecStep2Api from '../middlewares/updateSpecStep2Api';
import updateSpecStep3Api from '../middlewares/updateSpecStep3Api';

const enhancer = applyMiddleware(
    // logger,
    contactRequestApi,
    signUpApi,
    getUserIdByTokenConfirmation,
    verificationApi,
    signInApi,
    welcomeClientApi,
    getIndustiresApi,
    updateSpecStep2Api,
    updateSpecStep3Api,
);

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), enhancer);

process.env.NODE_ENV === 'development' ? (window.store = store) : null;

export default store;

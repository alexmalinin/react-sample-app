import { createStore, applyMiddleware } from 'redux';
import axios from 'axios';

import reducer from '../reducers/rootReducer';
import logger from '../middlewares/logger';
import contactRequestApi from '../middlewares/contactRequestApi';
import signUpApi from '../middlewares/signUpApi';
import getUserIdByTokenConfirmation from '../middlewares/getUserIdByTokenConfirmationApi';
import verificationApi from '../middlewares/verificationApi';
const enhancer = applyMiddleware(
    // logger,
    contactRequestApi,
    signUpApi,
    getUserIdByTokenConfirmation,
    verificationApi,
);

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), enhancer);

process.env.NODE_ENV === 'development' ? (window.store = store) : null;

export default store;

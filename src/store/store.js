import { createStore, applyMiddleware } from 'redux';

import reducer from '../reducers/rootReducer';
import logger from '../middlewares/logger';
import contactRequestApi from '../middlewares/contactRequestApi';
const enhancer = applyMiddleware(
    logger,
    contactRequestApi,
);

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), enhancer);

process.env.NODE_ENV === 'development' ? (window.store = store) : null;

export default store;

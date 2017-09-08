import { createStore, applyMiddleware } from 'redux';
import reducer from '../reducers/rootReducer';
import logger from '../middlewares/logger';
const enhancer = applyMiddleware(
    logger
);

const store = createStore(reducer, {}, enhancer);

process.env.NODE_ENV === 'development' ? (window.store = store) : null;

export default store;

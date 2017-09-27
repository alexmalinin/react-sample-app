import { combineReducers } from 'redux';
// import { reducer as formReducer } from 'redux-form'
import { reducer as reduxFormReducer } from 'redux-form';


import changeUserType from './changeUserType';
import contactRequest from './contactRequest';

export default combineReducers({
    changeUserType,
    contactRequest,
    form: reduxFormReducer,
});

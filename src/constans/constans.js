export const PORT =
    process.env.NODE_ENV === 'development'
        ? process.env.REACT_APP_API_HOST
        : process.env.REACT_APP_API_PROD;

export const HIDE_FOOTER                    = 'HIDE_FOOTER';
export const SIDEBAR                        = 'SIDEBAR';
export const SIGN_UP_STEP_1                 = 'SIGN_UP_STEP_1';
export const CHANGE_USER_TYPE               = 'CHANGE_USER_TYPE';
export const SIGN_IN                        = 'SIGN_IN';
export const GET_USER_ID                    = 'GET_USER_ID';
export const VERIFICATION                   = 'VERIFICATION';
export const DELETE_CONFIRMATION_TOKEN      = 'DELETE_CONFIRMATION_TOKEN';
export const CONFIRM_PASSWORDS              = 'CONFIRM_PASSWORDS';
export const WELCOME_CLIENT                 = 'WELCOME_CLIENT';
export const GET_INDUSTRIES                 = 'GET_INDUSTRIES';
export const UPDATE_SPECIALIST_STEP_1       = 'UPDATE_SPECIALIST_STEP_1';
export const SHOW_CHOSEN_SKILLS             = 'SHOW_CHOSEN_SKILLS';
export const EDUCATION                      = 'EDUCATION';
export const WORK_EXPERIENCE                = 'WORK_EXPERIENCE';
export const GET_PROJECT_TYPES              = 'GET_PROJECT_TYPES';
export const UPDATE_SPECIALIST_STEP_2       = 'UPDATE_SPECIALIST_STEP_2';
export const SHOW_CLIENT_DATA               = 'SHOW_CLIENT_DATA';
export const SHOW_SPECIALIST_DATA           = 'SHOW_SPECIALIST_DATA';
export const UPDATE_SPECIALIST_PROFILE      = 'UPDATE_SPECIALIST_PROFILE';
export const UPDATE_SPECIALIST_AVAILABILITY = 'UPDATE_SPECIALIST_AVAILABILITY';
export const UPDATE_CLIENT_PROFILE          = 'UPDATE_CLIENT_PROFILE';

export const SUCCESS                        = '_SUCCESS';
export const FAIL                           = '_FAIL';
export const PORT =
    process.env.NODE_ENV === 'development'
        ? process.env.REACT_APP_API_HOST
        : process.env.REACT_APP_API_PROD;

export const HIDE_FOOTER = 'HIDE_FOOTER';
export const SIGN_UP_STEP_1 = 'SIGN_UP_STEP_1';
export const CHANGE_USER_TYPE = 'CHANGE_USER_TYPE';
export const SIGN_IN = 'SIGN_IN';
export const GET_USER_ID = 'GET_USER_ID';
export const VERIFICATION = 'VERIFICATION';
export const CONFIRM_PASSWORDS = 'CONFIRM_PASSWORDS';
export const WELCOME_CLIENT = 'WELCOME_CLIENT';
export const GET_INDUSTRIES = 'GET_INDUSTRIES';
export const UPDATE_SPECIALIST_STEP_2 = 'UPDATE_SPECIALIST_STEP_2';
export const EDUCATION = 'EDUCATION';
export const WORK_EXPERIENCE = 'WORK_EXPERIENCE';
export const UPDATE_SPECIALIST_STEP_3 = 'UPDATE_SPECIALIST_STEP_3';
export const SHOW_CLIENT_DATA = 'SHOW_CLIENT_DATA';

export const SUCCESS = '_SUCCESS';
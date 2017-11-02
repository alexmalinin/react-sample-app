export const PORT =
    process.env.NODE_ENV === 'development' ? process.env.REACT_APP_API_HOST : 'http://localhost:3000';

export const SIGN_UP_STEP_1 = 'SIGN_UP_STEP_1';
export const CHANGE_USER_TYPE = 'CHANGE_USER_TYPE';
export const SIGN_IN = 'SIGN_IN';
export const GET_USER_ID = 'GET_USER_ID';
export const VERIFICATION = 'VERIFICATION';
export const CONFIRM_PASSWORDS = 'CONFIRM_PASSWORDS';
export const WELCOME_CLIENT = 'WELCOME_CLIENT';
export const EDUCATION = 'EDUCATION';

export const SUCCESS = '_SUCCESS';
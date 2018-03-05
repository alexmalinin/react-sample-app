export const PORT =
    process.env.NODE_ENV === 'development'
        ? process.env.REACT_APP_API_HOST
        : process.env.REACT_APP_API_PROD;

export const HIDE_FOOTER                       = 'HIDE_FOOTER';
export const SIDEBAR                           = 'SIDEBAR';
export const SIGN_UP_STEP_1                    = 'SIGN_UP_STEP_1';
export const RESET_SIGN_UP                     = 'RESET_SIGN_UP';
export const CHANGE_USER_TYPE                  = 'CHANGE_USER_TYPE';
export const SIGN_IN                           = 'SIGN_IN';
export const GET_USER_ID                       = 'GET_USER_ID';
export const VERIFICATION                      = 'VERIFICATION';
export const CHANGE_PASSWORD                   = 'CHANGE_PASSWORD';
export const CONFIRM_PASSWORDS                 = 'CONFIRM_PASSWORDS';
export const DELETE_CONFIRMATION_TOKEN         = 'DELETE_CONFIRMATION_TOKEN';
export const GET_TOKEN_FOR_RESET_PASSWORD      = 'GET_TOKEN_FOR_RESET_PASSWORD';
export const GET_PASSWORDS_FOR_RESET_PASSWORD  = 'GET_PASSWORDS_FOR_RESET_PASSWORD';
export const WELCOME_CLIENT                    = 'WELCOME_CLIENT';
export const GET_INDUSTRIES                    = 'GET_INDUSTRIES';
export const UPDATE_SPECIALIST_STEP_1          = 'UPDATE_SPECIALIST_STEP_1';
export const SHOW_CHOSEN_SKILLS                = 'SHOW_CHOSEN_SKILLS';
export const EDUCATION                         = 'EDUCATION';
export const COMPANY                           = 'COMPANY';
export const BILLING                           = 'BILLING';
export const WORK_EXPERIENCE                   = 'WORK_EXPERIENCE';
export const GET_PROJECT_TYPES                 = 'GET_PROJECT_TYPES';
export const GET_EXPERIENCE_LEVELS             = 'GET_EXPERIENCE_LEVELS';
export const UPDATE_SPECIALIST_STEP_2          = 'UPDATE_SPECIALIST_STEP_2';
export const CLEAR_EDUCATION                   = 'CLEAR_EDUCATION';
export const CLEAR_WORK_EXPERIENCE             = 'CLEAR_WORK_EXPERIENCE';
export const SHOW_CLIENT_DATA                  = 'SHOW_CLIENT_DATA';
export const SHOW_SPECIALIST_DATA              = 'SHOW_SPECIALIST_DATA';
export const UPDATE_SPECIALIST_PROFILE         = 'UPDATE_SPECIALIST_PROFILE';
export const UPDATE_SPECIALIST_AVAILABILITY    = 'UPDATE_SPECIALIST_AVAILABILITY';
export const UPDATE_SPECIALIST_INFO            = 'UPDATE_SPECIALIST_INFO';
export const EDIT_COMPANY_WITH_ID             = 'EDIT_COMPANY_WITH_ID';
export const EDIT_BILLING_WITH_ID             = 'EDIT_BILLING_WITH_ID';
export const EDIT_EDUCATION_CARD_WITH_ID       = 'EDIT_EDUCATION_CARD_WITH_ID';
export const EDIT_EDUCATION_CARD_WITHOUT_ID    = 'EDIT_EDUCATION_CARD_WITHOUT_ID';
export const EDIT_EXPERIENCE_CARD_WITH_ID      = 'EDIT_EXPERIENCE_CARD_WITH_ID';
export const EDIT_EXPERIENCE_CARD_WITHOUT_ID   = 'EDIT_EXPERIENCE_CARD_WITHOUT_ID';
export const DELETE_EDUCATION_CARD_WITH_ID     = 'DELETE_EDUCATION_CARD_WITH_ID';
export const DELETE_EDUCATION_CARD_WITHOUT_ID  = 'DELETE_EDUCATION_CARD_WITHOUT_ID';
export const DELETE_EXPERIENCE_CARD_WITH_ID    = 'DELETE_EXPERIENCE_CARD_WITH_ID';
export const DELETE_EXPERIENCE_CARD_WITHOUT_ID = 'DELETE_EXPERIENCE_CARD_WITHOUT_ID';
export const UPDATE_CLIENT_PROFILE             = 'UPDATE_CLIENT_PROFILE';
export const UPDATE_CLIENT_BUSINESS            = 'UPDATE_CLIENT_BUSINESS';
export const SAVE_CREATED_PROJECT              = 'SAVE_CREATED_PROJECT';
export const SUBMIT_CREATED_PROJECT            = 'SUBMIT_CREATED_PROJECT';

export const SUCCESS                           = '_SUCCESS';
export const FAIL                              = '_FAIL';
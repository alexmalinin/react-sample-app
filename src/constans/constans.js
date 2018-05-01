export const PORT =
    process.env.NODE_ENV === 'development'
        ? process.env.REACT_APP_API_HOST
        : process.env.REACT_APP_API_PROD;

export const IMAGE_PORT = 
    process.env.NODE_ENV === 'development'
        ? process.env.REACT_APP_API_HOST
        : '';

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
export const UPDATE_SPECIALIST_BILLINGS        = 'UPDATE_SPECIALIST_BILLINGS';
export const CLEAR_EDUCATION                   = 'CLEAR_EDUCATION';
export const CLEAR_WORK_EXPERIENCE             = 'CLEAR_WORK_EXPERIENCE';
export const SHOW_CLIENT_DATA                  = 'SHOW_CLIENT_DATA';
export const SHOW_SPECIALIST_DATA              = 'SHOW_SPECIALIST_DATA';
export const SHOW_ALL_SPECIALISTS              = 'SHOW_ALL_SPECIALISTS';
export const SHOW_ALL_PROJECTS                 = 'SHOW_ALL_PROJECTS';
export const SHOW_PROJECT_WITH_ID              = 'SHOW_PROJECT_WITH_ID';
export const UPDATE_SPECIALIST_PROFILE         = 'UPDATE_SPECIALIST_PROFILE';
export const EDIT_COMPANY_WITH_ID              = 'EDIT_COMPANY_WITH_ID';
export const EDIT_BILLING_WITH_ID              = 'EDIT_BILLING_WITH_ID';
export const EDIT_EDUCATION_CARD_WITH_ID       = 'EDIT_EDUCATION_CARD_WITH_ID';
export const EDIT_EDUCATION_CARD_WITHOUT_ID    = 'EDIT_EDUCATION_CARD_WITHOUT_ID';
export const EDIT_EXPERIENCE_CARD_WITH_ID      = 'EDIT_EXPERIENCE_CARD_WITH_ID';
export const EDIT_EXPERIENCE_CARD_WITHOUT_ID   = 'EDIT_EXPERIENCE_CARD_WITHOUT_ID';
export const DELETE_EDUCATION_CARD_WITH_ID     = 'DELETE_EDUCATION_CARD_WITH_ID';
export const DELETE_EDUCATION_CARD_WITHOUT_ID  = 'DELETE_EDUCATION_CARD_WITHOUT_ID';
export const DELETE_EXPERIENCE_CARD_WITH_ID    = 'DELETE_EXPERIENCE_CARD_WITH_ID';
export const DELETE_EXPERIENCE_CARD_WITHOUT_ID = 'DELETE_EXPERIENCE_CARD_WITHOUT_ID';
export const UPDATE_CLIENT_PROFILE             = 'UPDATE_CLIENT_PROFILE';
export const UPDATE_CLIENT_COMPANY             = 'UPDATE_CLIENT_COMPANY';
export const UPDATE_CLIENT_BILLINGS            = 'UPDATE_CLIENT_BILLINGS';
export const SAVE_CREATED_PROJECT              = 'SAVE_CREATED_PROJECT';
export const SUBMIT_CREATED_PROJECT            = 'SUBMIT_CREATED_PROJECT';
export const CREATE_PROJECT_EPIC               = 'CREATE_PROJECT_EPIC';
export const UPDATE_PROJECT_EPIC               = 'UPDATE_PROJECT_EPIC';
export const DELETE_PROJECT_EPIC               = 'DELETE_PROJECT_EPIC';
export const SHOW_ALL_EPICS                    = 'SHOW_ALL_EPICS';
export const SHOW_PROJECT_EPIC                 = 'SHOW_PROJECT_EPIC';
export const CREATE_EPIC_TASK                  = 'CREATE_EPIC_TASK';
export const UPDATE_EPIC_TASK                  = 'UPDATE_EPIC_TASK';
export const SHOW_EPIC_TASKS                   = 'SHOW_EPIC_TASKS';
export const ASSIGN_SPECIALIST_TO_TASK         = 'ASSIGN_SPECIALIST_TO_TASK';
export const REMOVE_SPECIALIST_FROM_TASK       = 'REMOVE_SPECIALIST_FROM_TASK';
export const SHOW_ALL_TEAMS                    = 'SHOW_ALL_TEAMS';
export const CREATE_CHANNEL                    = 'CREATE_CHANNEL';
export const DELETE_CHANNEL                    = 'DELETE_CHANNEL';
export const UPDATE_CHANNEL                    = 'UPDATE_CHANNEL';
export const SHOW_CHANNELS                     = 'SHOW_CHANNELS';
export const ADD_MEMBER_TO_CHANNEL             = 'ADD_MEMBER_TO_CHANNEL';
export const REMOVE_MEMBER_FROM_CHANNEL        = 'REMOVE_MEMBER_FROM_CHANNEL';

export const SUCCESS                           = '_SUCCESS';
export const FAIL                              = '_FAIL';

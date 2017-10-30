import { PORT, SIGN_UP_STEP_1, CHANGE_USER_TYPE, SIGN_IN } from '../constans/constans'

export function userType(user) {
    const action = {
        type: CHANGE_USER_TYPE,
        user,
    };

    return action;
}

export function postContacts(contacts) {
    const { first_name, last_name, email, message } = contacts;
    const action = {
        type: 'CONTACTS',
        contactRequest: `${PORT}api/v1/contact_requests`,
        first_name,
        last_name,
        email,
        message,
    };

    return action;
}

// export function postSignUp(data) {
//     const { first_name, last_name, email, message } = data;
//     const action = {
//         type: 'CONTACTS',
//         contactRequest: `${PORT}api/v1/contact_requests`,
//         first_name,
//         last_name,
//         email,
//         message,
//     };
//
//     return action;
// }

export function signIn(data) {
    const { first_name, last_name } = data;
    const action = {
        type: SIGN_IN,
        first_name,
        last_name,
    };
    return action;
}

// Client

export function postSignUpData(user, data) {
    const action = {
        type: SIGN_UP_STEP_1,
        user,
        payload: data,
        signUp: `${PORT}/api/v1/customers`,
    };
    return action;
}



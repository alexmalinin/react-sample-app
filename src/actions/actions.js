import { PORT } from '../constans/constans'

export function userType(user) {
    const action = {
        type: 'CHANGE_USER_TYPE',
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

export function signIn(data) {
    const { first_name, last_name } = data;
    const action = {
        type: 'SIGN_IN',
        first_name,
        last_name,
    };
    console.log(action);
    return action;
}



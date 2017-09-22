export function userType(user) {
    const action = {
        type: 'CHANGE_USER_TYPE',
        user,
    };

    return action;
}

export function postContacts(contacts) {
    const {name, surname, email, message} = contacts;
    const action = {
        type: 'CONTACTS',
        contactRequest: '/api/v1/contact_requests',
        name,
        surname,
        email,
        message,

    };
    return action;
}

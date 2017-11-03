import { PORT,
         SIGN_UP_STEP_1,
         CHANGE_USER_TYPE,
         SIGN_IN,
         VERIFICATION,
         GET_USER_ID,
         WELCOME_CLIENT,
         EDUCATION,
         WORK_EXPERIENCE
} from '../constans/constans'

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


export function signIn(user, data) {
    const action = {
        type: SIGN_IN,
        payload: data,
        signIn: `${PORT}/api/v1/${user}_token`
    };

    return action;
}

// Client and Specialist signUp step 1

export function postSignUpData(user, data) {
    const action = {
        type: SIGN_UP_STEP_1,
        user,
        payload: data,
        signUp: `${PORT}/api/v1/${user}`,
    };

    return action;
}

// Get User Id by confirmation token

export function getUserId (user, token) {
    const action = {
        type: GET_USER_ID,
        user,
        userConfirmationToken: `${PORT}/api/v1/${user}/${token}`,
    };

    return action;
}

// Client and Specialist Verification

export function verifyPassword (user, id, data) {
    const action = {
        type: VERIFICATION,
        user,
        payload: data,
        verification: `${PORT}/api/v1/${user}/${id}`,
    };

    return action;
}

// Client Welcome

export function welcomeClient (data) {
    const action = {
        type: WELCOME_CLIENT,
        payload: data,
        welcomeClient: `${PORT}/api/v1/customers/`,
    };

    return action;
}

// education action

export function education (data) {
    const action = {
        type: EDUCATION,
        payload: data,
    };

    return action;
}

// workExperience action

export function workExperience (data) {
    const action = {
        type: WORK_EXPERIENCE,
        payload: data,
    };

    return action;
}





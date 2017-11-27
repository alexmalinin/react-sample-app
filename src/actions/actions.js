import {
    PORT,
    HIDE_FOOTER,
    SIDEBAR,
    SIGN_UP_STEP_1,
    CHANGE_USER_TYPE,
    SIGN_IN,
    GET_TOKEN_FOR_RESET_PASSWORD,
    GET_PASSWORDS_FOR_RESET_PASSWORD,
    VERIFICATION,
    DELETE_CONFIRMATION_TOKEN,
    GET_USER_ID,
    WELCOME_CLIENT,
    GET_INDUSTRIES,
    UPDATE_SPECIALIST_STEP_1,
    EDUCATION,
    WORK_EXPERIENCE,
    SHOW_CHOSEN_SKILLS,
    GET_PROJECT_TYPES,
    UPDATE_SPECIALIST_STEP_2,
    SHOW_CLIENT_DATA,
    SHOW_SPECIALIST_DATA,
    UPDATE_SPECIALIST_PROFILE,
    UPDATE_SPECIALIST_AVAILABILITY,
    UPDATE_SPECIALIST_INFO,
    EDIT_EDUCATION_CARD_WITH_ID,
    EDIT_EDUCATION_CARD_WITHOUT_ID,
    EDIT_EXPERIENCE_CARD_WITH_ID,
    EDIT_EXPERIENCE_CARD_WITHOUT_ID,
    DELETE_EDUCATION_CARD_WITH_ID,
    DELETE_EDUCATION_CARD_WITHOUT_ID,
    DELETE_EXPERIENCE_CARD_WITH_ID,
    DELETE_EXPERIENCE_CARD_WITHOUT_ID,
    UPDATE_CLIENT_PROFILE,
} from '../constans/constans'

export function hideFooter() {
    const action = {
        type: HIDE_FOOTER,
    };

    return action;
}

// show/hide mobile menu

export function toggleSidebar() {
    const action = {
        type: SIDEBAR,
    };

    return action;
}

export function userType(user) {
    const action = {
        type: CHANGE_USER_TYPE,
        user,
    };

    return action;
}

export function postContacts(data) {
    const action = {
        type: 'CONTACTS',
        payload: data,
        contactRequest: `${PORT}api/v1/contact_requests`,
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

// Forgot Password action

export function getTokenForResetPassword(email, user) {
    const action = {
        type: GET_TOKEN_FOR_RESET_PASSWORD,
        payload: email,
        getTokenForResetPassword: `${PORT}/api/v1/${user}/password_request`
    };

    return action;
}

export function getPasswordsForResetPassword(passwords, user, token) {
    const action = {
        type: GET_PASSWORDS_FOR_RESET_PASSWORD,
        payload: passwords,
        getPasswordsForResetPassword: `${PORT}/api/v1/${user}/password_reset/${token}`
    }

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

// Client and Specialist get request to API for deleting confirmation token

export function deleteConfirmationToken (user, token) {
    const action = {
        type: DELETE_CONFIRMATION_TOKEN,
        deleteConfirmationToken: `${PORT}/api/v1/${user}/confirmation/${token}`,
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

// get Industries for specialists sign up step 2

export function getIndustries() {
    const action = {
        type: GET_INDUSTRIES,
        getIndustries: `${PORT}/api/v1/industry_areas`,
    };

    return action;
}

// Get all project types

export function getProjectTypes() {
    const action = {
        type: GET_PROJECT_TYPES,
        getProjectTypes: `${PORT}/api/v1/project_types`,
    };

    return action;
}

// update data for specialists sign up step 2

export function updateSpecStep1(data) {
    const action = {
        type: UPDATE_SPECIALIST_STEP_1,
        payload: data,
        updateSpecStep1: `${PORT}/api/v1/specialists/`,
    };

    return action;
}

// get chosen skills

export function showChosenSkills(){
    const action = {
        type: SHOW_CHOSEN_SKILLS,
        showChosenSkills: `${PORT}/api/v1/specialists/`,
    };
    return action;
}

// update data for specialists sign up step 3

export function updateSpecStep2(data, education, experience) {
    const action = {
        type: UPDATE_SPECIALIST_STEP_2,
        payload: data,
        education,
        experience,
        updateSpecStep2: `${PORT}/api/v1/specialists/`,
    };

    return action;
}

// Show client Data Profile

export function showClientData() {
    const action = {
        type: SHOW_CLIENT_DATA,
        showClientData: `${PORT}/api/v1/customers/`,
    };

    return action;
}

// Show specialist Data Profile

export function showSpecialistData() {
    const action = {
        type: SHOW_SPECIALIST_DATA,
        showSpecialistData: `${PORT}/api/v1/specialists/`,
    };

    return action;
}

// update Specialist Data Profile

export function updateSpecialistProfile(data) {
    const action = {
        type: UPDATE_SPECIALIST_PROFILE,
        payload: data,
        updateSpecialistProfile1: `${PORT}/api/v1/specialists/`,
        updateSpecialistProfile2: '/dashboard/profile'
    };

    return action;
}

// update Specialist Data Availability

export function updateSpecialistAvailability(data) {
    const action = {
        type: UPDATE_SPECIALIST_AVAILABILITY,
        payload: data,
        updateSpecialistAvailability1: `${PORT}/api/v1/specialists/`,
        updateSpecialistAvailability2: '/dashboard/availability'
    };

    return action;
}

export function updateSpecialistInfo(data, education, experience) {
    const action = {
        type: UPDATE_SPECIALIST_INFO,
        payload: data,
        education,
        experience,
        updateSpecialistInfo: `${PORT}/api/v1/specialists/`,
    };

    return action;
}

// edit education data card

export function editEducationCardWithId(data, id) {
    const action = {
        type: EDIT_EDUCATION_CARD_WITH_ID,
        payload: data,
        editEducationCard1: `${PORT}/api/v1/specialists/`,
        editEducationCard2: `/educations/${id}`
    };

    return action;
}

export function editEducationCardWithOutId(education, id) {
    const action = {
        type: EDIT_EDUCATION_CARD_WITHOUT_ID,
        payload: education,
        id: id,
    };

    return action;
}

// edit work experience data card

export function editExperienceCardWithId(experience, id) {
    const action = {
        type: EDIT_EXPERIENCE_CARD_WITH_ID,
        payload: experience,
        editExperienceCard1: `${PORT}/api/v1/specialists/`,
        editExperienceCard2: `/experiences/${id}`
    };

    return action;
}

export function editExperienceCardWithOutId(experience, id) {
    const action = {
        type: EDIT_EXPERIENCE_CARD_WITHOUT_ID,
        id: id,
        payload: experience,
    };

    return action;
}

// delete education data card

export function deleteEducationCardWithId(id) {
    const action = {
        type: DELETE_EDUCATION_CARD_WITH_ID,
        deleteEducationCard1: `${PORT}/api/v1/specialists/`,
        deleteEducationCard2: `/educations/${id}`
    };

    return action;
}

export function deleteEducationCardWithOutId(education) {
    const action = {
        type: DELETE_EDUCATION_CARD_WITHOUT_ID,
        payload: education,
    };

    return action;
}


// delete work experience data card

export function deleteExperienceCardWithId(id) {
    const action = {
        type: DELETE_EXPERIENCE_CARD_WITH_ID,
        deleteExperienceCard1: `${PORT}/api/v1/specialists/`,
        deleteExperienceCard2: `/experiences/${id}`
    };

    return action;
}

export function deleteExperienceCardWithOutId(experience) {
    const action = {
        type: DELETE_EXPERIENCE_CARD_WITHOUT_ID,
        payload: experience,
    };

    return action;
}

// update Client Data Profile

export function updateClientProfile(data) {
    const action = {
        type: UPDATE_CLIENT_PROFILE,
        payload: data,
        updateClientProfile1: `${PORT}/api/v1/customers/`,
        updateClientProfile2: '/dashboard/profile'
    };

    return action;
}
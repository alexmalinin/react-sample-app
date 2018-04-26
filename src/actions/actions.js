import {
    PORT,
    HIDE_FOOTER,
    SIDEBAR,
    SIGN_UP_STEP_1,
    RESET_SIGN_UP,
    CHANGE_USER_TYPE,
    SIGN_IN,
    GET_TOKEN_FOR_RESET_PASSWORD,
    GET_PASSWORDS_FOR_RESET_PASSWORD,
    VERIFICATION,
    CHANGE_PASSWORD,
    DELETE_CONFIRMATION_TOKEN,
    GET_USER_ID,
    WELCOME_CLIENT,
    GET_INDUSTRIES,
    UPDATE_SPECIALIST_STEP_1,
    EDUCATION,
    COMPANY,
    BILLING,
    WORK_EXPERIENCE,
    SHOW_CHOSEN_SKILLS,
    GET_PROJECT_TYPES,
    GET_EXPERIENCE_LEVELS,
    UPDATE_SPECIALIST_STEP_2,
    UPDATE_SPECIALIST_BILLINGS,
    CLEAR_EDUCATION,
    CLEAR_WORK_EXPERIENCE,
    SHOW_CLIENT_DATA,
    SHOW_SPECIALIST_DATA,
    UPDATE_SPECIALIST_PROFILE,
    EDIT_BILLING_WITH_ID,
    EDIT_COMPANY_WITH_ID,
    EDIT_EDUCATION_CARD_WITH_ID,
    EDIT_EDUCATION_CARD_WITHOUT_ID,
    EDIT_EXPERIENCE_CARD_WITH_ID,
    EDIT_EXPERIENCE_CARD_WITHOUT_ID,
    DELETE_EDUCATION_CARD_WITH_ID,
    DELETE_EDUCATION_CARD_WITHOUT_ID,
    DELETE_EXPERIENCE_CARD_WITH_ID,
    DELETE_EXPERIENCE_CARD_WITHOUT_ID,
    UPDATE_CLIENT_PROFILE,
    UPDATE_CLIENT_COMPANY,
    UPDATE_CLIENT_BILLINGS,
    SAVE_CREATED_PROJECT,
    SUBMIT_CREATED_PROJECT,
    SHOW_ALL_PROJECTS,
    SHOW_PROJECT_WITH_ID,
    CREATE_PROJECT_EPIC,
    SHOW_ALL_EPICS,
    DELETE_PROJECT_EPIC,
    UPDATE_PROJECT_EPIC,
    CREATE_EPIC_TASK,
    SHOW_PROJECT_EPIC,
    SHOW_EPIC_TASKS,
    UPDATE_EPIC_TASK,
    SHOW_ALL_SPECIALISTS,
    ASSIGN_SPECIALIST_TO_TASK,
    REMOVE_SPECIALIST_FROM_TASK,
    SHOW_ALL_TEAMS,
    CREATE_CHANNEL,
    SHOW_CHANNELS,
    ADD_MEMBER_TO_CHANNEL,
    REMOVE_MEMBER_FROM_CHANNEL,
    UPDATE_CHANNEL,
    DELETE_CHANNEL,
    ASSIGN_SPECIALIST_TO_TEAM,
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

// Reset signUpData;

export function resetSignUpData() {
    const action = {
        type: RESET_SIGN_UP,
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

export function getUserId(user, token) {
    const action = {
        type: GET_USER_ID,
        user,
        userConfirmationToken: `${PORT}/api/v1/${user}/${token}`,
    };

    return action;
}

// Client and Specialist get request to API for deleting confirmation token

export function deleteConfirmationToken(user, token) {
    const action = {
        type: DELETE_CONFIRMATION_TOKEN,
        deleteConfirmationToken: `${PORT}/api/v1/${user}/confirmation/${token}`,
    };

    return action;
}

// Client and Specialist Verification

export function verifyPassword(user, id, data) {
    const action = {
        type: VERIFICATION,
        user,
        payload: data,
        verification: `${PORT}/api/v1/${user}/${id}`,
    };

    return action;
}

// Client and Specialist change password

export function changePassword(data, user) {
    const action = {
        type: CHANGE_PASSWORD,
        payload: data,
        user,
        changePassword1: `${PORT}/api/v1/${user + 's'}/`,
        changePassword2: '/dashboard/password',
    };

    return action;
}

// Client Welcome

export function welcomeClient(data) {
    const action = {
        type: WELCOME_CLIENT,
        payload: data,
        welcomeClient: `${PORT}/api/v1/customers/`,
    };

    return action;
}

// company action

export function company(data) {
  const action = {
    type: COMPANY,
    payload: data,
  };

  return action;
}

// billing action

export function billing(data) {
  const action = {
    type: BILLING,
    payload: data,
  };

  return action;
}


// education action

export function education(data) {
    const action = {
        type: EDUCATION,
        payload: data,
    };

    return action;
}

export function clearEducation() {
    const action = {
        type: CLEAR_EDUCATION
    }

    return action;
}

// workExperience action

export function workExperience(data) {
    const action = {
        type: WORK_EXPERIENCE,
        payload: data,
    };

    return action;
}

export function clearworkExperience() {
    const action = {
        type: CLEAR_WORK_EXPERIENCE
    }

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

// Get all experience levels

export function getExperienceLevels() {

  const action = {
    type: GET_EXPERIENCE_LEVELS,
    getExperienceLevels: `${PORT}/api/v1/experience_levels`,
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

export function updateSpecStep2(data) {
    const action = {
        type: UPDATE_SPECIALIST_STEP_2,
        payload: data,
        updateSpecStep2: `${PORT}/api/v1/specialists/`,
    };

    return action;
}

// update specialist billings

export function updateSpecialistBillings(data) {
    const action = {
        type: UPDATE_SPECIALIST_BILLINGS,
        payload: data,
        updateSpecialistBillings: `${PORT}/api/v1/specialists/`,
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

// Show all specialists

export function showAllSpecialists() {
    const action = {
        type: SHOW_ALL_SPECIALISTS,
        showAllSpecialists: `${PORT}/api/v1/specialists`,
    };

    return action;
}

// update Specialist Data Profile

export function updateSpecialistProfile(data, education, experience) {
    const action = {
        type: UPDATE_SPECIALIST_PROFILE,
        payload: data,
        education,
        experience,
        updateSpecialistProfile1: `${PORT}/api/v1/specialists/`,
        updateSpecialistProfile2: '/dashboard/profile'
    };

    return action;
}

// edit company

export function editCompany(data) {
  const action = {
    type: EDIT_COMPANY_WITH_ID,
    payload: data,
    editCompany: `${PORT}/api/v1/specialists/`
  };

  return action;
}

// edit billing

export function editBillingWithId(data, id) {
  const action = {
    type: EDIT_BILLING_WITH_ID,
    payload: data,
    editBilliny: `${PORT}/api/v1/specialists/billings/`
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

// update Client Data Company

export function updateClientCompany(data) {
    const action = {
        type: UPDATE_CLIENT_COMPANY,
        payload: data,
        updateClientCompany: `${PORT}/api/v1/customers/`,
    };

    return action;
}

// update Client Billing

export function updateClientBilling(data) {
    const action = {
        type: UPDATE_CLIENT_BILLINGS,
        payload: data,
        updateClientBilling: `${PORT}/api/v1/customers/`,
    };

    return action;
}

// post a Project

export function saveCreatedProgect(data) {
    const action = {
        type: SAVE_CREATED_PROJECT,
        payload: data,
        saveCreatedProgect: `${PORT}/api/v1/projects`
    };

    return action;
}

// submit a Project

export function submitCreatedProgect(data) {
    const action = {
        type: SUBMIT_CREATED_PROJECT,
        payload: data,
        submitCreatedProgect: `${PORT}/api/v1/projects`
    };

    return action;
}

// get array of all projects (include unsubmitted)

export function showAllProjects() {
    const action = {
        type: SHOW_ALL_PROJECTS,
        showAllProjects: `${PORT}/api/v1/projects?customer_id=`,
    };

    return action;
}

// get project by id

export function showProjectWithId(id) {
    const action = {
        type: SHOW_PROJECT_WITH_ID,
        id,
        showProjectWithId: `${PORT}/api/v1/projects/`,
    };

    return action;
}

// post project Epic

export function createProjectEpic(data, project) {
    const action = {
        type: CREATE_PROJECT_EPIC,
        payload: data,
        project,
        createProjectEpic: `${PORT}/api/v1/projects/`,
    };

    return action;
}

// update project Epic

export function updateProjectEpic(data, project) {
    const action = {
        type: UPDATE_PROJECT_EPIC,
        payload: data,
        updateProjectEpic: `${PORT}/api/v1/projects/${data.project_id}/epics/${data.id}`,
    };

    return action;
}

// delete Epic by project and id

export function deleteProjectEpic(project, id) {
    const action = {
        type: DELETE_PROJECT_EPIC,
        deleteProjectEpic: `${PORT}/api/v1/projects/${project}/epics/${id}`,
    };

    return action;
}

// get array of all projects (include unsubmitted)

export function showAllEpics(project) {
    const action = {
        type: SHOW_ALL_EPICS,
        showAllEpics: `${PORT}/api/v1/epics?project_id=${project}`,
    };

    return action;
}

// show epic with id

export function showProjectEpic(project, epic) {
    const action = {
        type: SHOW_PROJECT_EPIC,
        showProjectEpic: `${PORT}/api/v1/projects/${project}/epics/${epic}`,
    };

    return action;
}

// create task by project and epic

export function createEpicTask(data, epic) {
    const action = {
        type: CREATE_EPIC_TASK,
        payload: data,
        epic,
        createEpicTask: `${PORT}/api/v1/epics/${epic}/tasks`,
    };

    return action;
}

// update task by epic

export function updateEpicTask(data, epic, task) {
    const action = {
        type: UPDATE_EPIC_TASK,
        payload: data,
        updateEpicTask: `${PORT}/api/v1/epics/${epic}/tasks/${task}`,
    };

    return action;
}

// show all tasks by epic

export function showEpicTasks(epic) {
    const action = {
        type: SHOW_EPIC_TASKS,
        showEpicTasks: `${PORT}/api/v1/epics/${epic}/tasks`,
    };

    return action;
}

export function assignSpecialistToTask(epic, task, data) {
    const action = {
        type: ASSIGN_SPECIALIST_TO_TASK,
        payload: data,
        assignSpecialistToTask: `${PORT}/api/v1/epics/${epic}/tasks/${task}/assign`,
    };

    return action;
}

export function removeSpecialistFromTask(epic, task, data) {
    const action = {
        type: REMOVE_SPECIALIST_FROM_TASK,
        removeSpecialistFromTask: `${PORT}/api/v1/epics/${epic}/tasks/${task}/remove/${data}`,
    };

    return action;
}

// Show all Teams

export function showAllTeams() {
    const action = {
        type: SHOW_ALL_TEAMS,
        showAllTeams: `${PORT}/api/v1/teams`,
    };

    return action;
}

// Assign specialist to team

export function assignSpecialistToTeam(project, team, data) {
    const action = {
        type: ASSIGN_SPECIALIST_TO_TEAM,
        payload: data,
        assignSpecialistToTeam: `${PORT}/api/v1/projects/${project}/teams/${team}/assign`,
    };

    return action;
}

// Create team channel

export function createTeamChannel(team, data) {
    const action = {
        type: CREATE_CHANNEL,
        payload: data,
        createTeamChannel: `${PORT}/api/v1/teams/${team}/channels`,
    };

    return action;
}

// Delete team channel

export function deleteTeamChannel(team, channel) {
    const action = {
        type: DELETE_CHANNEL,
        deleteTeamChannel: `${PORT}/api/v1/teams/${team}/channels/${channel}`,
    };

    return action;
}

//Update team channel

export function updateTeamChannel(team, channel, data) {
    const action = {
        type: UPDATE_CHANNEL,
        payload: data,
        updateTeamChannel: `${PORT}/api/v1/teams/${team}/channels/${channel}`,
    };

    return action;
}

// Show all chanels of team

export function showChannels(team) {
    const action = {
        type: SHOW_CHANNELS,
        showChannels: `${PORT}/api/v1/teams/${team}/channels`,
    };

    return action;
}

// Add member to team channel

export function addToChannel(team, channel, data) {
    const action = {
        type: ADD_MEMBER_TO_CHANNEL,
        payload: data,
        addToChannel: `${PORT}/api/v1/teams/${team}/channels/${channel}/assign`,
    };

    return action;
}

// Remove member from channel

export function removeFromChannel(team, channel, id) {
    const action = {
        type: REMOVE_MEMBER_FROM_CHANNEL,
        removeFromChannel: `${PORT}/api/v1/teams/${team}/channels/${channel}/remove/${id}`,
    };

    return action;
}

import { createStore, applyMiddleware } from 'redux';

import reducer                      from '../reducers/rootReducer';
import contactRequest               from '../middlewares/contactRequestApi';
import signUp                       from '../middlewares/signUpApi';
import getUserIdByTokenConfirmation from '../middlewares/getUserIdByTokenConfirmationApi';
import deleteConfirmationToken      from '../middlewares/deleteConfirmationTokenApi';
import verification                 from '../middlewares/verificationApi';
import changePassword               from '../middlewares/passwords/changePasswordApi';
import signIn                       from '../middlewares/signInApi';
import getEmailForResetPassword     from '../middlewares/passwords/getEmailForResetPasswordApi';
import getPasswordsForResetPassword from '../middlewares/passwords/getPasswordsForResetPasswordApi';
import welcomeClient                from '../middlewares/welcomeClientApi';
import getIndustires                from '../middlewares/getIndustiresApi';
import getProjectTypes              from '../middlewares/getProjectTypesApi';
import getExperienceLevels          from '../middlewares/getExperienceLevelsApi';
import updateSpecStep1              from '../middlewares/updateSpecStep1Api';
import showChosenSkills             from '../middlewares/showChosenSkillsApi';
import updateSpecStep2              from '../middlewares/updateSpecStep2Api';
import updateSpecialistBillings     from '../middlewares/updateSpecialistBillingApi';
import showClientData               from '../middlewares/showClientDataApi';
import showSpecialistData           from '../middlewares/showSpecialistDataApi';
import updateSpecialistProfile      from '../middlewares/updateSpecialistProfileApi';
import editEducation                from '../middlewares/education/editEducationApi';
import editCompany                  from '../middlewares/company/editCompanyApi';
import editBilling                  from '../middlewares/billing/editBillingApi';
import editExperience               from '../middlewares/experience/editExperienceApi';
import deleteEducation              from '../middlewares/education/deleteEducationApi';
import deleteExperience             from '../middlewares/experience/deleteExperienceApi';
import updateClientProfile          from '../middlewares/updateClientProfileApi';
import updateClientCompany          from '../middlewares/updateClientCompanyApi';
import updateClientBilling          from '../middlewares/updateClientBillingApi';
import saveCreatedProject           from '../middlewares/createProjectApi';
import showAllProjects              from '../middlewares/showAllProjectsApi';
import showProjectWithId            from '../middlewares/showProjectWithIdApi';
import createProjectEpic            from '../middlewares/createProjectEpicApi';
import updateProjectEpic            from '../middlewares/editProjectEpicApi';
import deleteProjectEpic            from '../middlewares/deleteProjectEpicApi';
import showAllEpics                 from '../middlewares/showAllEpicsApi';
import showProjectEpic              from '../middlewares/showEpicWithIdApi';
import createEpicTask               from '../middlewares/createTaskApi';
import showEpicTasks                from '../middlewares/showEpicTasksApi';
import updateEpicTask               from '../middlewares/updateEpicTaskApi';
import showAllSpecialists           from '../middlewares/showAllSpecialistsApi';
import assignSpecialistToTask       from '../middlewares/assignSpecialistToTaskApi';

const enhancer = applyMiddleware(
    contactRequest,
    signUp,
    getUserIdByTokenConfirmation,
    verification,
    changePassword,
    deleteConfirmationToken,
    signIn,
    getEmailForResetPassword,
    getPasswordsForResetPassword,
    welcomeClient,
    getIndustires,
    getProjectTypes,
    getExperienceLevels,
    updateSpecStep1,
    showChosenSkills,
    updateSpecStep2,
    updateSpecialistBillings,
    showClientData,
    showSpecialistData,
    showAllSpecialists,
    updateSpecialistProfile,
    editEducation,
    editCompany,
    editBilling,
    editExperience,
    deleteEducation,
    deleteExperience,
    updateClientProfile,
    updateClientCompany,
    updateClientBilling,
    saveCreatedProject,
    showAllProjects,
    showProjectWithId,
    createProjectEpic,
    updateProjectEpic,
    deleteProjectEpic,
    showAllEpics,
    showProjectEpic,
    createEpicTask,
    showEpicTasks,
    updateEpicTask,
    assignSpecialistToTask,
);

let reduxDevTools = process.env.NODE_ENV === 'development'
                    ? window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
                    : window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(); // before production {}


const store = createStore(reducer, reduxDevTools, enhancer);

process.env.NODE_ENV === 'development' ? (window.store = store) : null;

export default store;

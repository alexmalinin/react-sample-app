import { createStore, applyMiddleware } from "redux";

import reducer from "../reducers/rootReducer";

import contactRequest from "../middlewares/contactRequestApi";
import signUp from "../middlewares/signUpApi";
import getUserIdByTokenConfirmation from "../middlewares/getUserIdByTokenConfirmationApi";
import deleteConfirmationToken from "../middlewares/deleteConfirmationTokenApi";
import verification from "../middlewares/verificationApi";
import changePassword from "../middlewares/passwords/changePasswordApi";
import signIn from "../middlewares/signInApi";
import getEmailForResetPassword from "../middlewares/passwords/getEmailForResetPasswordApi";
import getPasswordsForResetPassword from "../middlewares/passwords/getPasswordsForResetPasswordApi";
import welcomeClient from "../middlewares/welcomeClientApi";
import getIndustires from "../middlewares/getIndustiresApi";
import getProjectTypes from "../middlewares/getProjectTypesApi";
import getExperienceLevels from "../middlewares/getExperienceLevelsApi";
import getSkills from "../middlewares/getSkillsApi";
import updateSpecStep1 from "../middlewares/updateSpecStep1Api";
import showChosenSkills from "../middlewares/showChosenSkillsApi";
import updateSpecStep2 from "../middlewares/updateSpecStep2Api";
import updateSpecialistBillings from "../middlewares/updateSpecialistBillingApi";
import showClientData from "../middlewares/showClientDataApi";
import showSpecialistData from "../middlewares/showSpecialistDataApi";
import showSpecialistWithId from "../middlewares/showSpecialistWithIdApi";
import updateSpecialistProfile from "../middlewares/updateSpecialistProfileApi";
import editEducation from "../middlewares/education/editEducationApi";
import editCompany from "../middlewares/company/editCompanyApi";
import editBilling from "../middlewares/billing/editBillingApi";
import editExperience from "../middlewares/experience/editExperienceApi";
import deleteEducation from "../middlewares/education/deleteEducationApi";
import deleteExperience from "../middlewares/experience/deleteExperienceApi";
import updateClientProfile from "../middlewares/updateClientProfileApi";
import updateClientCompany from "../middlewares/updateClientCompanyApi";
import updateClientBilling from "../middlewares/updateClientBillingApi";
import saveCreatedProject from "../middlewares/createProjectApi";
import updateProject from "../middlewares/updateProjectApi";
import showAllProjects from "../middlewares/showAllProjectsApi";
import showSpecialistProjects from "../middlewares/showSpecialistProjectsApi";
import showSpecialistTeams from "../middlewares/showSpecialistTeamsApi";
import showSpecialistTasks from "../middlewares/showSpecialistTasksApi";
import showProjectWithId from "../middlewares/showProjectWithIdApi";
import createProjectEpic from "../middlewares/createProjectEpicApi";
import updateProjectEpic from "../middlewares/editProjectEpicApi";
import deleteProjectEpic from "../middlewares/deleteProjectEpicApi";
import showAllEpicsWithoutProject from "../middlewares/showAllEpicsWithoutProjectApi";
import showAllEpics from "../middlewares/showAllEpicsApi";
import showProjectEpic from "../middlewares/showEpicWithIdApi";
import showAllEpicTasks from "../middlewares/showAllEpicTasksApi";
import createEpicTask from "../middlewares/createTaskApi";
import showEpicTasks from "../middlewares/showEpicTasksApi";
import updateEpicTask from "../middlewares/updateEpicTaskApi";
import deleteEpicTask from "../middlewares/deleteEpicTaskApi";
import showAllSpecialists from "../middlewares/showAllSpecialistsApi";
import assignSpecialistToTask from "../middlewares/assignSpecialistToTaskApi";
import removeSpecialistFromTask from "../middlewares/removeSpecialistFromTaskApi";
import showAllTeams from "../middlewares/showAllTeamsApi";
import showClientTeams from "../middlewares/showClientTeamsApi.js";
import createCustomTeam from "../middlewares/createCustomTeamApi";
import showProjectTeam from "../middlewares/showProjectTeam";
import assignSpecialistToTeam from "../middlewares/assignSpecialistToTeamApi";
import removeSpecialistFromTeam from "../middlewares/removeSpecialistFromTeamApi";
import createTeamChannel from "../middlewares/createChannelApi";
import deleteTeamChannel from "../middlewares/deleteChannelApi";
import updateTeamChannel from "../middlewares/updateChannelApi";
import showChannels from "../middlewares/showChannelsApi";
import addToChannel from "../middlewares/addMemberToChannelApi";
import removeFromChannel from "../middlewares/removeMemberFromChannelApi";
import searchSpecialist from "../middlewares/searchSpecialistApi";
import searchSpecialistForProject from "../middlewares/searchSpecialistForProjectApi";

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
  getSkills,
  updateSpecStep1,
  showChosenSkills,
  updateSpecStep2,
  updateSpecialistBillings,
  showClientData,
  showSpecialistData,
  showSpecialistWithId,
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
  updateProject,
  showAllProjects,
  showSpecialistProjects,
  showSpecialistTeams,
  showSpecialistTasks,
  showProjectWithId,
  createProjectEpic,
  updateProjectEpic,
  deleteProjectEpic,
  showAllEpicsWithoutProject,
  showAllEpics,
  showProjectEpic,
  showAllEpicTasks,
  createEpicTask,
  showEpicTasks,
  updateEpicTask,
  deleteEpicTask,
  assignSpecialistToTask,
  removeSpecialistFromTask,
  showAllTeams,
  showClientTeams,
  createCustomTeam,
  showProjectTeam,
  assignSpecialistToTeam,
  removeSpecialistFromTeam,
  createTeamChannel,
  deleteTeamChannel,
  updateTeamChannel,
  showChannels,
  addToChannel,
  removeFromChannel,
  searchSpecialist,
  searchSpecialistForProject
);

let reduxDevTools =
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__()
    : window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__(); // before production {}

const store = createStore(reducer, reduxDevTools, enhancer);

process.env.NODE_ENV === "development" ? (window.store = store) : null;

export default store;

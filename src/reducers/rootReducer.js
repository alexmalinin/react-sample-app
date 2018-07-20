import { combineReducers } from "redux";
import { reducer as reduxFormReducer } from "redux-form";

import { LOG_OUT } from "../actions/types";

import changeUserType from "./changeUserTypeReducer";
import signUpData from "./signUpReducer";
import signInReducer from "./signInReducer";
import UserId from "./getUserIdByTokenConfirmationReducer";
import confirmPassword from "./confirmPassword";
import industries from "./industriesReducer.js";
import projectTypes from "./projectTypesReducer";
import experienceLevels from "./experienceLevelsReducer";
import educations from "./educationsReducer";
import experiences from "./workExperienceReducer";
import skills from "./skillsReducer";
import allClients from "./showAllClientsReducer";
import clientData from "./showClientDataReducer";
import specialistData from "./showSpecialistDataReducer";
import specialistWithId from "./showSpecialistWithIdReducer";
import allSpecialists from "./showAllSpecialistsReducer";
import createProject from "./createProjectReducer";
import updateProject from "./updateProjectReducer";
import allProjects from "./showAllProjectsReducer";
import sortedProjects from "./showSortedProjectsReduser";
import specialistProjects from "./showSpecialistProjectsReducer";
import specialistTeams from "./showSpecialistTeamsReducer";
import allCustomTeams from "./showCustomTeamsReducer";
import specialistCustomTeams from "./showSpecialistCustomTeamsReducer";
import specialistTasks from "./showSpecialistTasksReducer";
import projectWithId from "./showProjectWithIdReducer";
import createEpic from "./createProjectEpicReducer";
import allEpicsWithoutProject from "./showAllEpicsWithoutProjectReducer";
import allEpics from "./showAllEpicsReducer";
import allEpicTasks from "./showAllTasksReducer";
import deleteEpic from "./deleteEpicReducer";
import createTask from "./createTaskReducer";
import showEpic from "./showProjectEpicReducer";
import epicTasks from "./showTasksReducer";
import updateTask from "./updateEpicTaksReducer";
import assignSpecialist from "./assignSpecialistToTaskReducer";
import removeSpecialist from "./removeSpecialistFromTaskReducer";
import allTeams from "./showAllTeamsReducer";
import clientTeams from "./showClientTeamsReducer";
import createCustomTeam from "./createCustomTeamReducer";
import projectTeam from "./showProjectTeamReducer";
import customTeam from "./showCustomTeamReducer";
import assignToTeam from "./assignSpecialistToTeamReducer";
import removeFromTeam from "./removeSpecialistFromTeamReducer";
import createChannel from "./createChannelReducer";
import deleteChannel from "./deleteChannelReducer";
import allChannels from "./showChannelsReducer";
import addMember from "./addMemberToChannelReducer";
import removeMember from "./removeMemberFromChannelReducer";
import updateChannel from "./updateChannelReducer";
import searchResult from "./searchSpecialistReducer";
import confirmationModal from "./confirmationReducer";
import submitErrorModal from "./submitErrorModalReducer";

// import specialistProfile from './specialistProfile';
// import contactRequest from './contactRequestReducer';

const appReducer = combineReducers({
  form: reduxFormReducer,
  changeUserType,
  signUpData,
  signInReducer,
  UserId,
  confirmPassword,
  industries,
  educations,
  experiences,
  projectTypes,
  experienceLevels,
  skills,
  allClients,
  clientData,
  specialistData,
  specialistWithId,
  allSpecialists,
  createProject,
  updateProject,
  allProjects,
  sortedProjects,
  specialistProjects,
  specialistTeams,
  allCustomTeams,
  specialistCustomTeams,
  specialistTasks,
  projectWithId,
  createEpic,
  allEpicsWithoutProject,
  allEpics,
  deleteEpic,
  allEpicTasks,
  createTask,
  showEpic,
  epicTasks,
  updateTask,
  assignSpecialist,
  removeSpecialist,
  allTeams,
  clientTeams,
  createCustomTeam,
  projectTeam,
  customTeam,
  assignToTeam,
  removeFromTeam,
  createChannel,
  updateChannel,
  allChannels,
  addMember,
  removeMember,
  deleteChannel,
  searchResult,
  confirmationModal,
  submitErrorModal
  // contactRequest,
});

export default (state, action) => {
  if (action.type === LOG_OUT) {
    localStorage.clear();
    state = undefined;
  }

  return appReducer(state, action);
};

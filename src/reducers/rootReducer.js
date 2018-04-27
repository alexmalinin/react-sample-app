import { combineReducers }              from 'redux';
import { reducer as reduxFormReducer }  from 'redux-form';

import hideFooter       from './hideFooter';
import sidebar          from './sidebar';
import changeUserType   from './changeUserTypeReducer';
import signUpData       from './signUpReducer';
import signInReducer    from './signInReducer';
import UserId           from './getUserIdByTokenConfirmationReducer';
import confirmPassword  from './confirmPassword';
import industries       from './industriesReducer.js';
import projectTypes     from './projectTypesReducer';
import experienceLevels from './experienceLevelsReducer';
import educations       from './educationsReducer';
import experiences      from './workExperienceReducer';
import chosenSkills     from './showChosenSkillsReducer';
import clientData       from './showClientDataReducer';
import specialistData   from './showSpecialistDataReducer';
import allSpecialists   from './showAllSpecialistsReducer';
import createProject    from './createProjectReducer';
import allProjects      from './showAllProjectsReducer';
import projectWithId    from './showProjectWithIdReducer';
import createEpic       from './createProjectEpicReducer';
import allEpics         from './showAllEpicsReducer';
import deleteEpic       from './deleteEpicReducer';
import createTask       from './createTaskReducer';
import showEpic         from './showProjectEpicReducer';
import epicTasks        from './showTasksReducer';
import updateTask       from './updateEpicTaksReducer';
import assignSpecialist from './assignSpecialistToTaskReducer';
import removeSpecialist from './removeSpecialistFromTaskReducer';
import allTeams         from './showAllTeamsReducer';
import projectTeam      from './showProjectTeamReducer';
import assignToTeam     from './assignSpecialistToTeamReducer';
import removeFromTeam   from './removeSpecialistFromTeamReducer';
import createChannel    from './createChannelReducer';
import deleteChannel    from './deleteChannelReducer';
import allChannels      from './showChannelsReducer';
import addMember        from './addMemberToChannelReducer';
import removeMember     from './removeMemberFromChannelReducer';
import updateChannel    from './updateChannelReducer';

// import specialistProfile from './specialistProfile';
// import contactRequest from './contactRequestReducer';

export default combineReducers({
    hideFooter,
    sidebar,
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
    chosenSkills,
    clientData,
    specialistData,
    allSpecialists,
    form: reduxFormReducer,
    createProject,
    allProjects,
    projectWithId,
    createEpic,
    allEpics,
    deleteEpic,
    createTask,
    showEpic,
    epicTasks,
    updateTask,
    assignSpecialist,
    removeSpecialist,
    allTeams,
    projectTeam,
    assignToTeam,
    removeFromTeam,
    createChannel,
    updateChannel,
    allChannels,
    addMember,
    removeMember,
    deleteChannel,
    // contactRequest,
});

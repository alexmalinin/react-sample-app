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
    // contactRequest,
});

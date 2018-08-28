import * as types from "./types";
import { combineReducers } from "redux";
import { createReducer } from "../../utils";
import merge from "lodash/merge";
import omit from "lodash/omit";

const projectsById = (state = {}, action) => {
  switch (action.type) {
    case types.SHOW_PROJECTS:
      return { ...action.payload.entities.projects };
    default:
      return state;
  }
};

const allProjects = createReducer([])({
  [types.SHOW_PROJECTS]: (state, { payload }) => payload.result
});

const projectsReducer = combineReducers({
  byId: projectsById,
  allIds: allProjects
});

export default projectsReducer;

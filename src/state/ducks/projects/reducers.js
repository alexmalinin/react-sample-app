import * as types from "./types";
import { createReducer } from "../../utils";
import { FULFILLED, PENDING, REJECTED } from "../../../utilities";

const initialState = {
  loading: false,
  loaded: false,
  projects: {},
  error: null
};

const projectsReducer = createReducer(initialState)({
  [types.PROJECTS_SHOW]: (state, { payload }) => ({
    ...state,
    projects: {
      ...payload
    }
  }),

  [types.PROJECT_SAVE + PENDING]: (state, action) => ({
    ...state,
    loading: true
  }),

  [types.PROJECT_SAVE + FULFILLED]: (state, { payload }) => ({
    ...state,
    loading: false,
    projects: {
      ...state.projects,
      [payload.data.id]: payload.data
    }
  }),

  [types.PROJECT_SAVE + REJECTED]: (state, action) => ({
    ...state,
    loading: false,
    error: true
  })
});

export default projectsReducer;

import * as types from "./types";
import { createReducer } from "../../utils";
import { FULFILLED, PENDING, REJECTED } from "../../../utilities";

const initialState = {};

const projectsReducer = createReducer(initialState)({
  [types.PROJECTS_SHOW]: (state, { payload }) => ({
    ...state,
    ...payload
  }),

  [types.PROJECT_SAVE + PENDING]: (state, action) => ({
    ...state
  }),

  [types.PROJECT_SAVE + FULFILLED]: (state, { payload }) => ({
    ...state,
    [payload.data.id]: payload.data
  }),

  [types.PROJECT_SAVE + REJECTED]: (state, action) => ({
    ...state
  }),

  [types.PROJECT_UPDATE]: (state, { payload }) => ({
    ...state,
    [payload.id]: payload
  })
});

export default projectsReducer;

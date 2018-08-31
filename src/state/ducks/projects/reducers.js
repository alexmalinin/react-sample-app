import * as types from "./types";
import { createReducer } from "../../utils";
import { FULFILLED, PENDING, REJECTED } from "../../../utilities";

const initialState = {
  loading: false,
  error: null,
  loaded: false,
  byId: {},
  allIds: []
};

const projectsReducer = createReducer(initialState)({
  [types.SHOW_PROJECTS + PENDING]: (state, action) => ({
    ...state,
    loading: true
  }),
  [types.SHOW_PROJECTS + FULFILLED]: (state, action) => ({
    ...state,
    loading: false,
    loaded: true,
    error: null,
    byId: { ...action.payload.entities.projects },
    allIds: [...action.payload.result]
  }),
  [types.SHOW_PROJECTS + REJECTED]: (state, action) => ({
    ...state,
    error: true
  })
});

export default projectsReducer;

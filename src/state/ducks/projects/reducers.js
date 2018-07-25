import * as types from "./types";
import { createReducer } from "../../utils";
import { FULFILLED, PENDING } from "../../../utilities";

const initialState = {
  loading: false,
  loaded: false,
  projects: {},
  error: null
};

const projectsReducer = createReducer(initialState)({
  [types.SHOW_ALL_PROJECTS]: (state, { payload }) => ({
    ...state,
    projects: {
      ...payload
    }
  })
});

export default projectsReducer;

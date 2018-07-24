import * as types from "./types";
import omit from "lodash/omit";
import { createReducer } from "../../utils";
import { FULFILLED, REJECTED, PENDING } from "../../../utilities";

const initialState = {
  loading: false,
  loaded: false,
  tasks: [],
  error: null
};

const tasksReducer = createReducer(initialState)({
  [types.EPIC_TASKS_SHOW]: (state, { payload }) => ({
    ...state,
    tasks: {
      ...payload
    }
  }),

  [types.EPIC_TASK_CREATE + PENDING]: (state, action) => ({
    ...state,
    loading: true
  }),

  [types.EPIC_TASK_CREATE + REJECTED]: (state, action) => ({
    ...state,
    loading: false,
    error: true
  }),

  [types.EPIC_TASK_CREATE + FULFILLED]: (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: true,
    teams: {
      ...state.teams,
      [payload.data.id]: payload.data
    }
  })
});

export default tasksReducer;

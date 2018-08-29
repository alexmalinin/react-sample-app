import * as types from "./types";
import omit from "lodash/omit";
import { createReducer } from "../../utils";
import { FULFILLED, REJECTED, PENDING } from "../../../utilities";

const initialState = {
  current: null,
  loading: false,
  loaded: false,
  allTasks: [],
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

  [types.EPIC_TASK_CREATE + FULFILLED]: (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: true,
    tasks: {
      ...state.tasks,
      [payload.data.id]: payload.data
    }
  }),

  [types.EPIC_TASK_CREATE + REJECTED]: (state, action) => ({
    ...state,
    loading: false,
    error: true
  }),

  [types.EPIC_TASK_DELETE + PENDING]: (state, action) => ({
    ...state,
    loading: true
  }),

  [types.EPIC_TASK_DELETE + FULFILLED]: (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: true,
    error: false,
    tasks: {
      ...omit(state.tasks, payload.data.id)
    }
  }),

  [types.EPIC_TASK_DELETE + REJECTED]: (state, action) => ({
    ...state,
    loading: false,
    error: true
  })
});

export default tasksReducer;

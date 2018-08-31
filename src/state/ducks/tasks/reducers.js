import * as types from "./types";
import omit from "lodash/omit";
import { createReducer } from "../../utils";
import { FULFILLED, REJECTED, PENDING } from "../../../utilities";

const tasksReducer = createReducer([])({
  [types.SHOW_SPECIALIST_TASKS]: (state, { payload }) => ({
    ...payload.entities.tasks
  }),

  [types.SHOW_EPIC_TASKS]: (state, { payload }) => ({
    ...payload.entities.tasks
  }),

  [types.EPIC_TASK_CREATE + FULFILLED]: (state, { payload }) => ({
    ...state,
    [payload.data.id]: payload.data
  }),

  [types.EPIC_TASK_DELETE + FULFILLED]: (state, { payload }) => ({
    ...omit(state, payload.data.id)
  })
});

export default tasksReducer;

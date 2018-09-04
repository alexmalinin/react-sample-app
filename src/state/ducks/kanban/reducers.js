import * as types from "./types";
import omit from "lodash/omit";
import { createReducer } from "../../utils";

const initialState = {
  myTasks: false,
  status: "view"
};

const tasksReducer = createReducer(initialState)({
  [types.TOGGLE_MY_TASKS]: (state, action) => ({
    ...state,
    myTasks: !state.myTasks
  }),

  [types.TOGGLE_KANBAN_VIEW]: (state, action) => ({
    ...state,
    status: state.status === "view" ? "edit" : "view"
  })
});

export default tasksReducer;

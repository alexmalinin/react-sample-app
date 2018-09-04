import * as types from "./types";
import omit from "lodash/omit";
import merge from "lodash/merge";
import { createReducer } from "../../utils";
import { FULFILLED, REJECTED, PENDING } from "../../../utilities";

const initialState = {
  current: null,
  loading: false,
  loaded: false,
  error: null,
  byId: {},
  allIds: []
};

const tasksReducer = createReducer(initialState)({
  [types.SET_EPIC]: (state, { payload }) => ({
    ...state,
    current: payload,
    loading: true,
    error: null
  }),

  [types.SHOW_EPIC_TASKS]: (state, { payload, epic }) => ({
    ...state,
    loading: false,
    loaded: epic,
    byId: { ...payload.entities.tasks },
    allIds: payload.result
  }),

  [types.SHOW_EPIC_TASKS + REJECTED]: (state, { payload, epic }) => ({
    ...state,
    loading: false,
    loaded: epic,
    error: payload
  }),

  [types.CREATE_EPIC_TASK]: (state, { payload }) => ({
    ...state,
    byId: {
      ...state.byId,
      [payload.data.id]: payload.data
    },
    allIds: [...state.allIds, payload.data.id]
  }),

  [types.UPDATE_EPIC_TASK]: (state, { payload }) => ({
    ...state,
    byId: {
      ...state.byId,
      [payload.data.id]: { ...state.byId[payload.data.id], ...payload.data }
    }
  }),

  [types.DELETE_EPIC_TASK]: (state, { payload }) => ({
    ...state,
    byId: { ...omit(state.byId, payload.data.id) },
    allIds: state.allIds.filter(id => id !== payload.data.id)
  })
});

export default tasksReducer;

import * as types from "./types";
import omit from "lodash/omit";
import { createReducer } from "../../utils";
import { REJECTED } from "@utilities";

const initialState = {
  current: null,
  loading: false,
  loaded: false,
  error: null,
  byId: {},
  allIds: []
};

const epicsReducer = createReducer(initialState)({
  [types.SET_PROJECT]: (state, { payload }) => ({
    ...state,
    current: payload,
    loading: true,
    error: null
  }),

  [types.SHOW_EPICS]: (state, { payload, projectId }) => ({
    ...state,
    loading: false,
    loaded: projectId,
    byId: { ...payload.entities.epics },
    allIds: payload.result
  }),

  [types.SHOW_EPICS + REJECTED]: (state, { payload }) => ({
    ...state,
    loading: false,
    error: payload
  }),

  [types.CREATE_EPIC]: (state, { payload }) => ({
    ...state,
    byId: {
      ...state.byId,
      [payload.data.id]: {
        ...payload.data
      }
    },
    allIds: [...state.allIds, payload.data.id]
  }),

  [types.UPDATE_EPIC]: (state, { payload }) => ({
    ...state,
    byId: {
      ...state.byId,
      [payload.data.id]: {
        ...payload.data
      }
    }
  }),

  [types.DELETE_EPIC]: (state, { payload }) => ({
    ...state,
    byId: omit(state.byId, payload.data.id),
    allIds: state.allIds.filter(id => id !== payload.data.id)
  })
});

export default epicsReducer;

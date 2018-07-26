import * as types from "./types";
import omit from "lodash/omit";
import { createReducer } from "../../utils";
import { FULFILLED, PENDING, REJECTED } from "../../../utilities";

const initialState = {
  loading: false,
  loaded: false,
  epics: {},
  error: false
};

const epicsRedicer = createReducer(initialState)({
  [types.EPICS_SHOW]: (state, { payload, projectId }) => ({
    ...state,
    epics: {
      ...state.epics,
      [projectId]: payload
    }
  }),

  [types.PROJECT_EPIC_CREATE + PENDING]: (state, action) => ({
    ...state,
    loading: true
  }),

  [types.PROJECT_EPIC_CREATE + FULFILLED]: (
    state,
    { payload, meta: { projectId } }
  ) => ({
    ...state,
    loading: false,
    loaded: true,
    epics: {
      ...state.epics,
      [projectId]: {
        ...state.epics[projectId],
        [payload.data.id]: payload.data
      }
    }
  }),

  [types.PROJECT_EPIC_CREATE + REJECTED]: (state, action) => ({
    ...state,
    loading: false,
    error: true
  }),

  [types.PROJECT_EPIC_DELETE + PENDING]: (state, action) => ({
    ...state,
    loading: true
  }),

  [types.PROJECT_EPIC_DELETE + FULFILLED]: (
    state,
    { payload, meta: { projectId } }
  ) => ({
    ...state,
    loading: false,
    loaded: true,
    epics: {
      ...state.epics,
      [projectId]: {
        ...omit(state.epics[projectId], payload.data.id)
      }
    }
  }),

  [types.PROJECT_EPIC_DELETE + REJECTED]: (state, action) => ({
    ...state,
    loading: false,
    error: true
  })
});

export default epicsRedicer;
